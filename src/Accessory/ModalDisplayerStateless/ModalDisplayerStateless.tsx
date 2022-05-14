import VDom from '@rflban/vdom'

const defaultWrapper = (n: VDom.VirtualElement) => n;

type ModalDisplayerStatelessDirection = 'row' | 'column';

type ModalDisplayerStatelessAlign = 'start' | 'end' | 'center';

interface ModalDisplayerStatelessProps {
  ref?: VDom.Ref<VDom.RefTypes>;
  direction?: ModalDisplayerStatelessDirection;
  align?: ModalDisplayerStatelessAlign;
  wrapper?: (_n: VDom.VirtualElement) => VDom.VirtualElement;
  animated?: boolean;
  open: boolean;
  onOpen?: Function;
  onClose?: Function;
}

const resolveAlign = (align?: ModalDisplayerStatelessAlign): string => {
  switch (align) {
    case 'start':
      return 'waveuiModalDisplayerStateless_start';
    case 'end':
      return 'waveuiModalDisplayerStateless_end';
    case 'center':
    default:
      return 'waveuiModalDisplayerStateless_center';
  }
}

const resolveDirection = (direction?: ModalDisplayerStatelessDirection): string => {
  switch (direction) {
    case 'row':
      return 'waveuiModalDisplayerStateless_row';
    case 'column':
    default:
      return 'waveuiModalDisplayerStateless_column';
  }
}

abstract class IModalDisplayerStateless extends VDom.Component<ModalDisplayerStatelessProps> {
}

interface ProxyProps {
  ref: VDom.Ref<VDom.Component>;
  parent: IModalDisplayerStateless;
}

class Proxy extends VDom.Component<ProxyProps> {
  private readonly wrapperRef = new VDom.Ref<HTMLElement>();

  clickHandler = (e: MouseEvent) => {
    const { instance: wrapper } = this.wrapperRef;
    const {
      parent,
    } = this.props;
    const {
      onClose,
    } = parent.props;

    if (e.target === wrapper) {
      onClose?.();
    } else if (e.target instanceof HTMLElement) {
      if (e.target.closest('A') && !e.metaKey && !e.ctrlKey) {
        onClose?.();
      }
    }
  }

  render(): VDom.VirtualElement {
    const classes = ['waveuiModalDisplayerStateless'];

    const {
      parent,
    } = this.props;

    const {
      animated,
      align,
      direction,
      wrapper = defaultWrapper,
      open,
    } = parent.props;

    if (open) {
      classes.push('waveuiModalDisplayerStateless_opened');
    }
    if (animated) {
      classes.push('waveuiModalDisplayerStateless_animated');
    }
    classes.push(resolveAlign(align));
    classes.push(resolveDirection(direction));

    return (
      <>
        <div
          class={`waveuiModalDisplayerStateless__background ${open ? 'waveuiModalDisplayerStateless__background_active' : ''} ${animated ? 'waveuiModalDisplayerStateless__background_animated' : ''}`}
        />
        {wrapper(
          <div
            ref={this.wrapperRef}
            class={`${classes.join(' ')}`}
            onClick={this.clickHandler}
          >
            {parent.children}
          </div>
        )}
      </>
    );
  }
}

export default class ModalDisplayerStatelessStateless extends IModalDisplayerStateless {
  private readonly root: HTMLElement = document.createElement('div');

  private readonly proxyRef = new VDom.Ref<VDom.Component>();

  private bodyOverflowSave: string | undefined;

  get isOpen(): boolean {
    return this.props.open;
  }

  constructor(props: ModalDisplayerStatelessProps) {
    super(props);

    this.root.className = 'waveuiModalDisplayerStateless__root';
    const body = document.querySelector('body')!;
    body.append(this.root);

    VDom.render((
      <Proxy
        parent={this}
        ref={this.proxyRef}
      />
    ), this.root)
  }

  didUpdate(): void {
    this.proxyRef.instance.enqueueUpdate();
  }

  willUmount() {
    const body = document.querySelector('body')!;
    VDom.unmountFromDOM(this.root);
    this.root.remove();
    this.turnOnScroll();
  }

  turnOffScroll() {
    const body = document.querySelector('body')!;
    this.bodyOverflowSave = body.style.overflow;
    body.style.overflow = 'hidden';
  }

  turnOnScroll() {
    if (this.bodyOverflowSave != null) {
      const body = document.querySelector('body')!;
      body.style.overflow = this.bodyOverflowSave;
      this.bodyOverflowSave = undefined;
    }
  }

  makeSnapshot(prevProps: ModalDisplayerStatelessProps): void {
    const { open: prevOpen } = prevProps;
    const { open } = this.props;

    if (prevOpen !== open) {
      if (open) {
        this.turnOffScroll();
      } else {
        this.turnOnScroll();
      }
    }
  }

  didMount() {
    const {
      open,
   } = this.props;

    if (open) {
      this.turnOffScroll();
    }
  }

  render(): VDom.VirtualElement {
    return (
      <></>
    );
  }
}

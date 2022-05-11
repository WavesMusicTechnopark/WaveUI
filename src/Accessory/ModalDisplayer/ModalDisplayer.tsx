import VDom from '@rflban/vdom'

const defaultWrapper = (n: VDom.VirtualElement) => n;

type ModalDisplayerDirection = 'row' | 'column';

type ModalDisplayerAlign = 'start' | 'end' | 'center';

interface ModalDisplayerProps {
  ref?: VDom.Ref<VDom.RefTypes>;
  direction?: ModalDisplayerDirection;
  align?: ModalDisplayerAlign;
  wrapper?: (_n: VDom.VirtualElement) => VDom.VirtualElement;
  animated?: boolean;
}

interface ModalDisplayerState {
  isOpen: boolean;
}

const resolveAlign = (align?: ModalDisplayerAlign): string => {
  switch (align) {
    case 'start':
      return 'waveuiModalDisplayer_start';
    case 'end':
      return 'waveuiModalDisplayer_end';
    case 'center':
    default:
      return 'waveuiModalDisplayer_center';
  }
}

const resolveDirection = (direction?: ModalDisplayerDirection): string => {
  switch (direction) {
    case 'row':
      return 'waveuiModalDisplayer_row';
    case 'column':
    default:
      return 'waveuiModalDisplayer_column';
  }
}

abstract class IModalDisplayer extends VDom.Component<ModalDisplayerProps, ModalDisplayerState> {
  abstract open(): void;
  abstract close(): void;
}

interface ProxyProps {
  ref: VDom.Ref<VDom.Component>;
  parent: IModalDisplayer;
}

class Proxy extends VDom.Component<ProxyProps> {
  private readonly wrapperRef = new VDom.Ref<HTMLElement>();

  clickHandler = (e: MouseEvent) => {
    const { instance: wrapper } = this.wrapperRef;
    const {
      parent,
    } = this.props;

    if (e.target === wrapper) {
      parent.close();
    } else if (e.target instanceof HTMLElement) {
      if (e.target.closest('A') && !e.metaKey && !e.ctrlKey) {
        parent.close();
      }
    }
  }

  render(): VDom.VirtualElement {
    const classes = ['waveuiModalDisplayer'];

    const {
      parent,
    } = this.props;

    const {
      animated,
      align,
      direction,
      wrapper = defaultWrapper,
    } = parent.props;

    const {
      isOpen,
    } = parent.state;

    if (isOpen) {
      classes.push('waveuiModalDisplayer_opened');
    }
    if (animated) {
      classes.push('waveuiModalDisplayer_animated');
    }
    classes.push(resolveAlign(align));
    classes.push(resolveDirection(direction));

    return (
      <>
        <div
          class={`waveuiModalDisplayer__background ${isOpen ? 'waveuiModalDisplayer__background_active' : ''} ${animated ? 'waveuiModalDisplayer__background_animated' : ''}`}
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

export default class ModalDisplayer extends IModalDisplayer {
  private readonly root: HTMLElement = document.createElement('div');

  private readonly proxyRef = new VDom.Ref<VDom.Component>();

  private bodyOverflowSave: string | undefined;

  constructor(props: ModalDisplayerProps) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.root.className = 'waveuiModalDisplayer__root';
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
    if (this.bodyOverflowSave != null) {
      body.style.overflow = this.bodyOverflowSave;
    }
  }

  open(): void {
    this.setState({
      isOpen: true,
    });
    const body = document.querySelector('body')!;
    this.bodyOverflowSave = body.style.overflow;
    body.style.overflow = 'hidden';
  }

  close(): void {
    this.setState({
      isOpen: false,
    });
    const body = document.querySelector('body')!;
    if (this.bodyOverflowSave != null) {
      body.style.overflow = this.bodyOverflowSave;
    }
  }

  render(): VDom.VirtualElement {
    return (
      <></>
    );
  }
}

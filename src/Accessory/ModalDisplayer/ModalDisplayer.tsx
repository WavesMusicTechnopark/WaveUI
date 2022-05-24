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
  open: boolean;
  onOpen?: Function;
  onClose?: Function;
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

export default class ModalDisplayer extends VDom.Component<ModalDisplayerProps> {
  private readonly root: HTMLElement = document.createElement('div');

  private readonly wrapperRef = new VDom.Ref<HTMLElement>();

  private bodyOverflowSave: string | undefined;

  constructor(props: ModalDisplayerProps) {
    super(props);

    this.root.className = 'waveuiModalDisplayer__root';
    document.body.append(this.root);
  }

  clickHandler = (e: MouseEvent) => {
    const { instance: wrapper } = this.wrapperRef;
    const {
      onClose,
    } = this.props;

    if (e.target === wrapper) {
      onClose?.();
    } else if (e.target instanceof HTMLElement) {
      if (e.target.closest('A') && !e.metaKey && !e.ctrlKey) {
        onClose?.();
      }
    }
  }

  get isOpen(): boolean {
    return this.props.open;
  }

  willUmount() {
    this.root.remove();
    this.turnOnScroll();
  }

  turnOffScroll() {
    this.bodyOverflowSave = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }

  turnOnScroll() {
    if (this.bodyOverflowSave != null) {
      document.body.style.overflow = this.bodyOverflowSave;
      this.bodyOverflowSave = undefined;
    }
  }

  makeSnapshot(prevProps: ModalDisplayerProps): void {
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
    const classes = ['waveuiModalDisplayer'];

    const {
      animated,
      align,
      direction,
      wrapper = defaultWrapper,
      open,
      children,
    } = this.props;

    if (open) {
      classes.push('waveuiModalDisplayer_opened');
    }
    if (animated) {
      classes.push('waveuiModalDisplayer_animated');
    }
    classes.push(resolveAlign(align));
    classes.push(resolveDirection(direction));

    return (
      VDom.createPortal(
        <>
          <div
            class={`waveuiModalDisplayer__background ${open ? 'waveuiModalDisplayer__background_active' : ''} ${animated ? 'waveuiModalDisplayer__background_animated' : ''}`}
          />
          {wrapper(
            <div
              ref={this.wrapperRef}
              class={`${classes.join(' ')}`}
              onClickCapture={this.clickHandler}
            >
              {children}
            </div>
          )}
        </>,
        this.root,
      )
    );
  }
}

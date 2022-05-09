import VDom from '@rflban/vdom';

type MenuItemTone = 'accent' | 'danger' | 'success';

interface MenuItemProps {
  tone?: MenuItemTone;
  before?: VDom.VirtualElement;
  after?: VDom.VirtualElement;
  onClick?: (_e: MouseEvent) => void;
  onMouseEnter?: (_e: MouseEvent) => void;
  onMouseLeave?: (_e: MouseEvent) => void;
  blurOnClick?: boolean;
  submenu?: VDom.VirtualElement;
}

interface MenuItemState {
  isHover: boolean;
  isPressed: boolean;
}

const resolveTone = (tone?: MenuItemTone): string => {
  switch (tone) {
    case 'danger':
      return 'waveuiMenuItem_danger';
    case 'success':
      return 'waveuiMenuItem_success';
    case 'accent':
    default:
      return '';
  }
}

export default class MenuItem extends VDom.Component<MenuItemProps, MenuItemState> {
  state = {
    isHover: false,
    isPressed: false,
  }

  rootRef = new VDom.Ref<HTMLElement>();

  mouseEnter = (e: MouseEvent) => {
    this.setState({
      isHover: true,
    });

    this.props.onMouseEnter?.(e);
  }

  mouseLeave = (e: MouseEvent) => {
    this.setState({
      isHover: false,
      isPressed: false,
    });

    this.props.onMouseLeave?.(e);
  }

  mouseDown = (_e: Event) => {
    this.setState({
      isPressed: true,
    });
  }

  mouseUp = (_e: Event) => {
    this.setState({
      isPressed: false,
    })
  }

  clickHandler = (e: MouseEvent) => {
    const {
      onClick,
      blurOnClick,
    } = this.props;

    onClick?.(e);

    if (blurOnClick) {
      (document.activeElement as HTMLElement)?.blur();
    }
  }

  render(): VDom.VirtualElement {
    const classes = ['waveuiMenuItem'];

    const {
      before,
      after,
      tone = 'accent',
      submenu,
    } = this.props;
    const {
      isHover,
      isPressed,
    } = this.state;

    if (isHover) {
      classes.push('waveuiMenuItem_hover');
    }
    if (isPressed) {
      classes.push('waveuiMenuItem_pressed');
    }
    classes.push(resolveTone(tone));

    return (
      <div
        ref={this.rootRef}
        class={`${classes.join(' ')}`}
        onClick={this.clickHandler}
        onMouseLeave={this.mouseLeave}
        onMouseEnter={this.mouseEnter}
        onMouseDown={this.mouseDown}
        onMouseUp={this.mouseUp}
      >
        <div class="waveuiMenuItem__before">
          {before}
        </div>
        <div class="waveuiMenuItem__content">
          {this.props.children}
        </div>
        <div class="waveuiMenuItem__after">
          {after}
        </div>
        <div class="waveuiMenuItem__shadow" />
        {submenu}
      </div>
    );
  }
}

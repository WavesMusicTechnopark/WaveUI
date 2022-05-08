import VDom from '@rflban/vdom';

type MenuItemTone = 'accent' | 'danger' | 'success';

interface MenuItemProps {
  tone?: MenuItemTone;
  before?: VDom.VirtualElement;
  after?: VDom.VirtualElement;
  onClick?: (_e: MouseEvent) => void;
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

  mouseEnter = (_e: Event) => {
    this.setState({
      isHover: true,
    });
  }

  mouseLeave = (_e: Event) => {
    this.setState({
      isHover: false,
      isPressed: false,
    });
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

  render(): VDom.VirtualElement {
    const classes = ['waveuiMenuItem'];

    const {
      before,
      after,
      onClick,
      tone = 'accent',
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
        class={`${classes.join(' ')}`}
        onClick={onClick}
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
      </div>
    );
  }
}

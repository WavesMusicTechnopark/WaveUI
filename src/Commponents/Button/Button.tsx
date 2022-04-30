import VDom from '@rflban/vdom';

type ButtonMode = 'primary' | 'secondary' | 'outline';

type ButtonSize = 's' | 'm' | 'l';

type ButtonTone = 'accent' | 'success' | 'danger';

interface ButtonProps {
  mode?: ButtonMode;
  size?: ButtonSize;
  tone?: ButtonTone;
  onClick?: (_e: MouseEvent) => void;
  stretched?: boolean;
}

interface ButtonState {
  isHover: boolean;
  isPressed: boolean;
}

const resolveModeClass = (mode: ButtonMode): string => {
  switch (mode) {
    case "secondary":
      return "waveuiButton_secondary";
    case "outline":
      return "waveuiButton_outline";
    case "primary":
    default:
      return "waveuiButton_primary";
  }
}

const resolveSizeClass = (size: ButtonSize): string => {
  switch (size) {
    case 'l':
      return 'waveuiButton_large';
    case 's':
      return 'waveuiButton_small';
    case 'm':
    default:
      return '';
  }
}

const resolveToneclass = (tone: ButtonTone): string => {
  switch (tone) {
    case 'success':
      return 'waveuiButton_tone-success';
    case 'danger':
      return 'waveuiButton_tone-danger';
    case 'accent':
    default:
      return 'waveuiButton_tone-accent';
  }
}

export default class Button extends VDom.Component<ButtonProps, ButtonState> {
  constructor(props: ButtonProps) {
    super(props);

    this.state = {
      isHover: false,
      isPressed: false,
    }
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
    const classes: string[] = ["waveuiButton"];

    const {
      mode = "primary",
      size = 'm',
      tone = 'accent',
      stretched = false,
      onClick,
    } = this.props;

    classes.push(resolveModeClass(mode));
    classes.push(resolveSizeClass(size));
    classes.push(resolveToneclass(tone));

    if (stretched) {
      classes.push('waveuiButton_stretched');
    }
    if (this.state.isHover) {
      classes.push('waveuiButton_hover');
    }
    if (this.state.isPressed) {
      classes.push('waveuiButton_pressed');
    }

    return (
      <button
        onClick={onClick}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
        onMouseDown={this.mouseDown}
        onMouseUp={this.mouseUp}
        class={classes.join(' ')}
      >
        <span class="waveuiButton__content">
          {this.props.children}
        </span>
        <span class="waveuiButton__shadow" />
      </button>
    );
  }
};

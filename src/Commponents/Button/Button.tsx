import VDom from '@rflban/vdom';

type ButtonMode = "primary" | "secondary";

interface ButtonProps {
  mode?: ButtonMode;
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
    case "primary":
    default:
      return "waveuiButton_primary";
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

  mouseOver = (_e: Event) => {
    this.setState({
      isHover: true,
    });
  }

  mouseOut = (_e: Event) => {
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

    const { mode = "primary", stretched = false, onClick } = this.props;

    classes.push(resolveModeClass(mode));

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
        onMouseOver={this.mouseOver}
        onMouseOut={this.mouseOut}
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

import VDom from '@rflban/vdom';

type ButtonMode = "primary" | "secondary";

interface ButtonProps {
  mode?: ButtonMode;
}

const resolveModeClass = (mode: ButtonMode): string => {
  switch (mode) {
    case "secondary":
      return "waveuiButton--mode-secondary";
    case "primary":
    default:
      return "waveuiButton--mode-primary";
  }
}

export default class Button extends VDom.Component<ButtonProps> {
  render(): VDom.VirtualElement {
    const classes: string[] = ["waveuiButton"];

    const { mode = "primary" } = this.props;

    classes.push(resolveModeClass(mode));

    return (
      <button class={classes.join(' ')}>
        {this.props.children}
      </button>
    );
  }
};

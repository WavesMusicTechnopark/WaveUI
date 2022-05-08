import VDom from '@rflban/vdom';

interface MenuProps {
}

interface MenuState {
}

export default class Menu extends VDom.Component<MenuProps, MenuState> {
  render(): VDom.VirtualElement {
    const classes = ['waveuiMenu'];

    return (
      <div class={`${classes.join(' ')}`}>
        {this.props.children}
      </div>
    );
  }
}

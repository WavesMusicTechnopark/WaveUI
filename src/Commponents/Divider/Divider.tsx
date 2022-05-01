import VDom from '@rflban/vdom';

export default class Divider extends VDom.Component {
  render(): VDom.VirtualElement {
    return (
      <hr class="waveuiDivider"/>
    );
  }
}

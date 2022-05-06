import VDom from '@rflban/vdom';

interface PulsarProps {
  class?: string
}

export default class Pulsar extends VDom.Component<PulsarProps> {
  render(): VDom.VirtualElement {
    const {
      class: additionalClass = ''
    } = this.props;

    return (
      <div class={`waveuiPulsar ${additionalClass}`} />
    );
  }
}

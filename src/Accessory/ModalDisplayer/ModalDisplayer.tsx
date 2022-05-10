import VDom from '@rflban/vdom'

interface ModalDisplayerProps {
}

interface ModalDisplayerState {
}

export default class ModalDisplayer extends VDom.Component<ModalDisplayerProps, ModalDisplayerState> {
  private root: HTMLElement;

  constructor(props: ModalDisplayerProps) {
    super(props);

    this.root = document.createElement('div');
    const body = document.querySelector('body')!;
    body.append('beforeend', this.root);
  }

  render(): VDom.VirtualElement {
    return (
      <></>
    );
  }
}

import VDom from '@rflban/vdom';
import { ModalDisplayer } from '../../Accessory';
import { IMenu, MenuContext } from '../../Interfaces/Menu/Menu';

const defaultWrapper = (v: VDom.VirtualElement) => v;

interface ModalMenuProps {
  ref?: VDom.Ref<VDom.RefTypes>;
  onOpen?: () => void;
  onClose?: () => void;
  wrapper?: (_v: VDom.VirtualElement) => VDom.VirtualElement;
}

interface ModalMenuState {
  isOpen: boolean;
}

export default class ModalMenu extends IMenu<ModalMenuProps, ModalMenuState, any, IMenu | null> {
  static contextType = MenuContext;

  state = {
    isOpen: false,
  }

  toggle() {
    if (this.state.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open = (): void => {
    this.setState({
      isOpen: true,
    })

    this.props.onOpen?.();
  }

  close = (levels?: boolean | number): void => {
    this.setState({
      isOpen: false,
    })

    if (levels || typeof levels === 'number' && levels < 0) {
      const parentMenu = this.context;
      parentMenu?.close(levels > 0 ? +levels - 1 : levels);
    }

    this.props.onClose?.();
  }

  get isOpen() {
    return this.state.isOpen;
  }

  render(): VDom.VirtualElement {
    const {
      wrapper = defaultWrapper,
    } = this.props;

    return (
      <ModalDisplayer
        open={this.state.isOpen}
        onClose={this.close}
        animated
        direction="column"
        align="end"
        wrapper={(items) => (
          wrapper(
            <MenuContext.Provider value={this}>
              {items}
            </MenuContext.Provider>
          )
        )}
      >
        <div class="waveuiModalMenu">
          {this.props.children}
        </div>
      </ModalDisplayer>
    );
  }
}

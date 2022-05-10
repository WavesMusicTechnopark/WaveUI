import VDom from '@rflban/vdom';
import { ModalDisplayer } from '../../Accessory';
import { IMenu, MenuContext } from '../../Interfaces/Menu/Menu';
import { RefTypes } from '../../../../vdom/dist/Ref';

interface ModalMenuProps {
  ref?: VDom.Ref<RefTypes>;
  onOpen?: () => void;
  onClose?: () => void;
}

interface ModalMenuState {
  isOpen: boolean;
}

export default class ModalMenu extends IMenu<ModalMenuProps, ModalMenuState, any, IMenu | null> {
  static contextType = MenuContext;

  state = {
    isOpen: false,
  }

  private readonly modalRef = new VDom.Ref<ModalDisplayer>();

  toggle() {
    if (this.state.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open(): void {
    const { instance: modal } = this.modalRef;

    this.setState({
      isOpen: true,
    })
    modal.open();

    this.props.onOpen?.();
  }

  close(levels?: boolean | number): void {
    const { instance: modal } = this.modalRef;

    this.setState({
      isOpen: false,
    })
    modal.close();

    if (levels || typeof levels === 'number' && levels < 0) {
      const parentMenu = this.context;
      parentMenu?.close(levels > 0 ? +levels - 1 : levels);
    }

    this.props.onClose?.();
  }

  render(): VDom.VirtualElement {
    return (
      <ModalDisplayer
        animated
        direction="column"
        align="end"
        ref={this.modalRef}
        wrapper={(items) => (
          <MenuContext.Provider value={this}>
            {items}
          </MenuContext.Provider>
        )}
      >
        <div class="waveuiModalMenu">
          {this.props.children}
        </div>
      </ModalDisplayer>
    );
  }
}

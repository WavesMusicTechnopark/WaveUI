import VDom from '@rflban/vdom';
import { Button } from '../index';
import ModalMenu from './ModalMenu';
import MenuItem from '../MenuItem/MenuItem';
import { SettingsIcon } from '../../Icons';
import { IMenu } from '../../Interfaces/Menu/Menu';

export default {
  title: 'Components/ModalMenu',
  argTypes: {
  },
}

const Template = (args: any) => {
  const wrapper = document.createElement('div');

  const menuRef = new VDom.Ref<IMenu>();

  const props = {
  };

  VDom.render(
    (
      <>
        <Button
          onClick={() => menuRef.instance.open()}
        >
          Open menu!
        </Button>
        <ModalMenu
          ref={menuRef}
        >
          <MenuItem size="l" before={<SettingsIcon style={{height: '45%'}} />}>
            Settings
          </MenuItem>
          <MenuItem size="l">
            Logout
          </MenuItem>
        </ModalMenu>
      </>
    ),
    wrapper
  );

  return wrapper;
};

const defaultArgs = {
  addBefore: false,
  addAfter: false,
  tone: 'accent',
};

export const Settings = Template.bind({});
Settings.args = {
  text: 'Settings',
  ...defaultArgs,
}

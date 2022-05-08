import VDom from '@rflban/vdom';
import Menu from './Menu';
import MenuItem from './MenuItem/MenuItem';
import { SettingsIcon } from '../../Icons';
import { Divider } from '../index';

export default {
  title: 'Components/Menu',
  argTypes: {
  },
}

const Template = (items: any, args: any) => {
  const wrapper = document.createElement('div');

  const props = {
  };

  VDom.render(
    <Menu {...props}>
      {items}
    </Menu>,
    wrapper
  );

  return wrapper;
};

const defaultArgs = {
};

export const Settings = Template.bind({}, [
  <MenuItem before={<SettingsIcon style={{height: '45%'}} />}>
    Settings
  </MenuItem>,
  <MenuItem>
    Logout
  </MenuItem>,
  <MenuItem>
    Logout
  </MenuItem>,
  <MenuItem>
    Logout
  </MenuItem>,
  <Divider/>,
  <MenuItem>
    Logout
  </MenuItem>,
]);
Settings.args = {
  ...defaultArgs,
}

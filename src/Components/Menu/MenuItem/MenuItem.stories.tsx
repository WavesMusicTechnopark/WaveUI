import VDom from '@rflban/vdom';
import MenuItem from './MenuItem';
import { SettingsIcon } from '../../../Icons';

export default {
  title: 'Components/MenuItem',
  argTypes: {
    tone: {
      control: 'select',
      options: ['accent', 'success', 'danger']
    },
    addBefore: {
      control: 'boolean',
    },
    addAfter: {
      control: 'boolean',
    },
    onClick: {
      action: 'clicked',
    },
  },
}

const Template = (args: any) => {
  const wrapper = document.createElement('div');

  const props = {
    before: args.addBefore && <SettingsIcon style={{ height: '45%', }} />,
    after: args.addAfter && <SettingsIcon style={{ height: '45%', }} />,
    onClick: args.onClick,
    tone: args.tone,
  };

  VDom.render(
    <MenuItem {...props}>
      {args.text}
    </MenuItem>,
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

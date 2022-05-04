import VDom from '@rflban/vdom';
import LogoComponent from './Logo';

export default {
  title: 'Misc/Logo',
  argTypes: {
    size: {
      control: 'select',
      options: ['s', 'm', 'l'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
  }
}

const Template = (args: any) => {
  const wrapper = document.createElement('div');

  const props = {
    size: args.size,
    align: args.align,
  }

  VDom.render(
    <LogoComponent {...props}/>,
    wrapper
  );

  return wrapper;
};

const defaultArgs = {
  size: 'm',
  align: 'center',
}

export const Logo = Template.bind({});
Logo.args = {
  ...defaultArgs,
}

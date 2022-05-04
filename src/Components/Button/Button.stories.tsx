import VDom from '@rflban/vdom';
import Button from './Button';

export default {
  title: 'Components/Button',
  argTypes: {
    stretched: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: ['s', 'm', 'l']
    },
    tone: {
      control: 'select',
      options: ['accent', 'success', 'danger']
    },
  }
}

const Template = (mode: any, args: any) => {
  const wrapper = document.createElement('div');

  const props = {
    mode: mode ?? 'primary',
    stretched: args.stretched === true || args.stretched !== 'false' && args.stretched !== false,
    size: args.size ?? 'm',
    tone: args.tone ?? 'accent',
  };

  VDom.render(
    <Button {...props}>
      Button!
    </Button>,
    wrapper
  );

  return wrapper;
};

const defaultArgs = {
  size: 'm',
  tone: 'accent',
  stretched: false,
}

export const Primary = Template.bind({}, 'primary');
Primary.args = {
  ...defaultArgs,
}

export const Secondary = Template.bind({}, 'secondary');
Secondary.args = {
  ...defaultArgs,
}

export const Outline = Template.bind({}, 'outline');
Outline.args = {
  ...defaultArgs,
}

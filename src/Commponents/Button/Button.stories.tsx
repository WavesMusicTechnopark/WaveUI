import VDom from '@rflban/vdom';
import Button from './Button';

export default {
  title: 'Example/Button',
  argTypes: {
    stretched: {
      control: 'boolean',
    }
  }
}

const Template = (args: any) => {
  const wrapper = document.createElement('div');

  const props = {
    stretched: args.stretched === true || args.stretched !== 'false' && args.stretched !== false,
  };

  VDom.render(
    <Button {...props}>
      Button!
    </Button>,
    wrapper
  );

  return wrapper;
};

export const Primary = Template.bind({});

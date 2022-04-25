import VDom from '@rflban/vdom';
import Button from './Button';

export default {
  title: 'Example/Button',
}

const Template = (args: any) => {
  const wrapper = document.createElement('div');

  VDom.render(
    <Button>
      Buttton!
    </Button>,
    wrapper
  );

  return wrapper;
};

export const Primary = Template.bind({});

import VDom from '@rflban/vdom';
import DividerComponent from './Divider';

export default {
  title: 'Misc/Divider',
}

const Template = (args: any) => {
  const wrapper = document.createElement('div');

  const props = {
  }

  VDom.render(
    <DividerComponent {...props}/>,
    wrapper
  );

  return wrapper;
};

const defaultArgs = {
}

export const Divider = Template.bind({});
Divider.args = {
  ...defaultArgs,
}

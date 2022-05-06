import VDom from '@rflban/vdom';
import PulsarComponent from './Pulsar';

export default {
  title: 'Misc/Pulsar',
  argTypes: {
  }
}

const Template = (args: any) => {
  const wrapper = document.createElement('div');

  const props = {
  }

  VDom.render(
    <PulsarComponent {...props}/>,
    wrapper
  );

  return wrapper;
};

const defaultArgs = {
}

export const Pulsar = Template.bind({});
Pulsar.args = {
  ...defaultArgs,
}

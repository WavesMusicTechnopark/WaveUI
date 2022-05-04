import VDom from '@rflban/vdom';
import ImageInput from './ImageInput';

export default {
  title: 'Components/ImageInput',
  argTypes: {
    size: {
      control: 'select',
      options: ['s', 'm', 'l'],
    }
  },
}

const Template= (args: any) => {
  const wrapper = document.createElement('div');

  const props = {
    size: args.size,
    nonValue: 'https://psv4.userapi.com/c240331/u126208471/docs/d8/bc4b923de534/avatar_placeholder.png?extra=YDOzkUdVg41FP7y3DZwaoOYd_v2tXwGnzLib5E1vxYcEz8sMaUkrquxlxP0cmGoXe0H5Aec1Ds9efTlavR_QApAP15Yd4YOzILIDrB8FXwKiP5m1Qp9wizys-pg3TDpdbHoFIQITxE3Bag8',
  };

  VDom.render(
    <ImageInput {...props} />,
    wrapper
  );

  return wrapper;
};

export const Default = Template.bind({});
Default.args = {
  size: 'm',
}

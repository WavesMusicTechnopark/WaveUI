import VDom from '@rflban/vdom';
import FormItem from './FormItem';
import InputField from '../Input/Input';
import ImageInputField from '../ImageInput/ImageInput';

function validateUsername(username: string): boolean {
  const reg = /^[a-z0-9_]{3,16}$/;
  return reg.test(String(username).toLowerCase());
}

function validateImage(image?: File): boolean {
  return image != null;
}

export default {
  title: 'Components/FormItem',
  argTypes: {
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'stretch'],
    }
  },
}

const TemplateInput = (Field: any, fieldProps: any, args: any) => {
  const wrapper = document.createElement('div');

  const props = {
    align: args.align,
    label: args.label,
    error: args.error,
  };

  VDom.render(
    <FormItem {...props} as={Field} {...fieldProps} />,
    wrapper
  );

  return wrapper;
};

export const Input = TemplateInput.bind({}, InputField, {
  checker: validateUsername,
  placeholder: 'Username',
});
Input.args = {
  label: 'Username',
  error: 'Username have to contain at 3-16 characters (digits, letters or _)',
}

export const ImageInput = TemplateInput.bind({}, ImageInputField, {
  checker: validateImage,
  placeholder: 'Avatar',
  nonValue: 'https://psv4.userapi.com/c240331/u126208471/docs/d8/bc4b923de534/avatar_placeholder.png?extra=YDOzkUdVg41FP7y3DZwaoOYd_v2tXwGnzLib5E1vxYcEz8sMaUkrquxlxP0cmGoXe0H5Aec1Ds9efTlavR_QApAP15Yd4YOzILIDrB8FXwKiP5m1Qp9wizys-pg3TDpdbHoFIQITxE3Bag8',
  size: 'l',
});
ImageInput.args = {
  label: 'Avatar',
  error: 'Empty avatar',
  align: 'left',
}

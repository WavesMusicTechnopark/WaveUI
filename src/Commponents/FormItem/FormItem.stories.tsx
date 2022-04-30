import VDom from '@rflban/vdom';
import FormItem from './FormItem';
import InputField from '../Input/Input';

function validateUsername(username: string): boolean {
  const reg = /^[a-z0-9_]{3,16}$/;
  return reg.test(String(username).toLowerCase());
}

export default {
  title: 'Components/FormItem',
  argTypes: {
  },
}

const TemplateInput = (args: any) => {
  const wrapper = document.createElement('div');

  const props = {
    label: 'Username',
    error: 'Username have to contain at 3-16 characters (digits, letters or _)',
    checker: validateUsername,
  };

  VDom.render(
    <FormItem {...props} as={InputField} placeholder="Username" />,
    wrapper
  );

  return wrapper;
};

export const Input = TemplateInput.bind({});

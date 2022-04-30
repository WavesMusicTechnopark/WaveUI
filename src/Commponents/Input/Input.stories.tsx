import VDom from '@rflban/vdom';
import Input from './Input';
import SearchLeftIcon from '../../Icons/Search/SearchLeft';
import SearchRightIcon from '../../Icons/Search/SearchRight';

export default {
  title: 'Components/Input',
  argTypes: {
    tone: {
      control: 'select',
      options: ['accent', 'success', 'danger']
    },
    rounded: {
      control: 'boolean',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password']
    },
    addBefore: {
      control: 'boolean',
    },
    addAfter: {
      control: 'boolean',
    },
  },
}

const Template = (mode: any, args: any) => {
  const wrapper = document.createElement('div');

  const props = {
    mode,
    tone: args.tone ?? 'accent',
    placeholder: args.placeholder,
    rounded: args.rounded,
    type: args.type,
    before: args.addBefore && <SearchLeftIcon/>,
    after: args.addAfter && <SearchRightIcon style={{ cursor: 'pointer' }}/>,
  };

  VDom.render(
    <Input {...props}>
      Button!
    </Input>,
    wrapper
  );

  return wrapper;
};

const defaultArgs = {
  placeholder: 'Placeholder',
  tone: 'accent',
  rounded: false,
  addBefore: false,
  addAfter: false,
};

export const Primary = Template.bind({}, 'primary');
Primary.args = {
  ...defaultArgs,
}

export const Secondary = Template.bind({}, 'secondary');
Secondary.args = {
  ...defaultArgs,
}

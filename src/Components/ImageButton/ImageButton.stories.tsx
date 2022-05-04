import VDom from '@rflban/vdom';
import ImageButton from './ImageButton';
import { EditIcon } from '../../Icons';

export default {
  title: 'Components/ImageButton',
  argTypes: {
    inside: {
      control: 'boolean',
    },
    rounded: {
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

const Template = (args: any) => {
  const wrapper = document.createElement('div');

  const props = {
    src: args.src,
    inside: args.inside && (<EditIcon style={{height: '25%'}}/>),
    rounded: args.rounded,
    size: args.size ?? 'm',
    tone: args.tone ?? 'accent',
  };

  VDom.render(
    <ImageButton {...props}/>,
    wrapper
  );

  return wrapper;
};

const defaultArgs = {
  size: 'm',
  inside: false,
  tone: 'accent',
  rounded: false,
}

export const Default = Template.bind({});
Default.args = {
  src: 'https://images.unsplash.com/photo-1596813362035-3edcff0c2487?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  ...defaultArgs,
}

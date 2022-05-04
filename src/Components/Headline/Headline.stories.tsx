import VDom from '@rflban/vdom';
import HeadlineComponent from './Headline';

export default {
  title: 'Typography/Headline',
  argTypes: {
    size: {
      control: 'select',
      options: ['s', 'm', 'l'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
  }
}

const Template = (args: any) => {
  const wrapper = document.createElement('div');

  const props = {
    size: args.size,
    align: args.align,
  }

  VDom.render(
    <div style={{ display: 'flex', ['align-items']: 'stretched' }}>
      <HeadlineComponent {...props}>
        {args.text}
      </HeadlineComponent>
    </div>,
    wrapper
  );

  return wrapper;
};

const defaultArgs = {
  text: 'Text',
  size: 'm',
  align: 'center',
}

export const Headline = Template.bind({});
Headline.args = {
  ...defaultArgs,
}

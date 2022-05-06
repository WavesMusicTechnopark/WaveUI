import VDom from '@rflban/vdom';
import SubheadComponent from './Subhead';

export default {
  title: 'Typography/Subhead',
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
      <SubheadComponent {...props}>
        {args.text}
      </SubheadComponent>
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

export const Subhead = Template.bind({});
Subhead.args = {
  ...defaultArgs,
}

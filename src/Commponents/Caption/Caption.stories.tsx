import VDom from '@rflban/vdom';
import CaptionComponent from './Caption';

export default {
  title: 'Typography/Caption',
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
      <CaptionComponent {...props}>
        {args.text}
      </CaptionComponent>
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

export const Caption = Template.bind({});
Caption.args = {
  ...defaultArgs,
}

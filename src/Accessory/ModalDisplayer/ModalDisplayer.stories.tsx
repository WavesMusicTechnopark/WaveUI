import VDom from '@rflban/vdom';
import ModalDisplayer from './ModalDisplayer';
import { Button } from '../../Components';

export default {
  title: 'Accessory/ModalDisplayer',
  argTypes: {
    animated: {
      control: 'boolean',
    },
    direction: {
      control: 'select',
      options: ['row', 'column'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
  }
}

const Template = (args: any) => {
  const wrapper = document.createElement('div');

  const modalRef = new VDom.Ref();

  const props = {
    ref: modalRef,
    animated: args.animated,
    align: args.align,
    direction: args.direction,
  };

  let counter = 0;

  VDom.render(
    <div>
      <Button onClick={() => {
        (modalRef.instance as any).open();
      }}>
        Open Modal!
      </Button>
      <div style={{
        height: '2000px',
      }} />
      <ModalDisplayer {...props}>
        <div style={{
          display: 'flex',
          width: '80%',
          height: '200px',
          background: 'white',
          color: 'black',
          'align-items': 'center',
          'justify-content': 'center',
        }}>
          Hi!
        </div>
      </ModalDisplayer>
    </div>,
    wrapper
  );

  return wrapper;
};

const defaultArgs = {
  align: 'center',
  animated: 'false',
  direction: 'column',
}

export const Default = Template.bind({}, );
Default.args = {
  ...defaultArgs,
};

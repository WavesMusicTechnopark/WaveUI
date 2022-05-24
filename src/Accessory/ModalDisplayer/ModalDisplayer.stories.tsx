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

class ModalWrapper extends VDom.Component<any, any> {
  state = {
    open: false,
  }

  render(): VDom.VirtualElement {
    return (
      <div>
        <Button onClick={() => {
          this.setState({ open: true, })
        }}>
          Open Modal!
        </Button>
        <div style={{
          height: '2000px',
        }} />
        <ModalDisplayer
          {...this.props.props}
          open={this.state.open}
          onClose={() => {
            this.setState({ open: false, })
          }}
        >
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
      </div>
    );
  }
}

const Template = (args: any) => {
  const wrapper = document.createElement('div');

  const props = {
    animated: args.animated,
    align: args.align,
    direction: args.direction,
  };

  let counter = 0;

  VDom.render(
    <ModalWrapper props={props} />,
    wrapper
  );

  return wrapper;
};

const defaultArgs = {
  align: 'center',
  animated: false,
  direction: 'column',
}

export const Default = Template.bind({}, );
Default.args = {
  ...defaultArgs,
};

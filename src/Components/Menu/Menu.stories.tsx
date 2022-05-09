import VDom from '@rflban/vdom';
import Menu from './Menu';
import MenuItem from './MenuItem/MenuItem';
import { SettingsIcon } from '../../Icons';
import { Divider } from '../index';
import Caption from '../Caption/Caption';

export default {
  title: 'Components/Menu',
  argTypes: {
    preferPos: {
      control: 'select',
      options: ['start', 'end'],
    },
    preferSide: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
}

class MenuDemonstrator extends VDom.Component<any> {
  ref = new VDom.Ref();

  render(): VDom.VirtualElement {
    const {
      args,
      props,
      items,
    } = this.props;

    return (
      <div
        style={{
          display: 'flex',
          'flex-direction': 'row',
          height: '100vh',
        }}
      >
        <div
          style={{
            width: `${args.leftOffset}%`,
          }}
        >
        </div>
        <div
          style={{
            display: 'flex',
            'flex-direction': 'column',
          }}
        >
          <div
            style={{
              height: `${args.topOffset}%`,
            }}
          >
          </div>
          <span
            style={{
              'font-family': 'sans-serif',
              'color': 'white',
              'text-align': 'center',
            }}
            class="waveuiMenu__owner"
            onMouseEnter={() => (this.ref.instance as any).open()}
            onMouseLeave={() => (this.ref.instance as any).close()}
          >
            Hover me!
            <Menu {...props} ref={this.ref}>
              {items}
            </Menu>
          </span>
          <div
            style={{
              height: `${100 - args.topOffset}%`,
            }}
          >
          </div>
        </div>
        <div
          style={{
            width: `${100 - args.leftOffset}%`,
          }}
        >
        </div>
      </div>
    );
  }
}

const Template = (items: any, args: any) => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('waveuiMenu__open');

  const props = {
    side: args.preferSide,
    pos: args.preferPos,
  };

  VDom.render(
    <MenuDemonstrator args={args} props={props} items={items} />,
    wrapper
  );

  return wrapper;
};

const defaultArgs = {
  preferSide: 'bottom',
  preferPos: 'start',
  topOffset: 50,
  leftOffset: 50,
};

export const Default = Template.bind({}, [
  <div style={{
    padding: '8px',
  }}>
    <Caption size="m" align="left">
      Logged in as{'\u00A0'}
    </Caption>
    <Caption size="m" align="left" style={{ 'font-weight': '500' }}>
      Username
    </Caption>
  </div>,
  <Divider/>,
  <MenuItem before={<SettingsIcon style={{height: '45%'}} />}>
    Settings
  </MenuItem>,
  <MenuItem>
    Logout
  </MenuItem>,
]);
Default.args = {
  ...defaultArgs,
}

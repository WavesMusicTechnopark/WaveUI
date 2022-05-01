import VDom from '@rflban/vdom';
import { LogoIcon } from '../../Icons';

type LogoSize = 's' | 'm' | 'l';
type LogoAlign = 'left' | 'center' | 'right';

interface LogoProps {
  size?: LogoSize,
  align?: LogoAlign,
  class?: string,
}

const ResolveLogoSize = (size: LogoSize) => {
  switch (size) {
    case 'l':
      return 'waveuiLogo_lg';
    case 's':
      return 'waveuiLogo_sm';
    case 'm':
    default:
      return '';
  }
}

const ResolveLogoAlign = (align: LogoAlign) => {
  switch (align) {
    case 'left':
      return 'waveuiLogo_left';
    case 'right':
      return 'waveuiLogo_right';
    case 'center':
    default:
      return 'waveuiLogo_center';
  }
}

export default class Logo extends VDom.Component<LogoProps> {
  render(): VDom.VirtualElement {
    const {
      size = 'm',
      align = 'center',
      class: additionalClass = '',
    } = this.props;

    const classes = ['waveuiLogo'];

    classes.push(ResolveLogoSize(size));
    classes.push(ResolveLogoAlign(align));

    return (
      <div class={`${classes.join(' ')} ${additionalClass}`}>
        <LogoIcon class="waveuiLogo__icon"/> Wave Music
      </div>
    );
  }
}

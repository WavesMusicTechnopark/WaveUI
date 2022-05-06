import VDom from '@rflban/vdom';

type SubheadSize = 'l' | 's' | 'm';
type SubheadAlign = 'left' | 'center' | 'right';

interface SubheadProps {
  size?: SubheadSize,
  class?: string,
  align?: SubheadAlign,
}

const resolveSizeClass = (size: SubheadSize): string => {
  switch (size) {
    case 'l':
      return 'waveuiSubhead_large';
    case 's':
      return 'waveuiSubhead_small';
    case 'm':
    default:
      return '';
  }
}

const resolveSubheadAlign = (align: SubheadAlign) => {
  switch (align) {
    case 'left':
      return 'waveuiSubhead_left';
    case 'right':
      return 'waveuiSubhead_right';
    case 'center':
    default:
      return 'waveuiSubhead_center';
  }
}

export default class Subhead extends VDom.Component<SubheadProps> {
  render(): VDom.VirtualElement {
    const classes = ['waveuiSubhead'];

    const {
      size = 'm',
      class: additionalClass = '',
      align = 'center',
    } = this.props;

    classes.push(resolveSizeClass(size));
    classes.push(resolveSubheadAlign(align));

    return (
      <span class={`${classes.join(' ')} ${additionalClass}`}>
        {this.props.children}
      </span>
    );
  }
}

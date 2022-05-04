import VDom from '@rflban/vdom';

type HeadlineSize = 'l' | 's' | 'm';
type HeadlineAlign = 'left' | 'center' | 'right';

interface HeadlineProps {
  size?: HeadlineSize,
  class?: string,
  align?: HeadlineAlign,
}

const resolveSizeClass = (size: HeadlineSize): string => {
  switch (size) {
    case 'l':
      return 'waveuiHeadline_large';
    case 's':
      return 'waveuiHeadline_small';
    case 'm':
    default:
      return '';
  }
}

const resolveHeadlineAlign = (align: HeadlineAlign) => {
  switch (align) {
    case 'left':
      return 'waveuiHeadline_left';
    case 'right':
      return 'waveuiHeadline_right';
    case 'center':
    default:
      return 'waveuiHeadline_center';
  }
}

export default class Headline extends VDom.Component<HeadlineProps> {
  render(): VDom.VirtualElement {
    const classes = ['waveuiHeadline'];

    const {
      size = 'm',
      class: additionalClass = '',
      align = 'center',
    } = this.props;

    classes.push(resolveSizeClass(size));
    classes.push(resolveHeadlineAlign(align));

    return (
      <span class={`${classes.join(' ')} ${additionalClass}`}>
        {this.props.children}
      </span>
    );
  }
}

import VDom from '@rflban/vdom';

type CaptionSize = 'l' | 's' | 'm';
type CaptionAlign = 'left' | 'center' | 'right';

interface CaptionProps {
  size?: CaptionSize,
  class?: string,
  style?: object,
  align?: CaptionAlign,
}

const resolveSizeClass = (size: CaptionSize): string => {
  switch (size) {
    case 'l':
      return 'waveuiCaption_large';
    case 's':
      return 'waveuiCaption_small';
    case 'm':
    default:
      return '';
  }
}

const resolveCaptionAlign = (align: CaptionAlign) => {
  switch (align) {
    case 'left':
      return 'waveuiCaption_left';
    case 'right':
      return 'waveuiCaption_right';
    case 'center':
    default:
      return 'waveuiCaption_center';
  }
}

export default class Caption extends VDom.Component<CaptionProps> {
  render(): VDom.VirtualElement {
    const classes = ['waveuiCaption'];

    const {
      size = 'm',
      class: additionalClass = '',
      align = 'center',
    } = this.props;

    classes.push(resolveSizeClass(size));
    classes.push(resolveCaptionAlign(align));

    return (
      <span class={`${classes.join(' ')} ${additionalClass}`} style={this.props.style ?? {}}>
        {this.props.children}
      </span>
    );
  }
}

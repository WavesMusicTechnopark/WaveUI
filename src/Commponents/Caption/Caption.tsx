import VDom from '@rflban/vdom';

type CaptionSize = 'l' | 's' | 'm';

interface CaptionProps {
  size?: CaptionSize,
  class?: string,
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

export default class Caption extends VDom.Component<CaptionProps> {
  render(): VDom.VirtualElement {
    const classes = ['waveuiCaption'];

    const { size = 'm', class: additionalClass = '' } = this.props;

    classes.push(resolveSizeClass(size));

    return (
      <span class={`${classes.join(' ')} ${additionalClass}`}>
        {this.props.children}
      </span>
    );
  }
}

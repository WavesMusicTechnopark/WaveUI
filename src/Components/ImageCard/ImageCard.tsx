import VDom from '@rflban/vdom';

import ImageButton from '../ImageButton/ImageButton';
import Caption from '../Caption/Caption';
import Subhead from '../Subhead/Subhead';

type ImageWrapper = (_img: VDom.VirtualElement) => VDom.VirtualElement;

type ImageCardDirection = 'row' | 'column';

type ImageCardAlign = 'left' | 'center' | 'right';

type ImageCardSize = 's' | 'm' | 'l';

export interface ImageCardProps {
  src: string;
  icon?: VDom.VirtualElement;
  rounded?: boolean;
  size?: ImageCardSize,
  align?: ImageCardAlign,
  direction?: ImageCardDirection;
  title: VDom.VirtualElement | string;
  label?: VDom.VirtualElement | string;
  imageWrapper?: ImageWrapper;
  zoom?: boolean;
}

interface ImageCardState {
}

const defaultImageWrapper: ImageWrapper = (image) => image;

const resolveSize = (size: ImageCardSize): string => {
  switch (size) {
    case 's':
      return 'waveuiImageCard_small';
    case 'l':
      return 'waveuiImageCard_large';
    case 'm':
    default:
      return 'waveuiImageCard_medium';
  }
}

const resolveAlign = (align: ImageCardAlign): string => {
  switch (align) {
    case 'right':
      return 'waveuiImageCard_right';
    case 'center':
      return 'waveuiImageCard_center';
    case 'left':
    default:
      return 'waveuiImageCard_left';
  }
}

const resolveDirection = (direction: ImageCardDirection): string => {
  switch (direction) {
    case 'row':
      return 'waveuiImageCard_row';
    case 'column':
    default:
      return 'waveuiImageCard_column';
  }
}

const resolveTitle = (title: VDom.VirtualElement | string, size: ImageCardSize): VDom.VirtualElement => {
  switch (size) {
    case 's':
      return (
        <Caption size="m" class="waveuiImageCard__title">
          {title}
        </Caption>
      );
    case 'l':
      return (
        <Subhead size="s" class="waveuiImageCard__title">
          {title}
        </Subhead>
      );
    case 'm':
    default:
      return (
        <Caption size="l" class="waveuiImageCard__title">
          {title}
        </Caption>
      );
  }
}

const resolveLabel = (label: VDom.VirtualElement | string, size: ImageCardSize): VDom.VirtualElement => {
  switch (size) {
    case 's':
      return (
        <Caption size="s" class="waveuiImageCard__label">
          {label}
        </Caption>
      );
    case 'l':
      return (
        <Caption size="m" class="waveuiImageCard__label">
          {label}
        </Caption>
      );
    case 'm':
    default:
      return (
        <Caption size="s" class="waveuiImageCard__label">
          {label}
        </Caption>
      );
  }
}

export default class ImageCard extends VDom.Component<ImageCardProps, ImageCardState> {
  render(): VDom.VirtualElement {
    const {
      src,
      rounded,
      icon,
      title,
      label,
      zoom,
      direction = 'column',
      align = 'left',
      size = 'm',
      imageWrapper = defaultImageWrapper,
    } = this.props;

    const classes = ['waveuiImageCard'];

    classes.push(resolveDirection(direction));
    classes.push(resolveAlign(align));
    classes.push(resolveSize(size));

    return (
      <div class={classes.join(' ')}>
        {imageWrapper(
          <ImageButton
            size={size}
            src={src}
            inside={icon}
            rounded={rounded}
            zoom={zoom}
          />
        )}
        <div class="waveuiImageCard__content">
          {resolveTitle(title, size)}
          {label && resolveLabel(label, size)}
        </div>
      </div>
    );
  }
}

import VDom from '@rflban/vdom';

type ImageButtonSize = 's' | 'm' | 'l';

type ImageButtonTone = 'accent' | 'success' | 'danger';

interface ImageButtonProps {
  src: string;
  size?: ImageButtonSize;
  tone?: ImageButtonTone;
  rounded?: boolean;
  onClick?: (_e: MouseEvent) => void;
  class?: string;
  inside?: VDom.VirtualElement;
}

interface ImageButtonState {
  isHover: boolean;
  isPressed: boolean;
}

const resolveSizeClass = (size: ImageButtonSize): string => {
  switch (size) {
    case 'l':
      return 'waveuiImageButton_large';
    case 's':
      return 'waveuiImageButton_small';
    case 'm':
    default:
      return '';
  }
}

const resolveToneClass = (tone: ImageButtonTone): string => {
  switch (tone) {
    case 'success':
      return 'waveuiImageButton_tone-success';
    case 'danger':
      return 'waveuiImageButton_tone-danger';
    case 'accent':
    default:
      return 'waveuiImageButton_tone-accent';
  }
}

export default class ImageButton extends VDom.Component<ImageButtonProps, ImageButtonState> {
  constructor(props: ImageButtonProps) {
    super(props);

    this.state = {
      isHover: false,
      isPressed: false,
    }
  }

  mouseEnter = (_e: Event) => {
    this.setState({
      isHover: true,
    });
  }

  mouseLeave = (_e: Event) => {
    this.setState({
      isHover: false,
      isPressed: false,
    });
  }

  mouseDown = (_e: Event) => {
    this.setState({
      isPressed: true,
    });
  }

  mouseUp = (_e: Event) => {
    this.setState({
      isPressed: false,
    })
  }

  render(): VDom.VirtualElement {
    const classes: string[] = ["waveuiImageButton"];

    const {
      src,
      size = 'm',
      tone = 'accent',
      onClick,
      inside,
      class: additionalClass,
      rounded,
    } = this.props;

    const { isHover, isPressed } = this.state;

    classes.push(resolveSizeClass(size));
    classes.push(resolveToneClass(tone));

    if (isHover) {
      classes.push('waveuiImageButton_hover');
    }
    if (isPressed) {
      classes.push('waveuiImageButton_pressed');
    }
    if (rounded) {
      classes.push('waveuiImageButton_rounded');
    }

    return (
      <div
        onClick={onClick}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
        onMouseDown={this.mouseDown}
        onMouseUp={this.mouseUp}
        class={`${classes.join(' ')} ${additionalClass}`}
      >
        <img
          src={src}
          draggable={"false"}
          class="waveuiImageButton__content"
          alt="ImageButton"
        />
        <div
          class="waveuiImageButton__shadow"
        >
          {inside && isHover && inside}
        </div>
      </div>
    );
  }
};

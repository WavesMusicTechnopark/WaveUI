import VDom from '@rflban/vdom';
import ImageButton from '../ImageButton/ImageButton';
import { EditIcon } from '../../Icons';
import Inputable, { WithToneProps } from '../../Interfaces/Inputable/Inputable';

type ImageInputSize = 's' | 'm' | 'l';

interface ImageInputProps extends WithToneProps {
  nonValue: string,
  size?: ImageInputSize,
}

interface ImageInputState {
  imagePath?: string,
}

export default class ImageInput extends Inputable<ImageInputProps, ImageInputState> {
  private inputRef = new VDom.Ref<HTMLInputElement>();

  state = {
    imagePath: undefined,
  };

  get value(): File | undefined {
    const { instance: input } = this.inputRef;
    return input.files?.[0];
  }

  public reset(): void {
    this.inputRef.instance.value = '';
    this.setState({
      imagePath: undefined,
    });
  }

  handleInput = (_e: InputEvent) => {
    const { onInput } = this.props;
    const { instance: input } = this.inputRef;
    const image = input.files?.[0];

    if (image) {
      this.setState({
        imagePath: URL.createObjectURL(image),
      });
    }

    if (onInput) {
      onInput();
    }
  }

  render(): VDom.VirtualElement {
    const { nonValue, size, ref: _ref } = this.props;
    const { imagePath } = this.state;

    return (
      <div class="waveuiImageInput">
        <label class="waveuiImageInput__wrapper">
          <input
            ref={this.inputRef}
            class="waveuiImageInput__input"
            type="file"
            accept="image/png, image/jpeg"
            onInput={this.handleInput}
          />
          <ImageButton
            src={imagePath ?? nonValue}
            rounded
            size={size}
            inside={
              <EditIcon class="waveuiImageInput__icon"/>
            }
          />
        </label>
      </div>
    );
  }
}

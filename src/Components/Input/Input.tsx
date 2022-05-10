import VDom from '@rflban/vdom';
import Inputable from '../../Interfaces/Inputable/Inputable';
import SearchIcon from '../../Icons/Search/SearchLeft';

type InputTone = 'accent' | 'danger' | 'success';

type InputMode = 'primary' | 'secondary';

interface InputProps {
  tone?: InputTone;
  placeholder?: string;
  onInput?: Function;
  rounded?: boolean;
  type?: string;
  mode?: InputMode;
  before?: VDom.VirtualElement,
  after?: VDom.VirtualElement,
}

interface InputState {
  isHover: boolean,
}

const resolveMode = (mode: InputMode) => {
  switch(mode) {
    case 'secondary':
      return 'waveuiInput_secondary';
    case 'primary':
    default:
      return 'waveuiInput_primary';
  }
}

const resolveTone = (tone: InputTone) => {
  switch(tone) {
    case 'success':
      return 'waveuiInput_tone-success';
    case 'danger':
      return 'waveuiInput_tone-danger';
    case 'accent':
    default:
      return '';
  }
}

export default class Input extends Inputable<InputProps, InputState> {
  private inputRef: VDom.Ref<HTMLInputElement> = new VDom.Ref<HTMLInputElement>();

  constructor(props: InputProps) {
    super(props);

    this.state = {
      isHover: false,
    }
  }

  get value(): string {
    return this.inputRef.instance.value;
  }

  set value(v: string) {
    this.inputRef.instance.value = v;
  }

  public reset(): void {
    this.inputRef.instance.value = '';
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

  render(): VDom.VirtualElement {
    const {
      mode = 'primary',
      tone = 'accent',
      rounded,
      onInput,
      before,
      after,
      ref: _ref,
      ...restProps
    } = this.props;

    const classes = ['waveuiInput'];

    if (this.state.isHover) {
      classes.push('waveuiInput_hover');
    }
    if (rounded) {
      classes.push('waveuiInput_rounded');
    }

    classes.push(resolveTone(tone));
    classes.push(resolveMode(mode));

    const inputClasses = ['waveuiInput__input'];

    if (!before) {
      inputClasses.push('waveuiInput__input_with-padding-left');
    }

    if (!after) {
      inputClasses.push('waveuiInput__input_with-padding-right');
    }

    return (
      <div
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
        class={classes.join(' ')}
      >
        {
          before && <div class="waveuiInput__before">{before}</div>
        }
        <input onInput={onInput} ref={this.inputRef} {...restProps} class={inputClasses.join(' ')}/>
        <div class="waveuiInput__shadow" />
        {
          after && <div class="waveuiInput__after">{after}</div>
        }
      </div>
    );
  }
}

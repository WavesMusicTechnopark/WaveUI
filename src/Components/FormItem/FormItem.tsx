import VDom from '@rflban/vdom';
import Caption from '../Caption/Caption';
import Inputable, { InputableConstructor } from '../Inputable/Inputable';

type FormItemAlign = 'left' | 'center' | 'right' | 'stretch';

interface FormItemProps {
  align?: FormItemAlign;
  label?: string;
  error?: string;
  checker?: (_value: any) => boolean;
  onInput?: Function;
  as: InputableConstructor;
  [key: string]: any;
}

const resolveAlign = (align: FormItemAlign) => {
  switch (align) {
    case 'left':
      return 'waveuiFormItem_left';
    case 'right':
      return 'waveuiFormItem_right';
    case 'center':
      return 'waveuiFormItem_center';
    case 'stretch':
    default:
      return '';
  }
}

interface FormItemState {
  isValid: boolean;
}

export default class FormItem extends VDom.Component<FormItemProps, FormItemState> {
  private inputRef = new VDom.Ref<Inputable>();

  state = {
    isValid: true,
  }

  reset() {
    this.inputRef.instance.reset();
    this.setState({
      isValid: true,
    });
  }

  check(): boolean {
    const { checker } = this.props;
    const { instance: input } = this.inputRef;

    if (checker) {
      const isValid = checker(input.value);

      this.setState({
        isValid,
      })

      return isValid;
    }

    return true;
  }

  @VDom.util.Debounce(600)
  validate(): void {
    this.check();
  }

  get value(): any {
    return this.inputRef.instance.value;
  }

  set value(v: any) {
    this.inputRef.instance.value = v;
  }

  inputHandler = (e: InputEvent) => {
    const { checker, onInput } = this.props;

    if (checker) {
      this.validate();
    }
    if (onInput) {
      onInput(e);
    }
  }

  render(): VDom.VirtualElement {
    const { checker: _, label, error, as: Input, align = 'stretch', ...restProps } = this.props;
    const { isValid } = this.state;

    const classes = ['waveuiFormItem'];

    if (!isValid) {
      classes.push('waveuiFormItem_invalid');
    }

    classes.push(resolveAlign(align));

    return (
      <div class={classes.join(' ')}>
        {label && (
          <Caption
            align="left"
            size="m"
            class="waveuiFormItem__label"
          >
            {label}
          </Caption>
        )}

        <Input
          {...restProps}
          tone={isValid ? undefined : 'danger'}
          ref={this.inputRef}
          onInput={this.inputHandler}
        />

        {error && (
          <Caption
            align="left"
            size="m"
            class="waveuiFormItem__error"
          >
            {error}
          </Caption>
        )}
      </div>
    );
  }
}

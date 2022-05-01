import VDom from '@rflban/vdom';
import Caption from '../Caption/Caption';
import Inputable, { InputableConstructor } from '../Inputable/Inputable';

interface FormItemProps {
  label?: string;
  error?: string;
  checker?: (_value: string) => boolean;
  onInput?: Function;
  as: InputableConstructor;
  [key: string]: any;
}

interface FormItemState {
  isValid: boolean;
}

export default class FormItem extends VDom.Component<FormItemProps, FormItemState> {
  private inputRef = new VDom.Ref<Inputable>();

  state = {
    isValid: true,
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

  get value(): string {
    return this.inputRef.instance.value;
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
    const { checker: _, label, error, as: Input, ...restProps } = this.props;
    const { isValid } = this.state;

    const classes = ['waveuiFormItem'];

    if (!isValid) {
      classes.push('waveuiFormItem_invalid');
    }

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

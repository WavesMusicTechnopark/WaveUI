import VDom from '@rflban/vdom';
import Caption from '../Caption/Caption';
import Inputable, { InputableConstructor } from '../Inputable/Inputable';

interface FormItemProps {
  label?: string;
  error?: string;
  checker?: (_value: string) => boolean;
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

  @VDom.util.Debounce(600)
  validate(): boolean {
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

  inputHandler = (_e: InputEvent) => {
    const { checker } = this.props;

    if (checker) {
      this.validate();
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

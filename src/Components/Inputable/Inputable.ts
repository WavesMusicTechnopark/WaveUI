import VDom from '@rflban/vdom';

export interface WithToneProps {
  tone?: string;
  ref?: VDom.Ref<VDom.RefTypes>;
  onInput?: Function;
  nonValue?: any;
}

export default abstract class Inputable<
  Props extends WithToneProps = WithToneProps,
  State = any,
  Snapshot = any,
  ContextType = null
  > extends VDom.Component<
  Props,
  State,
  Snapshot,
  ContextType
  > {
  public abstract value: any;
  public abstract reset(): void;
}

export type InputableConstructor<
  Props extends WithToneProps = WithToneProps,
  State = any,
  Snapshot = any,
  ContextType = null
  > = new (_props: Props) => Inputable<Props, State, Snapshot, ContextType>;

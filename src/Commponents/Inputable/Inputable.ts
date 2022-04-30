import VDom from '@rflban/vdom';

interface WithToneProps {
  tone?: string;
  ref?: VDom.Ref<VDom.RefTypes>;
  onInput?: Function;
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
  abstract value: string;
}

export type InputableConstructor<
  Props extends WithToneProps = WithToneProps,
  State = any,
  Snapshot = any,
  ContextType = null
  > = new (_props: Props) => Inputable<Props, State, Snapshot, ContextType>;

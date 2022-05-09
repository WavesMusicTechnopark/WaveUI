import VDom from '@rflban/vdom';

export interface IconProps {
  class?: string;
  style?: object;
  ref?: VDom.Ref<VDom.RefTypes>;
}

type IconConstructor = new (_props: IconProps) => VDom.Component<IconProps>;

let iconFactory: (svg: VDom.VirtualElement) => IconConstructor;
iconFactory = (svg: VDom.VirtualElement): IconConstructor => {
  return class Icon extends VDom.Component<IconProps> {
    private rootRef = new VDom.Ref<HTMLElement>();

    get rootDOM(): HTMLElement {
      return this.rootRef.instance;
    }

    render(): VDom.VirtualElement {
      const { class: additionalClass = '', style } = this.props;

      return (
        <div
          ref={this.rootRef}
          class={`waveuiIcon ${additionalClass}`}
          style={style ?? {}}
        >
          {svg}
        </div>
      );
    }
  };
};

export default iconFactory;

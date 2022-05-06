import VDom from '@rflban/vdom';

export interface IconProps {
  class?: string,
  style?: object,
}

type IconConstructor = new (_props: IconProps) => VDom.Component<IconProps>;

let iconFactory: (svg: VDom.VirtualElement) => IconConstructor;
iconFactory = (svg: VDom.VirtualElement): IconConstructor => {
  return class Icon extends VDom.Component<IconProps> {
    render(): VDom.VirtualElement {
      const { class: additionalClass = '', style } = this.props;

      return (
        <div class={`waveuiIcon ${additionalClass}`} style={style ?? {}}>
          {svg}
        </div>
      );
    }
  };
};

export default iconFactory;

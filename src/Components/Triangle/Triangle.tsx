import VDom from '@rflban/vdom';

type TrianglePos = 'start' | 'end';
type TriangleSide = 'top' | 'left' | 'bottom' | 'right';

interface TriangleProps {
  size?: number,
  offset?: number,
  borderWidth?: number,
  pos?: TrianglePos,
  side?: TriangleSide,
  color?: string,
  borderColor?: string,
}

interface TriangleState {
}

const oppositeSide = (side: TriangleSide): TriangleSide => {
  switch (side) {
    case 'left':
      return 'right';
    case 'right':
      return 'left';
    case 'bottom':
      return 'top';
    case 'top':
    default:
      return 'bottom';
  }
}

const resolvePos = (pos: TrianglePos, side: TriangleSide): TriangleSide => {
  switch (true) {
    case pos === 'start' && side === 'top':
    case pos === 'start' && side === 'bottom':
      return 'left';
    case pos === 'end' && side === 'top':
    case pos === 'end' && side === 'bottom':
      return 'right';
    case pos === 'start' && side === 'right':
    case pos === 'start' && side === 'left':
      return 'top';
    case pos === 'end' && side === 'right':
    case pos === 'end' && side === 'left':
    default:
      return 'bottom';
  }
}

export default class Triangle extends VDom.Component<TriangleProps, TriangleState> {
  getRelativeStyles = (): { inner: any, outer: any } => {
    const {
      size = 8,
      offset = 10,
      borderWidth = 1,
      pos = 'end',
      side = 'top',
      color = 'var(--waveui--color--accent--background)',
      borderColor = 'var(--waveui--color--border--secondary)',
    } = this.props;

    return {
      inner: {
        border: `${size - borderWidth}px solid transparent`,
        [`border-${side}`]: '0',
        [`border-${oppositeSide(side)}-color`]: color,
        [side]: `-${size - borderWidth}px`,
        [resolvePos(pos, side)]: `${offset + borderWidth}px`,
      },
      outer: {
        border: `${size}px solid transparent`,
        [`border-${side}`]: '0',
        [`border-${oppositeSide(side)}-color`]: borderColor,
        [side]: `-${size}px`,
        [resolvePos(pos, side)]: `${offset}px`,
      },
    };
  }

  render(): VDom.VirtualElement {
    const { inner, outer } = this.getRelativeStyles();

    return (
      <>
        <div
          style={{
            content: '',
            position: 'absolute',
            ...outer,
          }}
        />
        <div
          style={{
            content: '',
            position: 'absolute',
            ...inner,
          }}
        />
      </>
    );
  }
}

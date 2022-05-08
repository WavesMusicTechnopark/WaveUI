import VDom from '@rflban/vdom';
import { ArrowLeftIcon, ArrowRightIcon } from '../../Icons';

const DEFAULT_SCROLL_STEP = 180;
const DEFAULT_GAP = 20;

interface HorizontalScrollProps {
  controlsCenterOffset?: number;
  scrollStep?: number;
  gap?: number;
  leftOffset?: number;
  rightOffset?: number;
}

interface HorizontalScrollState {
  atStart: boolean;
  atEnd: boolean;
}

export default class HorizontalScroll extends VDom.Component<HorizontalScrollProps, HorizontalScrollState> {
  state = {
    atStart: true,
    atEnd: false,
  };

  private layoutRef = new VDom.Ref<HTMLElement>();

  scrollHandler = (e: Event): void => {
    const layout = e.target;
    const {
      atStart,
      atEnd,
    } = this.state;

    if (layout instanceof HTMLElement) {
      if (layout.scrollLeft <= 0) {
        if (!atStart) {
          this.setState({
            atStart: true,
          })
        }
      } else {
        if (atStart) {
          this.setState({
            atStart: false,
          })
        }
      }

      if (layout.scrollWidth - layout.scrollLeft <= layout.clientWidth) {
        if (!atEnd) {
          this.setState({
            atEnd: true,
          })
        }
      } else {
        if (atEnd) {
          this.setState({
            atEnd: false,
          })
        }
      }
    }
  }

  scrollNext = (_e: Event): void => {
    const { scrollStep = DEFAULT_SCROLL_STEP } = this.props;
    const { instance: layout } = this.layoutRef;

    layout.scrollTo({
      left: layout.scrollLeft + scrollStep,
      behavior: 'smooth',
    });
  }

  scrollPrev = (_e: Event): void => {
    const { scrollStep = DEFAULT_SCROLL_STEP } = this.props;
    const { instance: layout } = this.layoutRef;

    layout.scrollTo({
      left: layout.scrollLeft - scrollStep,
      behavior: 'smooth',
    });
  }

  render(): VDom.VirtualElement {
    const classes = ['waveuiHorizontalScroll'];

    const {
      controlsCenterOffset = 0,
      gap = DEFAULT_GAP,
      leftOffset = 0,
      rightOffset = 0,
    } = this.props;
    const {
      atStart,
      atEnd,
    } = this.state;

    if (atStart) {
      classes.push('waveuiHorizontalScroll_at-start');
    }
    if (atEnd) {
      classes.push('waveuiHorizontalScroll_at-end');
    }

    return (
      <div
        class={`${classes.join(' ')}`}
        style={{
          ['margin-left']: `-${leftOffset}px`,
          ['margin-right']: `-${rightOffset}px`,
        }}
      >
        <div
          class="waveuiHorizontalScroll__prev"
          style={{
            ['padding-bottom']: `${controlsCenterOffset}px`,
            ['margin-left']: `${leftOffset}px`,
          }}
        >
          <div class="waveuiHorizontalScroll__control" onClick={this.scrollPrev}>
            <ArrowRightIcon class="waveuiHorizontalScroll__control-icon" />
          </div>
        </div>
        <div
          class="waveuiHorizontalScroll__next"
          style={{
            ['padding-bottom']: `${controlsCenterOffset}px`,
            ['margin-right']: `${rightOffset}px`,
          }}
        >
          <div class="waveuiHorizontalScroll__control" onClick={this.scrollNext}>
            <ArrowRightIcon class="waveuiHorizontalScroll__control-icon" />
          </div>
        </div>
        <div
          ref={this.layoutRef}
          class="waveuiHorizontalScroll__inner"
          onScroll={this.scrollHandler}
        >
          <div class="waveuiHorizontalScroll__wrapper" style={{ gap: `${gap}px` }}>
            {this.props.children?.map((child, idx, children) => (
              <div
                class="waveuiHorizontalScroll__cell"
                key={child instanceof VDom.VirtualElement ? child.key : undefined}
                style={{
                  ['margin-left']: (idx === 0) ? `${leftOffset}px` : '0',
                  ['margin-right']: (idx === children.length - 1) ? `${rightOffset}px` : '0',
                }}
              >
                {child}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

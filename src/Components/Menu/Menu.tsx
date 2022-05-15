import VDom from '@rflban/vdom';
import Triangle from '../Triangle/Triangle';
import { MenuContext, IMenu } from '../../Interfaces/Menu/Menu';

type MenuPos = 'start' | 'end';
type MenuSide = 'top' | 'left' | 'bottom' | 'right';

const DEFAULT_POS: MenuPos = 'start';
const DEFAULT_SIDE: MenuSide = 'bottom';
const DEFAULT_OFFSET = 0;
const TRIANGLE_SIZE = 8;
const MENU_GAP = 8;

interface MenuProps {
  ref?: VDom.Ref<VDom.RefTypes>,
  pos?: MenuPos;
  side?: MenuSide;
  offset?: number;
  triangleOffset?: number;
  scrollable?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  closeOnParentClick?: boolean;
}

interface MenuState {
  isOpen: boolean;
  pos?: MenuPos;
  side?: MenuSide;
}

function fits(args: {
  pos: MenuPos,
  side: MenuSide,
  parentRect: DOMRect,
  rect: DOMRect,
  pageWidth: number,
  pageHeight: number,
  additionalOffset?: number,
}): boolean {
  const {
    pos, side, parentRect, rect, pageHeight, pageWidth, additionalOffset = 0,
  } = args;
  let mainSize = 0;
  let mainDiff = 0;
  let accessorySize = 0;
  let accessoryDiff = 0;

  if (side === 'top' || side === 'bottom') {
    mainSize = rect.height;
    accessorySize = rect.width;

    if (side === 'top') {
      mainDiff = parentRect.top;
    } else {
      mainDiff = pageHeight - parentRect.bottom;
    }

    if (pos === 'start') {
      accessoryDiff = parentRect.left + (parentRect.left + parentRect.width / 2);
    } else {
      accessoryDiff = pageWidth - (parentRect.left + parentRect.width / 2);
    }
  } else {
    mainSize = rect.width;
    accessorySize = rect.height;

    if (side === 'left') {
      mainDiff = parentRect.left;
    } else {
      mainDiff = pageWidth - parentRect.right;
    }

    if (pos === 'start') {
      accessoryDiff = parentRect.top + (parentRect.top + parentRect.height / 2);
    } else {
      accessoryDiff = pageHeight - (parentRect.top + parentRect.height / 2);
    }
  }

  mainDiff += additionalOffset;

  return mainDiff >= mainSize && accessoryDiff >= accessorySize;
}

const getOppositeSide = (side: MenuSide): MenuSide => {
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

const getOppositePos = (pos: MenuPos): MenuPos => {
  if (pos === 'start') {
    return 'end';
  }
  return 'start';
}

const resolvePos = (pos: MenuPos, side: MenuSide): MenuSide => {
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

export default class Menu extends IMenu<MenuProps, MenuState, null, IMenu | null> {
  static contextType = MenuContext;

  state = {
    isOpen: false,
  } as MenuState

  private rootRef = new VDom.Ref<HTMLElement>();

  get rootDOM(): HTMLElement {
    return this.rootRef.instance;
  }

  toggle() {
    if (this.state.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  close(levels?: boolean | number) {
    this.setState({
      isOpen: false,
    })

    this.props.onClose?.();
    this.onMenuClose();

    if (levels || typeof levels === 'number' && levels < 0) {
      const parentMenu = this.context;
      parentMenu?.close(levels > 0 ? +levels - 1 : levels);
    }
  }

  open() {
    let pos = undefined, side = undefined;
    const {
      offset = DEFAULT_OFFSET,
      pos: preferPos = DEFAULT_POS,
      side: preferSide = DEFAULT_SIDE,
    } = this.props;

    const saveClass = this.rootDOM.className;
    const saveDisplay = this.rootDOM.style.display;
    this.rootDOM.className = ('waveuiMenu_hidden');
    this.rootDOM.style.display = 'flex';

    const rect = this.rootDOM.getBoundingClientRect();

    this.rootDOM.className = saveClass;
    this.rootDOM.style.display = saveDisplay;

    const parent = this.rootDOM.parentElement!;
    const parentRect = parent.getBoundingClientRect();
    const pageWidth = document.documentElement.scrollWidth;
    const pageHeight = document.documentElement.scrollHeight;

    if (!fits({
      pos: preferPos,
      side: preferSide,
      parentRect,
      rect,
      pageHeight,
      pageWidth,
      additionalOffset: offset + TRIANGLE_SIZE,
    })) {
      for (const { p, s } of [
        { p: 'start', s: 'bottom' },
        { p: 'end', s: 'bottom' },
        { p: 'start', s: 'top' },
        { p: 'end', s: 'top' },
        { p: 'start', s: 'right' },
        { p: 'end', s: 'right' },
        { p: 'start', s: 'left' },
        { p: 'end', s: 'left' },
      ]) {
        if (fits({
          pos: p as MenuPos,
          side: s as MenuSide,
          parentRect,
          rect,
          pageHeight,
          pageWidth,
          additionalOffset: offset + TRIANGLE_SIZE,
        })) {
          pos = p;
          side = s;
          break;
        }
      }
    }

    this.props.onOpen?.();
    this.onMenuOpen();

    this.setState({
      isOpen: true,
      pos,
      side,
    })
  }

  get isOpen() {
    return this.state.isOpen;
  }

  clickHandler = (e: MouseEvent) => {
    if (e.target instanceof HTMLElement && e.currentTarget instanceof HTMLElement && e.currentTarget.contains(e.target.closest('a'))) {
      this.close();
    }
  }

  globalClickHandler = (e: MouseEvent): void => {
    const {
      closeOnParentClick,
    } = this.props;

    const DOMNode = closeOnParentClick ? this.rootDOM : (this.rootDOM.parentElement ?? this.rootDOM);

    if (e.target instanceof Node) {
      if (!DOMNode.contains(e.target)) {
        this.close();
      }
    }
  }

  onMenuOpen = (): void => {
    document.addEventListener('click', this.globalClickHandler, true);
  }

  onMenuClose = (): void => {
    document.removeEventListener('click', this.globalClickHandler, true);
  }

  render(): VDom.VirtualElement {
    const classes = ['waveuiMenu'];
    const triangleSize = TRIANGLE_SIZE;

    const {
      offset = DEFAULT_OFFSET,
      triangleOffset = 10,
      pos: preferPos = DEFAULT_POS,
      side: preferSide = DEFAULT_SIDE,
      scrollable,
    } = this.props;
    const {
      isOpen,
      pos: computedPos,
      side: computedSide,
    } = this.state;

    const pos = computedPos ?? preferPos;
    const side = computedSide ?? preferSide;

    if (isOpen) {
      classes.push('waveuiMenu_opened');
    }

    const oppositeSide = getOppositeSide(side);
    const oppositePos = getOppositePos(pos);
    const resolvedPos = resolvePos(oppositePos, side);

    return (
      <MenuContext.Provider value={this}>
        <div
          class={`${classes.join(' ')}`}
          ref={this.rootRef}
          style={{
            [oppositeSide]: `calc(100% + ${triangleSize + offset}px)`,
            [resolvedPos]: `calc(50% - ${triangleOffset + triangleSize}px)`,
          }}
        >
          <div
            class="waveuiMenu__inner"
          >
            <Triangle
              size={triangleSize}
              offset={triangleOffset}
              side={oppositeSide}
              pos={oppositePos}
            />
            <div
              style={{
                position: 'absolute',
                top: `-${offset + triangleSize}px`,
                left: `-${offset + triangleSize}px`,
                width: `calc(100% + 2 * ${offset + triangleSize}px)`,
                height: `calc(100% + 2 * ${offset + triangleSize}px)`,
                cursor: 'default',
              }}
            />
            <div
              class={`waveuiMenu__items ${scrollable ? 'waveuiMenu__items_scrollable' : ''}`}
              onClickCapture={this.clickHandler}
            >
              {this.props.children}
            </div>
          </div>
        </div>
      </MenuContext.Provider>
    );
  }
}

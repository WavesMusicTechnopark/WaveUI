import VDom from '@rflban/vdom';

export abstract class IMenu<
  Props = {}, State = any, Snapshot = any, ContextValue = null
  > extends VDom.Component<Props, State, Snapshot, ContextValue> {
  abstract close(_levels?: boolean | number): void;
  abstract open(): void;
  abstract toggle(): void;
}

export const MenuContext = VDom.createContext<IMenu | null>(null);

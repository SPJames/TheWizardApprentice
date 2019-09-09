export interface iHTML {
  target: string;
  domString: string;
  rerenderProps: Map<string, HTMLElement>;
  renderId: number;
  parent: any;
  render(): void;
  rerender(): void;
  on(target: string, eventType: string, cb: Function): void;
  off(target: string, eventType: string, cb: Function): void;
  addClass(target: string, className: string): void;
  removeClass(target: string, className: string): void;
}

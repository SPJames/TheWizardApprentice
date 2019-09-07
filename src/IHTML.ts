export interface HTML{
  target:string;
  domString:string;
  rerenderProps: string[];
  rerenderEls: HTMLElement[];
  render(): void;
  rerender(delta: number): void;
  on(target:string, eventType:string, cb:Function): boolean;
  off(target:string, eventType:string): boolean;
  addClass(target:string, className: string): boolean;
  removeClass(target: string, className: string): boolean;
}
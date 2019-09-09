import { iHTML } from './interfaces/IHtml';

export class HTML implements iHTML {
  target: string;
  domString: string;
  rerenderProps: Map<string, HTMLElement>;
  renderId: number;
  parent: any;
  constructor(
    target: string,
    domString: string,
    rerenderProps: string[],
    parent: any,
  ) {
    this.target = target;
    this.domString = domString;
    this.rerenderProps = new Map();
    rerenderProps.forEach((prop) => {
      this.rerenderProps.set(prop, null);
    });
    this.renderId = Math.random() * 10000;
    this.domString = this.domString.replace(/renderId/g, '' + this.renderId);
    this.parent = parent;
    this.render();
  }
  render(): void {
    const el = document.createRange().createContextualFragment(this.domString);
    document.querySelector(this.target).appendChild(el);
    this.rerenderProps.forEach((_, key) => {
      this.rerenderProps.set(
        key,
        document.querySelector(`[data-render="${this.renderId}-${key}"]`),
      );
    });
  }
  rerender(): void {
    this.rerenderProps.forEach((el, prop) => {
      el.innerHTML = `${this.toPascalCase(prop)}: ${this.parent[prop]}`;
    });
  }
  on(target: string, eventType: string, cb: Function): void {
    document
      .querySelector(`[data-action="${this.renderId}-${target}"]`)
      .addEventListener(eventType, () => cb());
  }
  off(target: string, eventType: string, cb: Function): void {
    document
      .querySelector(`[data-action="${this.renderId}-${target}"]`)
      .removeEventListener(eventType, () => cb());
  }
  addClass(target: string, className: string): void {}
  removeClass(target: string, className: string): void {}

  private toPascalCase(input: string): string {
    const output = input.replace(/(\w)(\w*)/g, function(g0, g1, g2) {
      return g1.toUpperCase() + g2.toLowerCase();
    });
    return output;
  }
}

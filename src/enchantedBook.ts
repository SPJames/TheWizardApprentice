import { iGenerator } from './iGenerator';
import { iResource } from './iResource';

export class EnchantedBook implements iGenerator {
  generates: iResource;
  name: string;
  cost: number;
  bought: boolean;
  level: number;
  genAmount: number;
  renderId: number = 0;
  constructor(genAmount: number, cost: number, generates: iResource) {
    this.bought = false;
    this.level = 0;
    this.genAmount = genAmount;
    this.cost = cost;
    this.name = 'Enchanted Book';
    this.generates = generates;
    this.renderId = Math.random() * 10000;
  }
  buy(levels: number): void {
    this.level += levels;
    this.cost = this.cost * (this.level * 8);
    this.bought = true;
  }

  getGenAmount(): number {
    return this.genAmount * this.level;
  }

  initDraw(): DocumentFragment {
    const el = document.createRange().createContextualFragment(`
      <div class="generator">
        <p data-render="${this.renderId}-name"> Name: ${this.name} </p>
        <p data-render="${this.renderId}-cost"> Cost: ${this.cost} </p>
        <p data-render="${this.renderId}-level"> Level: ${this.level} </p>
        <a data-action="${this.renderId}-buy"> Buy </a>
      </div>
    `);
    return el;
  }

  render(): void {
    for (let string of ['name', 'cost', 'level']) {
      document.querySelector(
        `[data-render='${this.renderId}-${string}']`,
      ).innerHTML = `${string}: ${this[string]}`;
    }
  }
}

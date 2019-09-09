import { iGenerator } from '../interfaces/iGenerator';
import { iResource } from '../interfaces/iResource';
import { iHTML } from '../interfaces/IHtml';
import { HTML } from '../html';

export class PotionBrewing implements iGenerator {
  generates: iResource;
  name: string;
  cost: number;
  bought: boolean;
  level: number;
  genAmount: number;
  HTML: iHTML;
  constructor(genAmount: number, cost: number, generates: iResource) {
    this.bought = false;
    this.level = 0;
    this.genAmount = genAmount;
    this.cost = cost;
    this.name = 'Potion Brewing';
    this.generates = generates;
    this.HTML = new HTML(
      '.generators',
      `
    <div class="generator">
      <p data-render="renderId-name"> Name: ${this.name} </p>
      <p data-render="renderId-cost"> Cost: ${this.cost} </p>
      <p data-render="renderId-level"> Level: ${this.level} </p>
      <a data-action="renderId-buy"> Buy </a>
    </div>
  `,
      ['name', 'cost', 'level'],
      this,
    );
  }
  buy(levels: number): void {
    this.level += levels;
    this.cost = this.cost * (this.level * 2);
    this.bought = true;
  }

  getGenAmount(): number {
    return this.genAmount * this.level;
  }

  render(): void {
    this.HTML.rerender();
  }
}

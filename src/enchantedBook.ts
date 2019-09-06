import { iGenerator } from "./iGenerator";
import { iResource } from "./iResource";

export class EnchantedBook implements iGenerator {
  generates: iResource;
  name: string;
  cost: number;
  bought: boolean;
  level: number;
  genAmount: number;
  constructor(genAmount: number, cost: number, generates: iResource) {
    this.bought = false;
    this.level = 0;
    this.genAmount = genAmount;
    this.cost = cost;
    this.name = "Enchanted Book";
    this.generates = generates;
  }
  buy(levels: number): void {
    this.level += levels;
    this.bought = true;
  }

  getGenAmount(): number {
    return this.genAmount * this.level;
  }
}

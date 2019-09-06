import { iResource } from "./iResource";
export class ManaResource implements iResource {
  amount: number;
  name: string;
  constructor(amount: number) {
    this.name = "Mana";
    this.amount = amount;
  }

  spend(amount: number): void {
    this.amount -= amount;
  }

  add(amount: number): void {
    this.amount += amount;
  }
}

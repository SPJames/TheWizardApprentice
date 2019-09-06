import { iResource } from "./iResource";

export class ShardResource implements iResource {
  amount: number;
  name: string;
  constructor(amount: number, name: string) {
    this.amount = amount;
    this.name = name;
  }
  spend(amount: number): void {}
  add(amount: number): void {}
}

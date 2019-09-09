import { iShardGenerator } from "./interfaces/iShardGenerator";
import { iResource } from "./interfaces/iResource";

export class ShardGenerator implements iShardGenerator {
  bought: boolean;
  generates: iResource;
  name: string;
  speed: number;
  genAmount: number;

  private genPercent: number = 0;

  // TODO: balance shard generator numbers
  constructor(generates: iResource, name: string) {
    this.genAmount = 1;
    this.speed = 1;
    this.generates = generates;
    this.name = name;
    this.bought = false;
  }
  buy(): void {
    throw new Error("Method not implemented.");
  }
  tick(delta: number): void {
    if (this.genPercent < 100) {
      this.genPercent += this.speed * delta;
    }
  }
  getPercent(): string {
    return this.genPercent.toFixed(2);
  }
  collect(): boolean {
    if (this.genPercent >= 100) {
      this.genPercent = 0;
      return true;
    }
    return false;
  }
}

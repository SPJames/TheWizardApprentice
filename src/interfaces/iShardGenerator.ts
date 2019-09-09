import { iResource } from "./iResource";

export interface iShardGenerator {
  generates: iResource;
  name: string;
  speed: number;
  genAmount: number;
  bought: boolean;
  buy(): void;
  tick(delta: number): void;
  collect(): boolean;
  getPercent(): string;
}

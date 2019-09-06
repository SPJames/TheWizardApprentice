import { iResource } from "./iResource";

export interface iGenerator {
  bought: boolean;
  level: number;
  genAmount: number;
  cost: number;
  name: string;
  generates: iResource;
  buy(levels: number): void;

  getGenAmount(): number;
}

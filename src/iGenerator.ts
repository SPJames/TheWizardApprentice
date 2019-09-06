import { iResource } from './iResource';

export interface iGenerator {
  bought: boolean;
  level: number;
  genAmount: number;
  cost: number;
  name: string;
  generates: iResource;
  renderId: number;
  buy(levels: number): void;

  getGenAmount(): number;

  initDraw(): DocumentFragment;

  render(): void;
}

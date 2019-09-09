import { iResource } from './iResource';
import { iHTML } from './IHtml';

export interface iGenerator {
  bought: boolean;
  level: number;
  genAmount: number;
  cost: number;
  name: string;
  generates: iResource;
  HTML: iHTML;
  buy(levels: number): void;
  getGenAmount(): number;
  render(): void;
}

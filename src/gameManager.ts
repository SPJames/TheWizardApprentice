import { iResource } from "./iResource";
import { iGenerator } from "./iGenerator";

let _gm = null;

export class GameManager {
  resources: iResource[] = [];
  generators: iGenerator[] = [];
  constructor() {
    if (!_gm) {
      _gm = this;
    } else {
      return _gm;
    }
  }

  addResouce(resouce: iResource): void {
    this.resources.push(resouce);
  }

  addGenerator(generator: iGenerator): void {
    this.generators.push(generator);
  }

  buyGenerator(genName: string, levels?: number): boolean {
    const gen = this.generators.find(g => g.name === genName);
    if (gen.cost <= 10) {
      // dynamicly check if user has enough of resource (gen.generates)
      gen.buy(levels || 1);
      this.resources[0].spend(gen.cost); // make this dynamic on the gen.generates resouce type
      return true;
    }
    return false;
  }

  generate(delta: number): void {
    for (let generator of this.generators) {
      if (generator.bought) {
        const genAmount = generator.getGenAmount();
        this.resources[0].add(genAmount * delta); // make dynamic based on generator.generates
      }
    }
  }
}

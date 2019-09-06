import { iResource } from './iResource';
import { iGenerator } from './iGenerator';
import { iShardGenerator } from './iShardGenerator';

// Singleton declaration
let _gm = null;

export class GameManager {
  resources: iResource[] = [];
  generators: iGenerator[] = [];
  shardGenerators: iShardGenerator[] = [];
  constructor() {
    // Either make an instance or return existing instance (singleton)
    if (!_gm) {
      _gm = this;
    } else {
      return _gm;
    }
  }

  addResouce(resouce: iResource): void {
    this.resources.push(resouce);
  }
  addResouces(resources: iResource[]): void {
    this.resources = this.resources.concat(resources);
  }
  getResource(name: string): iResource {
    return this.resources.find((r) => r.name === name);
  }

  addGenerator(generator: iGenerator): void {
    this.generators.push(generator);
  }
  addGenerators(generators: iGenerator[]): void {
    this.generators = this.generators.concat(generators);
  }
  getGenerator(name: string): iGenerator {
    return this.generators.find((g) => g.name === name);
  }

  addShardGenerator(generator: iShardGenerator): void {
    this.shardGenerators.push(generator);
  }
  addShardGenerators(generators: iShardGenerator[]): void {
    this.shardGenerators = this.shardGenerators.concat(generators);
  }
  getShardGenerator(name: string): iShardGenerator {
    return this.shardGenerators.find((sg) => sg.name === name);
  }

  buyGenerator(genName: string, levels?: number): boolean {
    const gen = this.generators.find((g) => g.name === genName);
    const res = this.getResource(gen.generates.name);
    if (gen.cost <= res.amount) {
      res.spend(gen.cost);
      gen.buy(levels || 1);
      return true;
    }
    return false;
  }

  generate(delta: number): void {
    let res;
    for (let generator of this.generators) {
      res = this.getResource(generator.generates.name);
      if (generator.bought) {
        const genAmount = generator.getGenAmount();
        res.add(genAmount * delta); // make dynamic based on generator.generates
      }
    }
  }

  tickShardGenerators(delta): void {
    for (let gen of this.shardGenerators) {
      if (gen.bought) {
        gen.tick(delta);
      }
    }
  }
}

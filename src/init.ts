import { ManaResource } from "./manaResource";
import { EnchantedBook } from "./enchantedBook";
import { ShardResource } from "./shardResource";
import { ShardGenerator } from "./shardGenerator";
import { iGenerator } from "./iGenerator";
import { iShardGenerator } from "./iShardGenerator";
import { iResource } from "./iResource";

export function initResources(): iResource[] {
  const mana = new ManaResource(10);
  const fireShard = new ShardResource(0, "Fire Shard");
  return [mana, fireShard];
}

export function initGenerators(gm): iGenerator[] {
  const enchantedBook = new EnchantedBook(0.1, 10, gm.getResource("Mana"));
  return [enchantedBook];
}

export function initShardGenerators(gm): iShardGenerator[] {
  const fireGenerator = new ShardGenerator(
    gm.getResource("Fire Shard"),
    "Fire Generator"
  );
  return [fireGenerator];
}

import { ManaResource } from './manaResource';
import { EnchantedBook } from './enchantedBook';
import { ShardResource } from './shardResource';
import { ShardGenerator } from './shardGenerator';
import { iGenerator } from './iGenerator';
import { iShardGenerator } from './iShardGenerator';
import { iResource } from './iResource';

export const config = {
  primaryResource: 'Mana',
  shardFire: 'Fire Shard',
  shardWater: 'Water Shard',
  shardEarth: 'Earth Shard',
  shardAir: 'Air Shard',
  shardDarkness: 'Darkness Shard',
  shardLight: 'Light Shard',
  genShardFire: 'Fire Generator',
  genShardWater: 'Water Generator',
  genShardAir: 'Air Generator',
  genShardEarth: 'Earth Generator',
  genShardDarkness: 'Darkness Generator',
  genShardLight: 'Light Generator',
};

export function initResources(): iResource[] {
  return [
    new ManaResource(10),
    new ShardResource(0, config.shardFire),
    new ShardResource(0, config.shardWater),
    new ShardResource(0, config.shardEarth),
    new ShardResource(0, config.shardAir),
    new ShardResource(0, config.shardDarkness),
    new ShardResource(0, config.shardLight),
  ];
}

export function initGenerators(gm): iGenerator[] {
  return [new EnchantedBook(0.1, 10, gm.getResource(config.primaryResource))];
}

export function initShardGenerators(gm): iShardGenerator[] {
  return [
    new ShardGenerator(gm.getResource(config.shardFire), config.genShardFire),
    new ShardGenerator(gm.getResource(config.shardWater), config.genShardWater),
    new ShardGenerator(gm.getResource(config.shardAir), config.genShardAir),
    new ShardGenerator(gm.getResource(config.shardEarth), config.genShardEarth),
    new ShardGenerator(
      gm.getResource(config.shardDarkness),
      config.genShardDarkness,
    ),
    new ShardGenerator(gm.getResource(config.shardLight), config.genShardLight),
  ];
}

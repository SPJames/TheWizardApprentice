import { GameManager } from './gameManager';
import {
  initResources,
  initGenerators,
  initShardGenerators,
  config,
} from './init';

const gm = new GameManager();
let lastFrameTimeMs: number = 0;
let maxFPS: number = 5;
let delta: number = 0;

// Initialize the game
function init(): void {
  gm.addResouces(initResources());
  gm.addGenerators(initGenerators(gm));
  gm.addShardGenerators(initShardGenerators(gm));

  for (let gen of gm.generators) {
    gen.HTML.on('buy', 'click', () => gm.buyGenerator(gen.name, 1));
  }

  // Start things off; keep at bottom of init function!
  requestAnimationFrame(mainLoop);
}

// The rerendering per frame
function draw(delta: number): void {
  document.querySelector('#mana').innerHTML = `${gm
    .getResource(config.primaryResource)
    .amount.toFixed(2)}`;

  for (let generator of gm.generators) {
    generator.render();
  }
}

// The primary game
function update(delta: number): void {
  gm.generate(delta);
  gm.tickShardGenerators(delta);
}

// The loop, should not be editted
function mainLoop(timestamp: number): void {
  // Throttle the framerate
  if (timestamp < lastFrameTimeMs + 1000 / maxFPS) {
    requestAnimationFrame(mainLoop);
    return;
  }
  // Calculate the time between frames
  delta = (timestamp - lastFrameTimeMs) / 1000;
  lastFrameTimeMs = timestamp;
  // Run the update and draw
  update(delta);
  draw(delta);

  // Next frame
  requestAnimationFrame(mainLoop);
}

// Initialize the objects
init();
// Initialize the screen
draw(0);

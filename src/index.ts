import { GameManager } from './gameManager';
import {
  initResources,
  initGenerators,
  initShardGenerators,
  config,
} from './init';

const gm = new GameManager();
let lastFrameTimeMs = 0,
  maxFPS = 5,
  delta = 0;

function init() {
  gm.addResouces(initResources());
  gm.addGenerators(initGenerators(gm));
  gm.addShardGenerators(initShardGenerators(gm));

  for (let generator of gm.generators) {
    document.querySelector('.generators').appendChild(generator.initDraw());
    document
      .querySelector(`[data-action='${generator.renderId}-buy']`)
      .addEventListener('click', () => gm.buyGenerator(generator.name, 1));
  }
  // Start things off; keep at bottom of init function!
  requestAnimationFrame(mainLoop);
}

function draw(delta) {
  document.querySelector('#mana').innerHTML = `${gm
    .getResource(config.primaryResource)
    .amount.toFixed(2)}`;

  for (let generator of gm.generators) {
    generator.render();
  }
}

// The primary game
function update(delta) {
  gm.generate(delta);
  gm.tickShardGenerators(delta);
}

// The loop, should not be editted
function mainLoop(timestamp) {
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

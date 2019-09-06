import { GameManager } from "./gameManager";
import { initResources, initGenerators, initShardGenerators } from "./init";

const gm = new GameManager();
let lastFrameTimeMs = 0,
  maxFPS = 10,
  delta = 0;

function init() {
  gm.addResouces(initResources());
  gm.addGenerators(initGenerators(gm));
  gm.addShardGenerators(initShardGenerators(gm));

  // TODO: Test code remove!!
  document.querySelector("#collect").addEventListener("click", collect);

  // Start things off; keep at bottom of init function!
  requestAnimationFrame(mainLoop);
}

// TODO: Test code remove!!
function collect() {
  console.log("collect");
  const sg = gm.getShardGenerator("Fire Generator");
  if (sg.collect()) {
    const res = gm.getResource(sg.generates.name);
    res.add(sg.genAmount);
  }
}

function draw(delta) {
  // TODO: Test code remove!!
  document.querySelector("#mana").innerHTML = `${gm
    .getResource("Mana")
    .amount.toFixed(2)}`;

  // TODO: Test code remove!!
  document.querySelector(
    "#firePercent"
  ).innerHTML = `${gm.shardGenerators[0].getPercent()}`;
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

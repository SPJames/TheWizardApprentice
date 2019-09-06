import { GameManager } from "./gameManager";
import { ManaResource } from "./manaResource";
import { EnchantedBook } from "./enchantedBook";

const gm = new GameManager();
let lastFrameTimeMs = 0,
  maxFPS = 10;

function init() {
  const mana = new ManaResource(10);
  gm.addResouce(mana);

  const enchantedBook = new EnchantedBook(0.1, 10, mana);
  gm.addGenerator(enchantedBook);

  // Start things off
  requestAnimationFrame(mainLoop);
}

function draw(delta) {
  // TODO: Test code remove!!
  document.querySelector("#mana").innerHTML = `${gm.resources[0].amount.toFixed(
    2
  )}`;
}

// The primary game
function update(delta) {
  gm.generate(delta);
}

// The loop, should not be editted
function mainLoop(timestamp) {
  // Throttle the framerate
  if (timestamp < lastFrameTimeMs + 1000 / maxFPS) {
    requestAnimationFrame(mainLoop);
    return;
  }
  // Calculate the time between frames
  const delta = (timestamp - lastFrameTimeMs) / 1000;
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

// TODO: Test code remove!!
setTimeout(() => {
  if (!gm.buyGenerator("Enchanted Book")) {
    console.error("oh no");
  }
}, 1000);

const TIMEOUT = 5000;

let clickrClicks = 0;

const display = document.querySelector('#display');
const button = document.querySelector('#clicker_button');
const counterClickr = document.querySelector('#clickr_counter');

button.onclick = start;
// start()
function formatTime(ms) {
  return Number.parseFloat(ms / 1000).toFixed(2);
}

function start() {
  const startTime = Date.now();
  const clickrFlag = true;
  clickrFlag ? counterClickr.textContent = 0 : clickrFlag = false;
  clickrClicks++;
  display.textContent = formatTime(TIMEOUT);
  button.onclick = () => counterClickr.textContent = clickrClicks++;

  const interval = setInterval(() => {
    const delta = Date.now() - startTime;
    display.textContent = formatTime(TIMEOUT - delta);
  }, 100);

  const timeout = setTimeout(() => {
    button.onclick = null;
    setTimeout(() => {
      button.onclick = start;
    }, 500);
    display.textContent = 'Game Over';
    clearInterval(interval);
    clearTimeout(timeout);
    // start()
    clickrClicks=0;
  }, TIMEOUT);
}
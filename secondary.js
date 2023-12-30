//Кнопка с пузырьками
let animateButton = function(e) {

  e.preventDefault;
  //reset animation
  e.target.classList.remove('animate');
  
  e.target.classList.add('animate');
  setTimeout(function(){
    e.target.classList.remove('animate');
  },700);
};

let bubblyButtons = document.getElementsByClassName("bubbly-button");

for (let i = 0; i < bubblyButtons.length; i++) {
  bubblyButtons[i].addEventListener('click', animateButton, false);
}

//Пчелка
let windowHeight = window.innerHeight;
const adjust = () => {
  windowHeight = window.innerHeight;
  if (windowHeight < 800) {
    document.documentElement.style.setProperty("--bee-scale", 0.35);
    document.documentElement.style.setProperty("--cube-scale", 0.35);
  } else {
    document.documentElement.style.setProperty("--bee-scale", 0.5);
    document.documentElement.style.setProperty("--cube-scale", 0.5);
  }
};
window.addEventListener("resize", adjust);
adjust();

//fadeOutAudio
function fadeOutAudio(audioToFade) {
  let volume = 1.0;
  let fadeOutInterval = setInterval(function() {
    if (volume > 0.05) {
      volume -= 0.05;
      audioToFade.volume = volume;
    } else {
      // Когда затухание достигает определенного уровня (в данном случае 0.1), останавливаем интервал
      clearInterval(fadeOutInterval);
      // Останавливаем воспроизведение
      audioToFade.pause();
      // Сбрасываем громкость
      audioToFade.volume = 1.0;
    }
  }, 200); // Интервал затухания (в данном случае 200 миллисекунд)
}

//Clickr
const TIMEOUT = 5000;

let clickrClicks = 0;

const display = document.querySelector('#display');
const clickrButton = document.querySelector('#clicker_button');
const counterClickr = document.querySelector('#clickr_counter');

clickrButton.onclick = start;
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
  clickrButton.onclick = () => counterClickr.textContent = clickrClicks++;

  const interval = setInterval(() => {
    const delta = Date.now() - startTime;
    display.textContent = formatTime(TIMEOUT - delta);
  }, 100);

  const timeout = setTimeout(() => {
    clickrButton.onclick = null;
    setTimeout(() => {
      clickrButton.onclick = start;
    }, 500);
    display.textContent = 'Game Over';
    clearInterval(interval);
    clearTimeout(timeout);
    // start()
    clickrClicks=0;
  }, TIMEOUT);
}
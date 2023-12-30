let musicSrc = 'audio/gachimuchi_will_be_fine.mp3';
// const musicTitle = '<h1>Antonio Vivaldi</h1><span>[ Four Seasons ]</span><h2>Summer<h2>'

// Controls
const colBg   = 'rgba(0, 0, 0, 0.15)';
const colBar0 = 'rgba(255, 255, 255, 0.04)';
const colBar1 = 'rgba(255, 255, 255, 0.5)';
const colBar2 = 'rgba(255, 120, 20, 0.8)';

const fftSz      = 1024;
const barWidth   = 2;
const barLength  = 0.25;
const bassFactor = 1.2;

// const exitFromMusic = document.querySelector('#exit_from_music');

let canvasCtx, audioCtx, audioModal, stream, analyser, buf, bufLength;
let initialised = false, playing = false;

function render() {
  if (onceUsedFlag5) return;
  requestAnimationFrame(render);
  visCircle();
}

function init() {
  if (onceUsedFlag5) return;
  audioCtx  = new AudioContext();
  canvasCtx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  // Create and load audio
  audioModal = document.createElement('audio');
  audioModal.src = musicSrc;
  // audioModal.loop = true;
  audioModal.crossOrigin = "anonymous";

  // Create stream and analyser
  stream = audioCtx.createMediaElementSource(audioModal);
  analyser = audioCtx.createAnalyser(); // Analyser
  analyser.fftSize = fftSz;
  bufLength = analyser.frequencyBinCount;
  buf = new Uint8Array(bufLength); // Buffer

  // Connections
  stream.connect(analyser);
  analyser.connect(audioCtx.destination);
}


window.onload = function() {
  // title.innerHTML = musicTitle;
  if (onceUsedFlag5) return;

  play.addEventListener('click', playMusicModal);

  
  
  window.onresize = function() {
    if (onceUsedFlag5) return;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  };
};
function playMusicModal () {
  play.style.color = '#eeeeee';
  if (!initialised) {  
    init();
    initialised = true;
    render(); // Animation loop
  }
  if (!playing) {
    audioModal.play();
    //включить с определенного момента
    // audioModal.currentTime=51;
    play.innerHTML = 'Pause';
    audioModal.onended = function() {
      modal2.style.opacity = 0;
      modal2.addEventListener('transitionend', () => {
        onceUsedFlag5 = true;
        modal2.remove();
        // document.querySelector('#audio_modal_script').remove();
        falseHappyEnd();
      });
    };
  } else {
    audioModal.pause();
    play.innerHTML = 'Play';
  }
  playing = !playing;
};
// Visualisation technique

function visCircle() {
  if (onceUsedFlag5) return;
  analyser.getByteFrequencyData(buf);
	let threshold = 0;
  let width  = window.innerWidth
  let height = window.innerHeight;
  let dtRot  = (360 / bufLength * 2) * Math.PI/180;
	let bass   = Math.floor(buf[1]);
	let radius = -(width*barLength + bass*bassFactor);

  canvasCtx.fillStyle = colBg;
	canvasCtx.fillRect(0, 0, canvas.width, canvas.height);  
	canvasCtx.save();
	canvasCtx.scale(0.5, 0.5);
	canvasCtx.translate(window.innerWidth, window.innerHeight);

  function draw(rad, wdt, mlt, rot) {
    if (onceUsedFlag5) return;
    for (let i = 0; i < bufLength; ++i) {	
      let smp = buf[i];
      if (smp >= threshold) {			
       canvasCtx.fillRect(0, rad, wdt, -smp*mlt);
       canvasCtx.rotate(rot);   
      }
	  }
  } 
	canvasCtx.fillStyle = colBar0;
  draw(radius, barWidth, 1.00,  dtRot);
  draw(radius, barWidth, 1.00, -dtRot);
  canvasCtx.fillStyle = colBar1;
  draw(radius, barWidth, 0.50,  dtRot);
  draw(radius, barWidth, 0.50, -dtRot);  
  canvasCtx.fillStyle = colBar2;
  draw(radius, barWidth, 0.05,  dtRot);
  draw(radius, barWidth, 0.05, -dtRot);  
	canvasCtx.restore();
}
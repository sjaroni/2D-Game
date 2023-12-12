let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  // startGame = document.getElementById('start_endscreen');
  // startGame.classList.add('d-none');

  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  //TODO - entfernen
  console.log('My Character is', world.character);
}

function stopGame() {
  for (let i = 0; i < 9999; i++) window.clearInterval(i);
}

window.addEventListener('keydown', (e) => {
  let key = e.code.toUpperCase();
  keyboard[key] = true;
  keyboard.setDirectionTrue(key);
});

window.addEventListener('keyup', (e) => {
  keyboard.setDirectionFalse();
});

function getIndexOf(x, y, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].x === x && array[i].y === y) {
      return i;
    }
  }
  return -1;
}

// Enable / Mute all sounds
// MUSIC_ON = false
//
function checkMusic(MUSIC_ON) {
  if (MUSIC_ON) {
    music_sound = new Audio('audio/music.mp3');
    music_sound.loop = true;
    this.music_sound.play();
  } else {
    this.music_sound.pause();
  }
}

function toggleSound() {
  SOUND_ON = !SOUND_ON;
}

// Touchbuttons
// live-call am 24.11 17:??

function fullscreen() {
  let fullscreen = document.getElementById('fullscreen');
  enterFullscreen(fullscreen);
}

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

// const texts = ['Start', 'Lets go', '¡Vamos!'];

document.addEventListener('DOMContentLoaded', function () {
  const texts = ['Start', 'Lets go', '¡Vamos!'];
  const speed = 150; // Geschwindigkeit in Millisekunden
  const fadeOutSpeed = 500; // Geschwindigkeit des Ausblendens in Millisekunden
  const typewriterText = document.getElementById('typewriter-text');
  const button = document.getElementById('btn');
  let textIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < texts[textIndex].length) {
      typewriterText.innerHTML += texts[textIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, speed);
    } else {
      setTimeout(fadeOut, 1000); // Warte 1 Sekunde und beginne mit dem Ausblenden
    }
  }

  function fadeOut() {
    let opacity = 1;
    const fadeOutInterval = setInterval(function () {
      button.style.opacity = 1;
      if (opacity > 0) {
        opacity -= 0.1;
        typewriterText.style.opacity = opacity;
      } else {
        clearInterval(fadeOutInterval);
        typewriterText.innerHTML = '';
        charIndex = 0;
        textIndex = (textIndex + 1) % texts.length;
        typewriterText.style.opacity = 1;
        setTimeout(type, 500);
      }
    }, fadeOutSpeed / 10);
  }
  type();
});

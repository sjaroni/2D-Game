let canvas;
let world;
let keyboard = new Keyboard();
let music_sound = new Audio('audio/music.mp3');

function gameStart() {
  document.getElementById('startBtn').classList.add('d-none');
  document.getElementById('start-endscreen').classList.add('d-none');
  // document.getElementById('playPauseBtn').classList.add('d-none');
  document.getElementById('helpBtn').classList.add('d-none');
  document.getElementById('panel').classList.remove('d-none');  

  ENDBOSS_REACHED = false;
  ENDBOSS_FIRST_CONTACT = false;
  ENDBOSS_IS_DEAD = false;
  GAME_IS_OVER = false;
  initLevel();
  init();
  checkMusic();
  bindTouchBtns();
}

function gameRestart() {
  document.getElementById('restartBtn').classList.add('d-none');
  document.getElementById('gameSettingsRight').classList.remove('d-none');
  gameStart();
}

function init() {
  canvas = document.getElementById('canvas');
  canvas.classList.remove('d-none');
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
});

window.addEventListener('keyup', (e) => {
  let key = e.code.toUpperCase();
  keyboard[key] = false;
});

function bindTouchBtns() {
  
  document.getElementById('leftBtn').addEventListener('touchstart', (e) =>{
    e.preventDefault();
    console.log('yo');
    keyboard['ARROWlEFT'] = true;
  });
  
  document.getElementById('leftBtn').addEventListener('touchend', (e) =>{
    e.preventDefault();
    keyboard['ARROWlEFT'] = false;
  });
}

function getIndexOf(x, y, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].x === x && array[i].y === y) {
      return i;
    }
  }
  return -1;
}

function checkMusic() {
  if (MUSIC_ON) {
    music_sound.loop = true;
    music_sound.volume = 0.1;
    music_sound.play();
  } else {
    music_sound.pause();
  }
}

function toggleMusic() {
  MUSIC_ON = !MUSIC_ON;
  let musicBtn = document.getElementById("musicBtn");
  let musicImg = musicBtn.getElementsByTagName("img")[0];

  if (!MUSIC_ON) {
    musicImg.src = "img/menu/music_off.png";    
  } else {
    musicImg.src = "img/menu/music_on.png";
  }
  checkMusic();
  musicBtn.blur();
}

function toggleSound() {
  SOUND_ON = !SOUND_ON;  
  let soundBtn = document.getElementById("soundBtn");
  let soundImg = soundBtn.getElementsByTagName("img")[0];

  if (!SOUND_ON) {
    soundImg.src = "img/menu/sound_off.png";    
  } else {
    soundImg.src = "img/menu/sound_on.png";
  }
  soundBtn.blur();
}

// Touchbuttons
// live-call am 24.11 17:??

function fullscreen() {
  let fullscreen = document.getElementById('fullscreen');
  let fullscreenBtn = document.getElementById("fullscreenBtn");  
  fullscreenBtn.blur();

  FULLSCREEN = !FULLSCREEN;
  if(FULLSCREEN){
    enterFullscreen(fullscreen);
    fullscreen.style.background = "url('img/desert.png') no-repeat";
  } else {
    exitFullscreen();
    fullscreen.style.background = "none";    
  }  
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

document.addEventListener("fullscreenchange", function () {
  if (!document.fullscreenElement) {
    let fullscreen = document.getElementById('fullscreen');
    fullscreen.style.background = "none";
    FULLSCREEN = false;
  }
});

function exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();    
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }  
}

document.addEventListener('DOMContentLoaded', function () {  
  const texts = ['Start', 'Let`s go!', '¡Vamos!'];
  const speed = 150;
  const fadeOutSpeed = 500;
  const typewriterText = document.getElementById('typewriter-text');
  const button = document.getElementById('startBtn');
  let textIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < texts[textIndex].length) {
      typewriterText.innerHTML += texts[textIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, speed);
    } else {
      setTimeout(fadeOut, 1000);
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

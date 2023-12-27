let canvas;
let world;
let keyboard = new Keyboard();
let onlyChickenSmall;

function loadGame() {
  document.getElementById('startBtn').classList.add('d-none');
  document.getElementById('start-endscreen').classList.add('d-none');
  document.getElementById('content').classList.add('whiteBorder');
  document.getElementById('help').classList.add('d-none');
  document.getElementById('loadGame').classList.remove('d-none');
  document.getElementById('canvas').classList.add('d-none');
  document.getElementById('canvas').classList.remove('blur');
  switchFirstStart();
  setTimeout(() => {
    document.getElementById('loadGame').classList.add('d-none');
    document.getElementById('panel').classList.remove('d-none');
    document.getElementById('content').classList.remove('whiteBorder');
    gameStart();
  }, 2500);
}

function gameStart() {
  ENDBOSS_REACHED = false;
  ENDBOSS_FIRST_CONTACT = false;
  ENDBOSS_IS_DEAD = false;
  GAME_IS_STARTED = true;
  GAME_IS_OVER = false;
  initLevel();
  init();
}

function gameRestart() {
  document.getElementById('restartBtn').classList.add('d-none');
  document.getElementById('loadGame').classList.add('d-none');
  document.getElementById('gameSettings').classList.remove('d-none');
  loadGame();
}

function help() {
  switchFirstStart();  

  GAME_IS_PAUSED = !GAME_IS_PAUSED;
  if (GAME_IS_PAUSED) {
    document.getElementById('startBtn').classList.add('d-none');
    toggleElements();
    stopGame();
    startSlider();
  } else {
    document.getElementById('startBtn').classList.remove('d-none');
    stopGame();
    continueGame();
    toggleElements();
  }
}

function continueGame() {
  if (!GAME_IS_STARTED) {
    document.getElementById('startBtn').classList.remove('d-none');
    type();
  } else {
    continueActiveGame();
  }
}

/**
 * Continue active Game
 */
function continueActiveGame() {
  document.getElementById('startBtn').classList.add('d-none');
  document.getElementById('helpBtn').blur();
  document.getElementById('panel').classList.remove('d-none');
  document.getElementById('canvas').classList.remove('blur');

  world.run();
  animateObjects(world.character);
  startGravityObject(world.character);
  animateArray(world.bottles);
  animateArray(world.coins);
  animateArray(world.level.clouds);
  animateArray(world.level.enemies);
  onlyChickenSmall = world.level.enemies.filter(
    (item) => item instanceof ChickenSmall,
  );
  startGravityArray(onlyChickenSmall);
  world.bottleText.hideInfo();
}

function animateObjects(object) {
  object.animate();
}

function startGravityObject(object) {
  object.applyGravity();
}

function animateArray(array) {
  array.forEach((object) => {
    animateObjects(object);
  });
}

function startGravityArray(array) {
  array.forEach((object) => {
    startGravityObject(object);
  });
}

function toggleElements() {
  document.getElementById('musicBtn').classList.toggle('d-none');
  document.getElementById('soundBtn').classList.toggle('d-none');
  document.getElementById('fullscreenBtn').classList.toggle('d-none');
  document.getElementById('canvas').classList.remove('blur');
  document.getElementById('help').classList.toggle('d-none');
  document.getElementById('start-endscreen').classList.toggle('blur');
}

function init() {
  canvas = document.getElementById('canvas');
  canvas.classList.remove('d-none');
  world = new World(canvas, keyboard);
  world.keyboard.bindTouchBtns();
  //TODO - entfernen
  console.log('My Character is', world.character);
}

function stopGame() {
  for (let i = 0; i < 9999; i++) window.clearInterval(i);
  document.getElementById('panel').classList.add('d-none');
  document.getElementById('canvas').classList.add('blur');
}

window.addEventListener('keydown', (e) => {
  let key = e.code.toUpperCase();
  keyboard[key] = true;
});

window.addEventListener('keyup', (e) => {
  let key = e.code.toUpperCase();
  keyboard[key] = false;
});

function getIndexOf(x, y, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].x === x && array[i].y === y) {
      return i;
    }
  }
  return -1;
}

function checkMusic() {
  let musicBtn = document.getElementById('musicBtn');
  let musicImg = musicBtn.getElementsByTagName('img')[0];

  if (!MUSIC_ON) {
    musicImg.src = 'img/menu/music_off.png';
    MUSIC_SOUND.pause();
  } else {
    musicImg.src = 'img/menu/music_on.png';
    MUSIC_SOUND.loop = true;
    MUSIC_SOUND.volume = 0.1;
    MUSIC_SOUND.play();
  }
  musicBtn.blur();
}

function toggleMusic() {
  MUSIC_ON = !MUSIC_ON;
  storeValue('MUSIC_ON', MUSIC_ON);
  checkMusic();
}

function toggleSound() {
  SOUND_ON = !SOUND_ON;
  storeValue('SOUND_ON', SOUND_ON);
  checkSound();
}

function checkSound() {
  let soundBtn = document.getElementById('soundBtn');
  let soundImg = soundBtn.getElementsByTagName('img')[0];

  if (!SOUND_ON) {
    soundImg.src = 'img/menu/sound_off.png';
  } else {
    soundImg.src = 'img/menu/sound_on.png';
  }
  soundBtn.blur();
}

function fullscreen() {
  let fullscreen = document.getElementById('fullscreen');
  let fullscreenBtn = document.getElementById('fullscreenBtn');
  fullscreenBtn.blur();

  FULLSCREEN = !FULLSCREEN;
  if (FULLSCREEN) {
    enterFullscreen(fullscreen);
    fullscreen.style.background = "url('img/desert.png') no-repeat";
  } else {
    exitFullscreen();
    fullscreen.style.background = 'none';
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

document.addEventListener('fullscreenchange', function () {
  if (!document.fullscreenElement) {
    let fullscreen = document.getElementById('fullscreen');
    fullscreen.style.background = 'none';
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
  GAME_FIRST_START = getName('GAME_FIRST_START');
  if (GAME_FIRST_START || GAME_FIRST_START === null) {
    storeValue('GAME_FIRST_START', GAME_FIRST_START);
    document.getElementById('helpBtn').classList.add('alarm2');
  }

  SOUND_ON = getName('SOUND_ON');
  if (SOUND_ON === null) {
    SOUND_ON = true;
  }
  checkSound();

  MUSIC_ON = getName('MUSIC_ON');
  if (MUSIC_ON === null) {
    MUSIC_ON = true;
  }
  checkMusic();
  type();
});

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

function getName(key) {
  return JSON.parse(localStorage.getItem(key));
}

function storeValue(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function switchFirstStart() {
  GAME_FIRST_START = false;
  storeValue('GAME_FIRST_START', GAME_FIRST_START);
  document.getElementById('helpBtn').classList.remove('alarm2');
}

function startSlider() {  
  setTimeout(() => {
    document.getElementById('story').classList.add('d-none');
    document.getElementById('manual').classList.remove('d-none');
    document.getElementById('help1').classList.remove('underline');
    document.getElementById('help2').classList.add('underline');
  }, 6000);

  setTimeout(() => {
    document.getElementById('story').classList.remove('d-none');
    document.getElementById('manual').classList.add('d-none');
    document.getElementById('help1').classList.add('underline');
    document.getElementById('help2').classList.remove('underline');
    startSlider();
  }, 12000);
}

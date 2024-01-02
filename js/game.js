let canvas;
let world;
let keyboard = new Keyboard();
let onlyChickenSmall;
const texts = ['Start!', 'Let`s go!', '¡Vamos!'];
const speed = 150;
const fadeOutSpeed = 500;
const typewriterText = document.getElementById('typewriter-text');
const button = document.getElementById('startBtn');
let textIndex = 0;
let charIndex = 0;

/**
 * Start game
 */
function loadGame() {
  hideMenuItems();
  switchFirstStart();
  setTimeout(() => {
    document.getElementById('loadGame').classList.add('d-none');
    document.getElementById('panel').classList.remove('d-none');
    document.getElementById('content').classList.remove('whiteBorder');
    gameStart();
  }, 2500);
}

/**
 * Hide Menu-Buttons and add blur-effect on background
 */
function hideMenuItems() {
  document.getElementById('startBtn').classList.add('d-none');
  document.getElementById('start-endscreen').classList.add('d-none');
  document.getElementById('content').classList.add('whiteBorder');
  document.getElementById('help').classList.add('d-none');
  document.getElementById('loadGame').classList.remove('d-none');
  document.getElementById('canvas').classList.add('d-none');
  document.getElementById('canvas').classList.remove('blur');
}

/**
 * Reset Values and start game
 */
function gameStart() {
  ENDBOSS_REACHED = false;
  ENDBOSS_FIRST_CONTACT = false;
  ENDBOSS_IS_DEAD = false;
  GAME_IS_STARTED = true;
  GAME_IS_OVER = false;
  checkMusic();
  initLevel();
  init();
}

/**
 * Restart Game
 */
function gameRestart() {
  location.reload();
}

/**
 * Help-Menu
 */
function help() {
  switchFirstStart();
  toggleElements();
  stopGame();
  GAME_IS_PAUSED = !GAME_IS_PAUSED;
  if (GAME_IS_PAUSED) {
    document.getElementById('startBtn').classList.add('d-none');
  } else {
    document.getElementById('startBtn').classList.remove('d-none');
    continueGame();
  }
}

/**
 * Continue game
 */
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
  setMenuOfActiveGame();
  world.run();
  onlyChickenSmall = world.level.enemies.filter(
    (item) => item instanceof ChickenSmall,
  );
  animateAll(onlyChickenSmall);
  world.bottleText.hideInfo();
}

/**
 * Show/Hide Menu-Buttons
 */
function setMenuOfActiveGame() {
  document.getElementById('startBtn').classList.add('d-none');
  document.getElementById('helpBtn').blur();
  document.getElementById('panel').classList.remove('d-none');
  document.getElementById('canvas').classList.remove('blur');
}

/**
 * Restart animate and gravity on all objects
 * @param {array} onlyChickenSmall - All small chicken that jumps
 */
function animateAll(onlyChickenSmall) {
  animateObjects(world.character);
  startGravityObject(world.character);
  animateArray(world.bottles);
  animateArray(world.coins);
  animateArray(world.level.clouds);
  animateArray(world.level.enemies);
  startGravityArray(onlyChickenSmall);
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

/**
 * Toggle view on elements
 */
function toggleElements() {
  document.getElementById('musicBtn').classList.toggle('d-none');
  document.getElementById('soundBtn').classList.toggle('d-none');
  document.getElementById('fullscreenBtn').classList.toggle('d-none');
  document.getElementById('canvas').classList.remove('blur');
  document.getElementById('help').classList.toggle('d-none');
  document.getElementById('start-endscreen').classList.toggle('blur');
}

/**
 * Initialize world
 */
function init() {
  canvas = document.getElementById('canvas');
  canvas.classList.remove('d-none');
  world = new World(canvas, keyboard);
  world.keyboard.bindTouchBtns();
}

/**
 * Stop all interval and timeout-functions
 */
function stopGame() {
  for (let i = 0; i < 9999; i++) window.clearInterval(i);
  document.getElementById('panel').classList.add('d-none');
  document.getElementById('canvas').classList.add('blur');
}

/**
 * Waiting for Event and set variable
 */
window.addEventListener('keydown', (e) => {
  let key = e.code.toUpperCase();
  keyboard[key] = true;
});

/**
 * Waiting for Event and set variable
 */
window.addEventListener('keyup', (e) => {
  let key = e.code.toUpperCase();
  keyboard[key] = false;
});

/**
 * Get index of element in array
 * @param {number} x - coordinate
 * @param {number} y - coordinate
 * @param {array} array - array to search something
 * @returns
 */
function getIndexOf(x, y, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].x === x && array[i].y === y) {
      return i;
    }
  }
  return -1;
}

/**
 * Check if music is enabled/disabled
 */
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
    //
    if(GAME_IS_STARTED){
      MUSIC_SOUND.play();
    }
  }
  musicBtn.blur();
}

/**
 * Toggle music state
 */
function toggleMusic() {
  MUSIC_ON = !MUSIC_ON;
  storeValue('MUSIC_ON', MUSIC_ON);
  checkMusic();
}

/**
 * Toggle sound state
 */
function toggleSound() {
  SOUND_ON = !SOUND_ON;
  storeValue('SOUND_ON', SOUND_ON);
  checkSound();
}

/**
 * Check if sound is enabled/disabled
 */
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

/**
 * Check if fullscreen is enabled/disabled
 */
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

/**
 * Go into fullscreen
 * @param {string} element - element-id
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

/**
 * Check change on fullscreen
 */
document.addEventListener('fullscreenchange', function () {
  if (!document.fullscreenElement) {
    let fullscreen = document.getElementById('fullscreen');
    fullscreen.style.background = 'none';
    FULLSCREEN = false;
  }
});

/**
 * Exit fullscreen
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

/**
 * Check if all code is loaded
 */
document.addEventListener('DOMContentLoaded', function () {
  GAME_FIRST_START = getName('GAME_FIRST_START');
  if (isThisFirstStart()) {
    setFirstStart();
  }
  setSound();
  setMusic();
  type();
});

/**
 * Check if it´s the first start of the game
 * @returns true/false
 */
function isThisFirstStart() {
  return GAME_FIRST_START || GAME_FIRST_START === null;
}

/**
 * Store that this is the first start
 */
function setFirstStart() {
  storeValue('GAME_FIRST_START', GAME_FIRST_START);
  storeValue('MUSIC_ON', false);
  storeValue('SOUND_ON', false);
  document.getElementById('helpBtn').classList.add('alarm2');
}

/**
 * Set Sound from localstorage
 */
function setSound() {
  SOUND_ON = getName('SOUND_ON');
  if (SOUND_ON === null) {
    SOUND_ON = true;
  }
  checkSound();
}

/**
 * Set Music from localstorage
 */
function setMusic() {
  MUSIC_ON = getName('MUSIC_ON');
  if (MUSIC_ON === null) {
    MUSIC_ON = true;
  }
  checkMusic();
}

/**
 * Typewriter animation on startscreen
 */
function type() {
  if (charIndex < texts[textIndex].length) {
    typewriterText.innerHTML += texts[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, speed);
  } else {
    setTimeout(fadeOut, 1000);
  }
}

/**
 * Fadeout animation on startscreen
 */
function fadeOut() {
  let opacity = 1;
  const fadeOutInterval = setInterval(function () {
    button.style.opacity = 1;
    if (opacity > 0) {
      opacity -= 0.1;
      typewriterText.style.opacity = opacity;
    } else {
      opacityIsNull(fadeOutInterval);
    }
  }, fadeOutSpeed / 10);
}

/**
 * Used to change typewriter effect on startscreen
 * @param {number} fadeOutInterval
 */
function opacityIsNull(fadeOutInterval) {
  clearInterval(fadeOutInterval);
  typewriterText.innerHTML = '';
  charIndex = 0;
  textIndex = (textIndex + 1) % texts.length;
  typewriterText.style.opacity = 1;
  setTimeout(type, 500);
}

/**
 * Gets values from localstorage
 * @param {string} key - key on localstorage
 * @returns json
 */
function getName(key) {
  return JSON.parse(localStorage.getItem(key));
}

/**
 * Sets values on localstorage
 * @param {string} key - key on localstorage
 * @param {string} value - value on localstorage
 */
function storeValue(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Stop animation after first start of the game
 */
function switchFirstStart() {
  GAME_FIRST_START = false;
  storeValue('GAME_FIRST_START', GAME_FIRST_START);
  document.getElementById('helpBtn').classList.remove('alarm2');
}

/**
 * Show story or manual on help-menu
 */
function showStory() {
  document.getElementById('story').classList.remove('d-none');
  document.getElementById('manual').classList.add('d-none');
  document.getElementById('help1').classList.add('underline');
  document.getElementById('help2').classList.remove('underline');
}

function showManual() {
  document.getElementById('story').classList.add('d-none');
  document.getElementById('manual').classList.remove('d-none');
  document.getElementById('help1').classList.remove('underline');
  document.getElementById('help2').classList.add('underline');
}

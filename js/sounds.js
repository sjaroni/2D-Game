const MUSIC_SOUND = new Audio('audio/music.mp3');

const WALKING_SOUND = new Audio('audio/running.mp3');
const JUMP_SOUND = new Audio('audio/jump.mp3');
const COLLECT_SOUND = new Audio('audio/collect.mp3');
const THROW_SOUND = new Audio('audio/throw.mp3');
const HURT_SOUND = new Audio('audio/hurt.mp3');
const DEAD_SOUND = new Audio('audio/dead.mp3');
const GLASS_SOUND = new Audio('audio/glass.mp3');

const CHICKEN_SMALL_SOUND = new Audio('audio/chicken_small.mp3');
const CHICKEN_SOUND = new Audio('audio/chicken.mp3');
const ENDBOSS_SOUND = new Audio('audio/endboss.mp3');
const ALARM_SOUND = new Audio('audio/alarm.mp3');

const WIN_SOUND = new Audio('audio/win.mp3');
const LOST_SOUND = new Audio('audio/lost.mp3');

function playSound(sound) {
  if (SOUND_ON) {
    sound.play();
  }
}

function pauseSound(sound) {
  if (SOUND_ON) {
    sound.pause();
  }
}

function loopSound(sound) {
  if (SOUND_ON) {
    sound.loop = true;
  }
}

function volumeSound(sound) {
  if (SOUND_ON) {
    sound.volume = 0.1;
  }
}

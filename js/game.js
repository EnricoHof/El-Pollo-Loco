let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let soundManager = new SoundManager();

let sounds = {
  jump: soundManager.register(new Audio("audio/jump.mp3")),
  glass: soundManager.register(new Audio("audio/glass.mp3")),
  pop: soundManager.register(new Audio("audio/pop.mp3")),
  coin: soundManager.register(new Audio("audio/coin.mp3")),
  bottle: soundManager.register(new Audio("audio/bottle.mp3")),
  hurt: soundManager.register(new Audio("audio/hurt.mp3")),
  background: soundManager.register(new Audio("audio/background.mp3")),
};

function init() {
  canvas = document.getElementById("gameCanvas");
  sounds.background.loop = true;
  sounds.background.volume = 0.2;
  sounds.jump.volume = 0.15;
  sounds.glass.volume = 0.15;
  sounds.pop.volume = 0.4;
  sounds.coin.volume = 0.3;
  sounds.bottle.volume = 0.3;
  sounds.hurt.volume = 0.4;
  updateMuteButton();
}

function toggleMute() {
  soundManager.toggleMute();
  updateMuteButton();
}

function updateMuteButton() {
  document.getElementById("muteBtn").textContent = soundManager.muted
    ? "🔇"
    : "🔊";
}

function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
  return id;
}

function stopGame() {
  intervalIds.forEach((id) => clearInterval(id));
  intervalIds = [];
  sounds.background.pause();
}

function startGame() {
  stopGame();
  document.getElementById("startScreen").classList.add("d-none");
  document.getElementById("endScreen").classList.add("d-none");
  world = new World(canvas);
  sounds.background.currentTime = 0;
  sounds.background.play();
}

function showEndScreen(won) {
  let endImg = document.getElementById("endImg");
  endImg.src = won
    ? "img/You won, you lost/You won A.png"
    : "img/You won, you lost/You lost.png";
  document.getElementById("endScreen").classList.remove("d-none");
}

function backToStart() {
  stopGame();
  document.getElementById("endScreen").classList.add("d-none");
  document.getElementById("startScreen").classList.remove("d-none");
}

window.addEventListener("keydown", (event) => {
  if (event.keyCode === 39) keyboard.RIGHT = true;
  if (event.keyCode === 37) keyboard.LEFT = true;
  if (event.keyCode === 38) keyboard.UP = true;
  if (event.keyCode === 40) keyboard.DOWN = true;
  if (event.keyCode === 32) keyboard.SPACE = true;
  if (event.keyCode === 68) keyboard.D = true;
});

window.addEventListener("keyup", (event) => {
  if (event.keyCode === 39) keyboard.RIGHT = false;
  if (event.keyCode === 37) keyboard.LEFT = false;
  if (event.keyCode === 38) keyboard.UP = false;
  if (event.keyCode === 40) keyboard.DOWN = false;
  if (event.keyCode === 32) keyboard.SPACE = false;
  if (event.keyCode === 68) keyboard.D = false;
});

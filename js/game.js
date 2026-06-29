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

/**
 * Initialisiert das Spiel beim Laden: Canvas, Sound-Lautstaerken,
 * Mute-Button und Touch-Steuerung.
 */
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
  bindTouchButtons();
}

/**
 * Verbindet alle Touch-Buttons mit den zugehoerigen Tasten.
 */
function bindTouchButtons() {
  bindTouchButton("btnLeft", "LEFT");
  bindTouchButton("btnRight", "RIGHT");
  bindTouchButton("btnJump", "SPACE");
  bindTouchButton("btnThrow", "D");
}

/**
 * Bindet einen Touch-Button an eine keyboard-Taste (touchstart/-end).
 * @param {string} buttonId - Die id des Button-Elements.
 * @param {string} keyName - Der Name der keyboard-Eigenschaft (z.B. "LEFT").
 */
function bindTouchButton(buttonId, keyName) {
  let button = document.getElementById(buttonId);
  // Kontextmenue (Touch-and-Hold) auf dem Button unterdruecken
  button.addEventListener("contextmenu", (event) => event.preventDefault());

  button.addEventListener("touchstart", (event) => {
    event.preventDefault();
    keyboard[keyName] = true;
  });
  button.addEventListener("touchend", (event) => {
    event.preventDefault();
    keyboard[keyName] = false;
  });
}

/**
 * Schaltet die Stummschaltung um und aktualisiert das Button-Icon.
 */
function toggleMute() {
  soundManager.toggleMute();
  updateMuteButton();
}

/**
 * Setzt das Icon des Mute-Buttons je nach Mute-Zustand.
 */
function updateMuteButton() {
  document.getElementById("muteBtn").textContent = soundManager.muted
    ? "🔇"
    : "🔊";
}

/**
 * Schaltet den Vollbildmodus des Spielfelds ein oder aus.
 */
function toggleFullscreen() {
  let container = document.getElementById("canvasContainer");
  if (!document.fullscreenElement) {
    container.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

/**
 * Startet ein Intervall und merkt sich seine ID zum spaeteren Stoppen.
 * @param {Function} fn - Die auszufuehrende Funktion.
 * @param {number} time - Intervalldauer in Millisekunden.
 * @returns {number} Die ID des Intervalls.
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIds.push(id);
  return id;
}

/**
 * Stoppt alle laufenden Spiel-Intervalle und pausiert die Musik.
 */
function stopGame() {
  intervalIds.forEach((id) => clearInterval(id));
  intervalIds = [];
  sounds.background.pause();
}

/**
 * Startet ein neues Spiel: blendet die Screens aus und erzeugt die Welt.
 */
function startGame() {
  stopGame();
  document.getElementById("startScreen").classList.add("d-none");
  document.getElementById("endScreen").classList.add("d-none");
  world = new World(canvas);
  sounds.background.currentTime = 0;
  sounds.background.play();
}

/**
 * Zeigt den Endscreen mit dem passenden Sieg- oder Niederlage-Bild.
 * @param {boolean} won - true zeigt das Sieg-, false das Niederlage-Bild.
 */
function showEndScreen(won) {
  let endImg = document.getElementById("endImg");
  endImg.src = won
    ? "img/You won, you lost/You won A.png"
    : "img/You won, you lost/You lost.png";
  document.getElementById("endScreen").classList.remove("d-none");
}

/**
 * Kehrt zum Startscreen zurueck und stoppt das laufende Spiel.
 */
function backToStart() {
  stopGame();
  document.getElementById("endScreen").classList.add("d-none");
  document.getElementById("startScreen").classList.remove("d-none");
}

/**
 * Zeigt das Overlay mit der Tastenbelegung an.
 */
function showKeys() {
  document.getElementById("keysScreen").classList.remove("d-none");
}

/**
 * Versteckt das Overlay mit der Tastenbelegung.
 */
function hideKeys() {
  document.getElementById("keysScreen").classList.add("d-none");
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

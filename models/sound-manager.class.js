class SoundManager {
  sounds = [];
  muted = false;

  /**
   * Initialisiert den Manager mit dem gespeicherten Mute-Zustand.
   */
  constructor() {
    this.muted = this.loadMuteState();
  }

  /**
   * Registriert einen Sound, damit der Mute-Zustand fuer ihn gilt.
   * @param {HTMLAudioElement} audio - Das zu verwaltende Audio-Objekt.
   * @returns {HTMLAudioElement} Das uebergebene Audio-Objekt.
   */
  register(audio) {
    audio.muted = this.muted;
    this.sounds.push(audio);
    return audio;
  }

  /**
   * Spielt einen Sound von vorne ab, sofern nicht stummgeschaltet.
   * @param {HTMLAudioElement} audio - Der abzuspielende Sound.
   */
  play(audio) {
    if (!this.muted) {
      audio.currentTime = 0;
      audio.play();
    }
  }

  /**
   * Schaltet Stummschaltung um, wendet sie auf alle Sounds an und speichert sie.
   * @returns {boolean} Der neue Mute-Zustand.
   */
  toggleMute() {
    this.muted = !this.muted;
    this.sounds.forEach((sound) => (sound.muted = this.muted));
    this.saveMuteState();
    return this.muted;
  }

  /**
   * Speichert den aktuellen Mute-Zustand im localStorage.
   */
  saveMuteState() {
    localStorage.setItem("muted", this.muted);
  }

  /**
   * Liest den gespeicherten Mute-Zustand aus dem localStorage.
   * @returns {boolean} true, wenn zuletzt stummgeschaltet war.
   */
  loadMuteState() {
    let saved = localStorage.getItem("muted");
    return saved === "true";
  }
}

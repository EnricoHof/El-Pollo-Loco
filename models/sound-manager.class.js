class SoundManager {
  sounds = [];
  muted = false;

  constructor() {
    this.muted = this.loadMuteState();
  }

  register(audio) {
    audio.muted = this.muted;
    this.sounds.push(audio);
    return audio;
  }

  play(audio) {
    if (!this.muted) {
      audio.currentTime = 0;
      audio.play();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    this.sounds.forEach((sound) => (sound.muted = this.muted));
    this.saveMuteState();
    return this.muted;
  }

  saveMuteState() {
    localStorage.setItem("muted", this.muted);
  }

  loadMuteState() {
    let saved = localStorage.getItem("muted");
    return saved === "true";
  }
}

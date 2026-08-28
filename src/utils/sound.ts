class SoundManager {
  private audioCtx: AudioContext | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private isMusicPlaying: boolean = false;
  private ambientInterval: number | null = null;
  private isMuted: boolean = false;

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.customAudio) {
      this.customAudio.muted = muted;
    }
    if (muted && this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
      this.isMusicPlaying = false;
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isMusicPlaying;
  }

  // Plays a pleasant bell or marimba tone via Web Audio
  public playTone(freq: number, type: OscillatorType = 'sine', duration = 0.3, volume = 0.15) {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio fallback ignored
    }
  }

  public playUnlockSound() {
    if (this.isMuted) return;
    // Ascending celebratory chord (C5, E5, G5, C6)
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, index) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.6, 0.2);
      }, index * 100);
    });
  }

  public playCorrectSound() {
    if (this.isMuted) return;
    this.playTone(587.33, 'triangle', 0.25, 0.2); // D5
    setTimeout(() => {
      this.playTone(880.00, 'sine', 0.4, 0.25); // A5
    }, 120);
  }

  public playWrongSound() {
    if (this.isMuted) return;
    this.playTone(330, 'sawtooth', 0.2, 0.08);
    setTimeout(() => {
      this.playTone(293.66, 'sawtooth', 0.3, 0.08);
    }, 150);
  }

  public playBoxOpen() {
    if (this.isMuted) return;
    // Playful pop and magical shimmer
    this.playTone(440, 'triangle', 0.1, 0.2);
    setTimeout(() => this.playTone(659.25, 'sine', 0.25, 0.2), 60);
    setTimeout(() => this.playTone(880, 'sine', 0.35, 0.25), 120);
    setTimeout(() => this.playTone(1318.51, 'sine', 0.5, 0.15), 180);
  }

  public playChime() {
    if (this.isMuted) return;
    this.playTone(783.99, 'sine', 0.4, 0.15); // G5
  }

  public playFanfare() {
    if (this.isMuted) return;
    const melody = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    melody.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.5, 0.22);
      }, idx * 120);
    });
  }

  public playEasterEggChime() {
    if (this.isMuted) return;
    const notes = [659.25, 880, 1174.66, 1567.98, 1760];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.4, 0.18);
      }, idx * 90);
    });
  }

  // Soft Indian / meditative festive acoustic loop fallback
  public startAmbientSynth() {
    if (this.ambientInterval || this.isMuted) return;
    
    // Raag-inspired acoustic scale (Sa Re Ga Pa Dha Sa: C, D, E, G, A, C)
    const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
    let noteIndex = 0;

    const playNextNote = () => {
      if (this.isMuted || !this.isMusicPlaying) return;
      const freq = scale[noteIndex % scale.length];
      // Soft gentle plucked sitar / harp like harmonic
      this.playTone(freq, 'triangle', 0.8, 0.04);
      if (Math.random() > 0.4) {
        setTimeout(() => {
          this.playTone(freq * 1.5, 'sine', 0.6, 0.02);
        }, 300);
      }
      noteIndex = (noteIndex + (Math.random() > 0.5 ? 1 : 2)) % scale.length;
    };

    playNextNote();
    this.ambientInterval = window.setInterval(playNextNote, 1800);
  }

  public stopAmbientSynth() {
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
  }

  public playMusic(audioSrc: string = 'audio/rakhi.mp3', volume: number = 0.35) {
    const ctx = this.getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    this.isMusicPlaying = true;

    // Try loading custom audio
    if (!this.customAudio) {
      this.customAudio = new Audio(audioSrc);
      this.customAudio.loop = true;
      this.customAudio.volume = volume;
    }

    const playPromise = this.customAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // If custom mp3 fails or doesn't exist, gracefully fall back to ambient synth
        this.startAmbientSynth();
      });
    }
    return playPromise;
  }

  public toggleMusic(audioSrc: string = 'audio/rakhi.mp3', volume: number = 0.35): boolean {
    if (this.isMusicPlaying) {
      if (this.customAudio) {
        this.customAudio.pause();
      }
      this.stopAmbientSynth();
      this.isMusicPlaying = false;
      return false;
    } else {
      this.playMusic(audioSrc, volume);
      return true;
    }
  }
}

export const soundManager = new SoundManager();

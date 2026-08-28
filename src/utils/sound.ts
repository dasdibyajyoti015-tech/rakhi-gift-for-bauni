class SoundManager {
  private audioCtx: AudioContext | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private isMusicPlaying: boolean = false;
  private ambientInterval: number | null = null;
  private isMuted: boolean = false;

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;

    if (!this.audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as {
          webkitAudioContext: typeof AudioContext;
        }).webkitAudioContext;

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

    if (muted) {
      this.stopAmbientSynth();

      if (this.customAudio) {
        this.customAudio.pause();
      }

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
  public playTone(
    freq: number,
    type: OscillatorType = 'sine',
    duration = 0.3,
    volume = 0.15
  ) {
    if (this.isMuted) return;

    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + duration
      );

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
    const notes = [523.25, 659.25, 783.99, 1046.5];

    notes.forEach((freq, index) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.6, 0.2);
      }, index * 100);
    });
  }

  public playCorrectSound() {
    if (this.isMuted) return;

    this.playTone(587.33, 'triangle', 0.25, 0.2);

    setTimeout(() => {
      this.playTone(880.0, 'sine', 0.4, 0.25);
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

    this.playTone(440, 'triangle', 0.1, 0.2);

    setTimeout(() => {
      this.playTone(659.25, 'sine', 0.25, 0.2);
    }, 60);

    setTimeout(() => {
      this.playTone(880, 'sine', 0.35, 0.25);
    }, 120);

    setTimeout(() => {
      this.playTone(1318.51, 'sine', 0.5, 0.15);
    }, 180);
  }

  public playChime() {
    if (this.isMuted) return;

    this.playTone(783.99, 'sine', 0.4, 0.15);
  }

  public playFanfare() {
    if (this.isMuted) return;

    const melody = [523.25, 659.25, 783.99, 1046.5, 1318.51];

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

  // ============================================================
  // DEFAULT AMBIENT SYNTH DISABLED
  // ============================================================
  // Your uploaded rakhi.mp3 is now the ONLY background music.
  public startAmbientSynth() {
    return;
  }

  public stopAmbientSynth() {
    if (this.ambientInterval) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
  }

  // ============================================================
  // CUSTOM RAKHI MUSIC
  // ============================================================
  public playMusic(
    audioSrc: string = 'audio/rakhi.mp3',
    volume: number = 0.35
  ) {
    if (this.isMuted) return;

    const ctx = this.getAudioContext();

    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    this.isMusicPlaying = true;

    // Create your uploaded Rakhi music
    if (!this.customAudio) {
      this.customAudio = new Audio(audioSrc);
      this.customAudio.loop = true;
      this.customAudio.volume = volume;
      this.customAudio.preload = 'auto';
    }

    // Make sure the audio is not muted
    this.customAudio.muted = false;

    const playPromise = this.customAudio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Make absolutely sure the default synth is stopped
          this.stopAmbientSynth();
          this.isMusicPlaying = true;
        })
        .catch(() => {
          // Browser may block autoplay.
          // Do NOT play any fallback/default music.
          this.isMusicPlaying = false;
        });
    }

    return playPromise;
  }

  public toggleMusic(
    audioSrc: string = 'audio/rakhi.mp3',
    volume: number = 0.35
  ): boolean {
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

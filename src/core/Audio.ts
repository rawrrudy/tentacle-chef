import background from "../assets/audio/background.mp3";
import money from "../assets/audio/money.wav";
import knife from "../assets/audio/knife.wav";
import sizzle from "../assets/audio/sizzle.wav";
import levelup from "../assets/audio/levelup.mp3";

export class AudioManager {

  static bgm = new Audio(background);
  static cash = new Audio(money);
  static chop = new Audio(knife);
  static cook = new Audio(sizzle);
  static win = new Audio(levelup);

  static init() {

    // Background Music

    this.bgm.loop = true;
    this.bgm.volume = 0.35;

    // Sound Effect Volumes

    this.cash.volume = 0.7;
    this.chop.volume = 0.55;
    this.cook.volume = 0.45;
    this.win.volume = 0.8;

    // Auto-stop Cash


    this.cash.addEventListener("timeupdate", () => {

      if (this.cash.currentTime > 0.40) {

        this.cash.pause();
        this.cash.currentTime = 0;

      }

    });

    // Auto-stop Chop

    this.chop.addEventListener("timeupdate", () => {

      if (this.chop.currentTime > 1.5) {

        this.chop.pause();
        this.chop.currentTime = 0;

      }

    });

    // Auto-stop Cook

    this.cook.addEventListener("timeupdate", () => {

      if (this.cook.currentTime > 0.60) {

        this.cook.pause();
        this.cook.currentTime = 0;

      }

    });

    // Auto-stop Win

    this.win.addEventListener("timeupdate", () => {

      if (this.win.currentTime > 1.20) {

        this.win.pause();
        this.win.currentTime = 0;

      }

    });

  }

  // Helper Functions

  static playCash() {

    this.cash.currentTime = 0;
    this.cash.play();

  }

  static playChop() {

    this.chop.currentTime = 0;
    this.chop.play();

  }

  static playCook() {

    this.cook.currentTime = 0;
    this.cook.play();

  }

  static playWin() {

    this.win.currentTime = 0;
    this.win.play();

  }

}
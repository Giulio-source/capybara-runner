import * as PIXI from "pixi.js";
import { Globals } from "./Globals";

export class Hero {
  constructor() {
    this.score = 0;
    this.dy = 0;
    this.jumpIndex = 0;
    this.platform = null;
    this.isHinto = false;

    this.sprite = new PIXI.AnimatedSprite([
      Globals.resources["c1"].texture,
      Globals.resources["c2"].texture,
      Globals.resources["c3"].texture,
      Globals.resources["c4"].texture,
      Globals.resources["c5"].texture,
      Globals.resources["c6"].texture,
      Globals.resources["c7"].texture,
      Globals.resources["c8"].texture,
    ]);

    this.filter = new PIXI.filters.ColorMatrixFilter();

    this.sprite.x = window.innerWidth / 2 - this.sprite.width;
    this.sprite.y = 100;
    this.sprite.loop = true;
    this.sprite.animationSpeed = 0.15;
    this.sprite.play();
  }

  collectDiamond(isHintoDiamond) {
    if (isHintoDiamond) {
      this.score += 100;
      Globals.resources.coin.sound.play({ volume: 0.1 });
    } else {
      this.score += 1;
      Globals.resources.crunch.sound.play({ volume: 0.1 });
    }
    this.sprite.emit("score");
  }

  startJump() {
    if (this.platform || this.jumpIndex === 1) {
      ++this.jumpIndex;
      this.platform = null;
      if (this.isHinto) {
        this.dy = -50;
        Globals.resources.scream.sound.play({
          volume: 0.1,
        });
      } else {
        this.dy = -25;
        Globals.resources.hop.sound.play({
          volume: 0.1,
        });
      }
    }
  }

  glow() {
    this.isHinto = true;
    this.sprite.filters = [this.filter];
    this.filter.brightness(3);
    this.filter.hue(850, true);
  }

  normal() {
    this.isHinto = false;
    this.sprite.filters = [];
  }

  get left() {
    return this.sprite.x;
  }

  get right() {
    return this.left + this.sprite.width;
  }

  get top() {
    return this.sprite.y;
  }

  get bottom() {
    return this.top + this.sprite.height;
  }

  get nextbottom() {
    return this.bottom + this.dy;
  }

  stayOnPlatform(platform) {
    this.platform = platform;
    this.dy = 0;
    this.jumpIndex = 0;
    this.sprite.y = platform.top - this.sprite.height;
  }

  moveByPlatform(platform) {
    this.sprite.x = platform.nextleft - this.sprite.width;
  }

  update() {
    if (!this.platform) {
      ++this.dy;
      this.sprite.y += this.dy * 0.5;
    }

    if (this.sprite.y > window.innerHeight) {
      this.sprite.emit("die");
    }
  }
}

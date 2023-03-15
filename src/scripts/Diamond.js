import * as PIXI from "pixi.js";
import { Globals } from "./Globals";

export class Diamond {
  constructor(x, y) {
    this.isHinto = Math.random() < 0.2;
    this.sprite = new PIXI.Sprite(
      Globals.resources[this.isHinto ? "hinto" : "gem"].texture
    );
    this.sprite.x = x;
    this.sprite.y = y;
  }

  checkCollision(hero) {
    if (!this.sprite) {
      return;
    }

    if (this.isOverlap(hero)) {
      hero.collectDiamond(this.isHinto);
      this.sprite.destroy();
      this.sprite = null;

      if (this.isHinto) {
        hero.glow()
      } else {
        hero.normal();
      }
    }
  }

  isOverlap(hero) {
    return (
      hero.bottom >= this.top &&
      hero.top <= this.bottom &&
      hero.right >= this.left &&
      hero.left <= this.right
    );
  }

  get left() {
    return this.sprite.x + this.sprite.parent.x;
  }

  get right() {
    return this.left + this.sprite.width;
  }

  get top() {
    return this.sprite.y + this.sprite.parent.y;
  }

  get bottom() {
    return this.top + this.sprite.height;
  }
}

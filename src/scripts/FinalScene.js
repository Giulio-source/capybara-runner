import * as PIXI from "pixi.js";
import { Background } from "./Background";
import { Globals } from "./Globals";
import { LabelScore } from "./LabelScore";
import { MainScene } from "./MainScene";

export class FinalScene {
  constructor(amount) {
    this.container = new PIXI.Container();
    this.createBackground();
    this.createPopup();
    this.createLabelScore(amount);
    this.createText();

    window.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        Globals.scene.start(new MainScene());
      }
    });
  }

  createBackground() {
    this.bg = new Background();
    this.container.addChild(this.bg.container);
  }

  createPopup() {
    this.popup = new PIXI.Graphics();
    const width = 600;
    const height = 400;
    const x = window.innerWidth / 2 - width / 2;
    const y = window.innerHeight / 2 - height / 2;
    this.popup.beginFill(0x000000, 0.5);
    this.popup.drawRect(x, y, width, height);
    this.container.addChild(this.popup);
  }

  createLabelScore(amount) {
    this.labelScore = new LabelScore(
      window.innerWidth / 2,
      window.innerHeight / 2 - 50,
      0.5,
      "#fff"
    );
    this.labelScore.renderScore(amount);
    this.container.addChild(this.labelScore);
  }

  createText() {
    const text = new PIXI.Text();
    text.anchor.set(0.5);
    text.x = window.innerWidth / 2;
    text.y = window.innerHeight / 2 + 50;
    text.style = {
      fontFamily: ["Press Start 2P", "monospace"],
      fontSize: 20,
      fill: ["#fff"],
    };
    text.text = "Press Enter to restart";
    this.popup.addChild(text);
  }
}

import * as PIXI from "pixi.js";

export class LabelScore extends PIXI.Text {
  constructor(x = window.innerWidth - 400, y = 40, anchor = 0, color = "#000") {
    super();
    this.x = x;
    this.y = y;
    this.anchor.set(anchor);
    this.style = {
      fontFamily: ["Press Start 2P", "monospace"],
      fill: [color],
    };
    this.renderScore();
  }

  renderScore(score = 0) {
    this.text = `Score: ${score}`;
  }
}

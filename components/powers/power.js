import { Diamond } from "../diamond.js";

export class Power {
  constructor(scene, powerSprite) {
    this.relatedScene = scene;
    this.powerSprite = powerSprite;
  }

  create(x, y) {
    this.diamond = new Diamond(this.relatedScene);
    this.diamond.create(x, y, this.powerSprite);
  }
}
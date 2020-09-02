export class Power {
  constructor(scene, diamonds, powerSprite) {
    this.relatedScene = scene;
    this.powerSprite = powerSprite;
    this.diamonds = diamonds;
  }

  create(x, y) {
    this.diamonds.create(x, y, this.powerSprite, this);
  }

  givePower() {
    console.log('Define the power');
  }
}
export class Button {
  constructor(scene, image, x, y) {
    this.image = image;
    this.relatedScene = scene;
    this.x = x;
    this.y = y;
  }

  create() {
    this.startButton = this.relatedScene.add.sprite(this.x, this.y, this.image).setInteractive();

    this.startButton.on('pointerover', () => {
      this.startButton.setFrame(1);
    });
    this.startButton.on('pointerout', () => {
      this.startButton.setFrame(0);
    });
    this.startButton.on('pointerdown', () => {
      this.doClick();
    });
  }
}
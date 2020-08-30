export class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
  }

  preload() {
    this.load.image('background', 'images/background.png');
    this.load.image('gameover', 'images/gameover.png');
  }

  create() {
    this.add.image(410, 250, 'background');
    this.gameoverImage = this.add.image(400, 90, 'gameover');
  }

}
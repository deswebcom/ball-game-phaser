export class LiveCounter {
  constructor(scene, initialLives) {
    this.relatedScene = scene;
    this.initialLives = initialLives;
  }

  create() {
    let displacement = 60;
    let firstPosition = 800 - ((this.initialLives - 1) * displacement);
    this.liveImages = this.relatedScene.physics.add.staticGroup({
      setScale: { x: 0.5, y: 0.5 },
      key: 'platform',
      frameQuantity: this.initialLives-1,
      gridAlign: {
        width: this.initialLives - 1,
        height: 1,
        cellWidth: displacement,
        cellHeight: 30,
        x: firstPosition,
        y: 30
      }
    });
  }

  liveLost() {
    if (this.liveImages.countActive() == 0) {
      this.relatedScene.endGame();
      return true;
    }
    let currentLiveLost = this.liveImages.getFirstAlive();
    currentLiveLost.disableBody(true, true);
    return false;
  }
}
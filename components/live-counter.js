export class LiveCounter {
  constructor(scene, initialLives) {
    this.relatedScene = scene;
    this.initialLives = initialLives;
    this.displacement = 60;
    this.maxWidth = 800;
  }

  create() {
    let firstPosition = this.maxWidth - ((this.initialLives - 1) * this.displacement);
    this.liveImages = this.relatedScene.physics.add.staticGroup({
      setScale: { x: 0.5, y: 0.5 },
      key: 'platform',
      frameQuantity: this.initialLives-1,
      gridAlign: {
        width: this.initialLives - 1,
        height: 1,
        cellWidth: this.displacement,
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

  increase() {
    let targetPos = 755;
    this.liveImages.getChildren().forEach( (item, index) => {
      item.x = item.x - this.displacement;
    })
    let newLive = this.liveImages.create(targetPos, 26, 'platform');
    newLive.setScale(0.5);
  }
}
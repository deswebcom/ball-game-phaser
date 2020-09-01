export class LiveCounter {
  constructor(scene, initialLives) {
    this.relatedScene = scene;
    this.lives = initialLives;
    this.liveDisplayers = [];
  }

  create() {
    let displacement = 60;
    let finalPosition = 820 - ((this.lives - 1) * displacement);
    for (let i = this.lives; i > 1 ; i--) {
      let horizontalPosition = ((i - 2) * displacement) + finalPosition;
      let currenDisplay = this.relatedScene.physics.add.image(horizontalPosition, 15, 'platform').setScale(0.5);
      this.liveDisplayers.push(currenDisplay);
    }
  }

  liveLost() {
    this.lives--;
    if(this.lives == 0) {
      this.relatedScene.gameOverSample.play();
      this.relatedScene.endGame();
    } else {
      let currentLiveLost = this.liveDisplayers.pop();
      currentLiveLost.visible = false;
    }
  }

  isAlive() {
    return (this.lives > 0) ? true : false;
  }
}
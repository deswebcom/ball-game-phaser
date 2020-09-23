export class Ball {

  constructor(scene) {
    this.relatedScene = scene;
    this.isGlued = true;
  }

  create() {
    this.ball = this.relatedScene.physics.add.image(385, 430, 'ball');
    this.ball.setBounce(1);
    this.ball.setCollideWorldBounds(true);
  }

  isLost() {
    return (this.ball.y > 500 && this.ball.active) ? true : false;
  }

  get() {
    return this.ball;
  }

  throw(velocity) {
    this.ball.setVelocity(velocity, -300);
    this.isGlued = false;
  }

  removeGlue() {
    this.isGlued = false;
  }
}
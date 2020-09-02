export const INITIAL_PLATFORM_SIZE = 0.6;
export const LARGE_PLATFORM_SIZE = 1;

export class Platform {
  constructor(scene) {
    this.relatedScene = scene;
    this.size = INITIAL_PLATFORM_SIZE;
    this.gluePower = false;
    this.hasBallGlued = false;
  }

  create() {
    this.platform = this.relatedScene.physics.add.image(400, 460, 'platform').setImmovable().setScale(this.size);
    // this.platform.body.allowGravity = false;
    this.platform.setCollideWorldBounds(true);
  }

  hasGluePower() {
    return this.gluePower;
  }
  
  updatePosition(ball, cursors) {
    if (cursors.left.isDown) {
      this.platform.setVelocityX(-500);
      if (ball.getData('glue') || this.hasBallGlued) {
        ball.setVelocityX(-500);
      }
    }
    else if (cursors.right.isDown) {
      this.platform.setVelocityX(500);
      if (ball.getData('glue') || this.hasBallGlued) {
        ball.setVelocityX(500);
      }
    }
    else {
      this.platform.setVelocityX(0);
      if (ball.getData('glue') || this.hasBallGlued) {
        ball.setVelocityX(0);
      }
    }
  }

  setInitialState(ball) {
    this.platform.x = 400;
    this.platform.y = 460;
    ball.setVelocity(0, 0);
    ball.x = 385;
    if (this.size == LARGE_PLATFORM_SIZE) {
      ball.y = 420;
    } else {
      ball.y = 430;
    }
    ball.setData('glue', true);
  }

  setSize(size) {
    this.size = size;
    this.platform.setScale(size);
  }
  setBigSize() {
    this.setSize(LARGE_PLATFORM_SIZE);
    this.gluePower = false;
  }
  setInitialSize() {
    this.setSize(INITIAL_PLATFORM_SIZE);
  }

  removeGlue() {
    this.gluePower = false;
  }

  setGluePower() {
    this.setInitialSize();
    this.gluePower = true;
  }
}


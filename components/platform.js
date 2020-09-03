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
  
  updatePosition(ball, cursors, joystick) {
    if (cursors.left.isDown || joystick.left.isDown) {
      this.platform.setVelocityX(-500);
      if (ball.isGlued || this.hasBallGlued) {
        ball.get().setVelocityX(-500);
      }
    }
    else if (cursors.right.isDown || joystick.right.isDown) {
      this.platform.setVelocityX(500);
      if (ball.isGlued || this.hasBallGlued) {
        ball.get().setVelocityX(500);
      }
    }
    else {
      this.platform.setVelocityX(0);
      if (ball.isGlued || this.hasBallGlued) {
        ball.get().setVelocityX(0);
      }
    }
  }

  setInitialState(ball) {
    this.platform.x = 400;
    this.platform.y = 460;
    ball.get().setVelocity(0, 0);
    ball.get().x = 385;
    if (this.size == LARGE_PLATFORM_SIZE) {
      ball.get().y = 420;
    } else {
      ball.get().y = 430;
    }
    ball.isGlued = true;
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

  get() {
    return this.platform;
  }

  isGluedBecausePower() {
    return (this.hasGluePower() && this.hasBallGlued)
  }
}


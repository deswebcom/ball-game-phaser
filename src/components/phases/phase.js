export class Phase {
  constructor(scene) {
    this.relatedScene = scene;
    this.powers = [];
  }

  configureColisions() {
    this.relatedScene.physics.add.collider(this.relatedScene.ball.get(), this.bricks, this.brickImpact, null, this);
  }

  configureColisionsFixed() {
    this.relatedScene.physics.add.collider(this.relatedScene.ball.get(), this.fixedBricks, this.relatedScene.fixedBrickImpact, null, this.relatedScene);
  }

  deleteFixedBricks() {
    if(this.fixedBricks) {
      this.fixedBricks.getChildren().forEach(item => {
        item.disableBody(true, true);
      });
    }
    if(this.diamonds) {
      this.diamonds.diamonds.getChildren().forEach(item => {
        item.disableBody(true, true);
      });
    }
  }

  isPhaseFinished() {
    return (this.bricks.countActive() === 0)
  }

  setBrickCollider(element) {
    this.relatedScene.physics.add.collider(this.bricks, element);
    if (this.fixedBricks) {
      this.relatedScene.physics.add.collider(this.fixedBricks, element);
    }
  }

  getBrickIndex(brick) {
    let children = this.bricks.getChildren();
    for(let i in children) {
      if (children[i] == brick) {
        return i;
      }
    }
  }

  brickImpact(ball, brick) {
    let brickIndex = this.getBrickIndex(brick);
    if(this.powers[brickIndex]) {
      this.powers[brickIndex].create(ball.x, ball.y)
    }
    this.relatedScene.brickImpact(ball, brick);
  }
}
export class Diamond {
  constructor(scene) {
    this.relatedScene = scene;
  }
  
  create(x, y, sprite) {
    this.diamond = this.relatedScene.physics.add.sprite(x, y, sprite).setScale(0.6);
    this.diamond.anims.play('bluediamondanimation');
    this.diamond.body.setAllowRotation();
    this.diamond.body.setAngularVelocity(100);
    this.diamond.body.setVelocity(100, 90);
    this.diamond.setBounce(1);
    this.diamond.setCollideWorldBounds(true);

    this.relatedScene.setBrickCollider(this.diamond);
    this.relatedScene.physics.add.collider(this.relatedScene.ball, this.diamond, this.ballImpact, null, this);
  }

  ballImpact(ball, diamond) {
    diamond.destroy();
    let currentVelocity = ball.body.velocity;
    ball.setData('glue', false);
    if(currentVelocity.y > 0) {
      ball.body.setVelocityY(300);
    } else {
      ball.body.setVelocityY(-300);
    }
  }
}
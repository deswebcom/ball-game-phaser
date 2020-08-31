export class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
  }
  
  init() {
    this.score = 0;
  }

  preload() {
    this.load.image('background', 'images/background.png');
    this.load.image('gameover', 'images/gameover.png');
    this.load.image('platform', 'images/platform.png');
    this.load.image('ball', 'images/ball.png');
  }

  create() {
    this.physics.world.setBoundsCollision(true, true, true, false);

    this.add.image(410, 250, 'background');
    this.gameoverImage = this.add.image(400, 90, 'gameover');
    this.gameoverImage.visible = false;
    
    this.platform = this.physics.add.image(400, 460, 'platform').setImmovable();
    this.platform.body.allowGravity = false;
    
    this.cursors = this.input.keyboard.createCursorKeys();
    
    this.ball = this.physics.add.image(400, 30, 'ball');
    this.ball.setBounce(1);
    this.ball.setCollideWorldBounds(true);

    let velocity = 100 * Phaser.Math.Between(1.3, 2);
    if (Phaser.Math.Between(0, 10) > 5) {
      velocity = 0 - velocity;
    }
    this.ball.setVelocity(velocity, 10);

    this.physics.add.collider(this.ball, this.platform, this.platformImpact, null, this);

    this.scoreText = this.add.text(16, 16, 'PUNTOS: 0', { fontSize: '20px', fill: '#fff', fontFamily: 'verdana, arial, sans-serif' });
  }

  update() {
    if (this.cursors.left.isDown) {
      this.platform.setVelocityX(-500);
    }
    else if (this.cursors.right.isDown) {
      this.platform.setVelocityX(500);
    }
    else {
      this.platform.setVelocityX(0);
    }

    if (this.ball.y > 500) {
      console.log('fin');
      this.gameoverImage.visible = true;
      this.scene.pause();
    }
  }

  platformImpact(ball, platform) {
    this.score++;
    this.scoreText.setText('PUNTOS: ' + this.score);
    let relativeImpact = ball.x - platform.x;
    if(relativeImpact > 0) {
      console.log('derecha!');
      ball.setVelocityX(10 * relativeImpact);
    } else if(relativeImpact < 0) {
      console.log('izquierda!');
      ball.setVelocityX(10 * relativeImpact);
    } else {
      console.log('centro!!');
      ball.setVelocityX(Phaser.Math.Between(-10, 10))
    }
  }
}
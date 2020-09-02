import { PhaseConstructor } from '../components/phase-constructor.js';
import { LiveCounter } from '../components/live-counter.js';

export class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
  }
  
  init() {
    this.phaseConstructor = new PhaseConstructor(this);
    this.score = 0;
    this.liveCounter = new LiveCounter(this, 3);
  }

  create() {
    this.physics.world.setBoundsCollision(true, true, true, false);
    
    this.add.image(410, 250, 'background');

    this.liveCounter.create();
    
    this.platform = this.physics.add.image(400, 460, 'platform').setImmovable();
    this.platform.body.allowGravity = false;
    this.platform.setCollideWorldBounds(true);
    
    this.cursors = this.input.keyboard.createCursorKeys();
    
    this.ball = this.physics.add.image(385, 430, 'ball');
    this.ball.setBounce(1);
    this.ball.setCollideWorldBounds(true);
    this.ball.setData('glue', true);
    
    this.physics.add.collider(this.ball, this.platform, this.platformImpact, null, this);
    
    this.phaseConstructor.create();

    this.scoreText = this.add.text(16, 16, 'PUNTOS: 0', { fontSize: '20px', fill: '#fff', fontFamily: 'verdana, arial, sans-serif' });

    this.platformImpactSample = this.sound.add('platformimpactsample');
    this.brickImpactSample = this.sound.add('brickimpactsample');
    this.fixedBrickImpactSample = this.sound.add('fixedbrickimpactsample');
    this.gameOverSample = this.sound.add('gameoversample');
    this.winSample = this.sound.add('winsample');
    this.startGameSample = this.sound.add('startgamesample');
    this.liveLostSample = this.sound.add('livelostsample');
    this.phaseChangeSample = this.sound.add('phasechange');

    this.createAnimations();
  }

  update() {
    if (this.cursors.left.isDown) {
      this.platform.setVelocityX(-500);
      if(this.ball.getData('glue')) {
        this.ball.setVelocityX(-500);
      }
    }
    else if (this.cursors.right.isDown) {
      this.platform.setVelocityX(500);
      if (this.ball.getData('glue')) {
        this.ball.setVelocityX(500);
      }
    }
    else {
      this.platform.setVelocityX(0);
      if (this.ball.getData('glue')) {
        this.ball.setVelocityX(0);
      }
    }

    if (this.ball.y > 500 && this.ball.active) {
      let gameNotFinished = this.liveCounter.liveLost();
      if (!gameNotFinished) {
        this.liveLostSample.play();
        this.setInitialPlatformState();
      }
    }

    if (this.cursors.up.isDown) {
      if (this.ball.getData('glue')) {
        this.startGameSample.play();
        this.ball.setVelocity(-60, -300);
        this.ball.setData('glue', false);
      }
    }
  }

  platformImpact(ball, platform) {
    this.platformImpactSample.play();
    this.increasePoints(1);
    let relativeImpact = ball.x - platform.x;
    if(relativeImpact > 0) {
      ball.setVelocityX(8 * relativeImpact);
    } else if(relativeImpact < 0) {
      ball.setVelocityX(8 * relativeImpact);
    } else {
      ball.setVelocityX(Phaser.Math.Between(-10, 10))
    }
  }

  brickImpact(ball, brick) {
    this.brickImpactSample.play();
    brick.disableBody(true, true);
    this.increasePoints(10);
    if (this.phaseConstructor.isPhaseFinished()) {
      this.phaseChangeSample.play();
      this.phaseConstructor.nextLevel();
      this.setInitialPlatformState();
    }
  }

  fixedBrickImpact(ball, brick) {
    this.fixedBrickImpactSample.play();
  }

  increasePoints(points) {
    this.score += points;
    this.scoreText.setText('PUNTOS: ' + this.score);
  }

  endGame(completed = false) {
    if(! completed) {
      this.gameOverSample.play();
      this.scene.start('gameover');
    } else {
      this.winSample.play();
      this.scene.start('congratulations');
    }
  }

  setInitialPlatformState() {
    
    this.platform.x = 400;
    this.platform.y = 460;
    this.ball.setVelocity(0,0);
    this.ball.x = 385;
    this.ball.y = 430;
    this.ball.setData('glue', true);
  }

  setBrickCollider(element) {
    this.phaseConstructor.setBrickCollider(element);
  }

  createAnimations() {
    this.anims.create({
      key: 'bluediamondanimation',
      frames: this.anims.generateFrameNumbers('bluediamondsprites', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1,
      yoyo: true,
    });
  }
}
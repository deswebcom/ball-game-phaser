import { PhaseConstructor } from '../components/phases/phase-constructor.js';
import { LiveCounter } from '../components/live-counter.js';

const INITIAL_PLATFORM_SIZE = 0.6;
const LARGE_PLATFORM_SIZE = 1;
const INITIAL_VELOCITY_X = -60;

export class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
  }
  
  init() {
    this.phaseConstructor = new PhaseConstructor(this);
    this.score = 0;
    this.liveCounter = new LiveCounter(this, 4);
    this.platformSize = INITIAL_PLATFORM_SIZE;
    this.gluePower = false;
    this.glueRecordVelocityX = INITIAL_VELOCITY_X; 
    this.isGlued = false;
  }

  create() {
    this.physics.world.setBoundsCollision(true, true, true, false);
    
    this.add.image(410, 250, 'background');

    this.liveCounter.create();
    
    this.platform = this.physics.add.image(400, 460, 'platform').setImmovable().setScale(this.platformSize);
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
      if (this.ball.getData('glue') || this.isGlued) {
        this.ball.setVelocityX(-500);
      }
    }
    else if (this.cursors.right.isDown) {
      this.platform.setVelocityX(500);
      if (this.ball.getData('glue') || this.isGlued) {
        this.ball.setVelocityX(500);
      }
    }
    else {
      this.platform.setVelocityX(0);
      if (this.ball.getData('glue') || this.isGlued) {
        this.ball.setVelocityX(0);
      }
    }

    if (this.ball.y > 500 && this.ball.active) {
      let gameNotFinished = this.liveCounter.liveLost();
      if (!gameNotFinished) {
        this.liveLostSample.play();
        this.setInitialPlatformState();
        this.setPlatformInitial();
        this.gluePower = false;
        this.glueRecordVelocityX = INITIAL_VELOCITY_X;
      }
    }

    if (this.cursors.up.isDown) {
      if (this.ball.getData('glue')) {
        this.startGameSample.play();
        this.ball.setVelocity(INITIAL_VELOCITY_X, -300);
        this.ball.setData('glue', false);
      } else if(this.gluePower && this.isGlued) {
        this.isGlued = false;
        this.ball.setVelocity(this.glueRecordVelocityX, -300);
      }
    }
  }

  platformImpact(ball, platform) {
    this.platformImpactSample.play();
    this.increasePoints(1);
    let relativeImpact = ball.x - platform.x;
    if(this.gluePower) {
      this.ball.setVelocityY(0);
      this.ball.setVelocityX(0);
      this.glueRecordVelocityX = this.calculateVelocity(relativeImpact);
      this.isGlued = true;
    } else {
        ball.setVelocityX(this.calculateVelocity(relativeImpact));
    }
  }

  calculateVelocity(relativeImpact) {
    if (relativeImpact > 0) {
      return (8 * relativeImpact);
    } else if (relativeImpact < 0) {
      return (8 * relativeImpact);
    } else {
      return (Phaser.Math.Between(-10, 10))
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
    if(this.platformSize == 1) {
      this.ball.y = 420;
    } else {
      this.ball.y = 430;
    }
    this.ball.setData('glue', true);
  }

  createAnimations() {
    this.anims.create({
      key: 'bluediamondanimation',
      frames: this.anims.generateFrameNumbers('bluediamond', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1,
      yoyo: true,
    });
    this.anims.create({
      key: 'reddiamondanimation',
      frames: this.anims.generateFrameNumbers('reddiamond', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1,
      yoyo: true,
    });
    this.anims.create({
      key: 'greendiamondanimation',
      frames: this.anims.generateFrameNumbers('greendiamond', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1,
      yoyo: true,
    });
  }

  increaseLives() {
    this.liveCounter.increase();
  }

  setPlatformSize(size) {
    this.platformSize = size;
    this.platform.setScale(size);
  }
  setPlatformBig() {
    this.setPlatformSize(LARGE_PLATFORM_SIZE);
    this.gluePower = false;
  }
  setPlatformInitial() {
    this.setPlatformSize(INITIAL_PLATFORM_SIZE);
  }
  setGluePower() {
    this.setPlatformInitial();
    this.gluePower = true;
  }
}
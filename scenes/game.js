import { PhaseConstructor } from '../components/phases/phase-constructor.js';
import { LiveCounter } from '../components/live-counter.js';
import { Platform } from '../components/platform.js';

const INITIAL_LIVES = 3;
const INITIAL_VELOCITY_X = -60;

export class Game extends Phaser.Scene {
  
  constructor() {
    super({ key: 'game' });
  }
  
  init() {
    this.glueRecordVelocityX = INITIAL_VELOCITY_X; 
    this.phaseConstructor = new PhaseConstructor(this);
    this.platform = new Platform(this);
    this.liveCounter = new LiveCounter(this, INITIAL_LIVES);
    this.score = 0;
  }

  create() {
    this.physics.world.setBoundsCollision(true, true, true, false);
    
    this.add.image(410, 250, 'background');

    this.liveCounter.create();
    
    this.platform.create();

    this.ball = this.physics.add.image(385, 430, 'ball');
    this.ball.setBounce(1);
    this.ball.setCollideWorldBounds(true);
    this.ball.setData('glue', true);
    
    this.physics.add.collider(this.ball, this.platform.platform, this.platformImpact, null, this);
    
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

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.platform.updatePosition(this.ball, this.cursors);

    if (this.ball.y > 500 && this.ball.active) {
      let gameNotFinished = this.liveCounter.liveLost();
      if (!gameNotFinished) {
        this.liveLostSample.play();
        this.platform.setInitialState(this.ball);
        this.platform.setInitialSize();
        this.platform.removeGlue();
        this.glueRecordVelocityX = INITIAL_VELOCITY_X;
      }
    }

    if (this.cursors.up.isDown) {
      if (this.ball.getData('glue')) {
        this.startGameSample.play();
        this.ball.setVelocity(INITIAL_VELOCITY_X, -300);
        this.ball.setData('glue', false);
      } else if (this.platform.hasGluePower() && this.platform.hasBallGlued) {
        this.ball.setVelocity(this.glueRecordVelocityX, -300);
        this.platform.hasBallGlued = false;
      }
    }
  }

  platformImpact(ball, platform) {
    this.platformImpactSample.play();
    this.increasePoints(1);
    let relativeImpact = ball.x - platform.x;
    if(this.platform.hasGluePower()) {
      this.ball.setVelocityY(0);
      this.ball.setVelocityX(0);
      this.glueRecordVelocityX = this.calculateVelocity(relativeImpact);
      this.platform.hasBallGlued = true;
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
      this.platform.setInitialState(this.ball);
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
  
  setGluePower() {
    this.platform.setGluePower();
  }
  
  setPlatformBig() {
    this.platform.setBigSize();
  }
}
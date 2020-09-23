import { PhaseConstructor } from '../components/phases/phase-constructor.js';
import { LiveCounter } from '../components/live-counter.js';
import { Platform } from '../components/platform.js';
import { Ball } from '../components/ball.js';
import { MobileControls } from '../components/mobile-controls.js';

const INITIAL_LIVES = 6;
const INITIAL_VELOCITY_X = -60;

export class Game extends Phaser.Scene {
  
  constructor() {
    super({ key: 'game' });
  }
  
  init() {
    this.glueRecordVelocityX = INITIAL_VELOCITY_X; 
    this.phaseConstructor = new PhaseConstructor(this);
    this.platform = new Platform(this);
    this.ball = new Ball(this);
    this.liveCounter = new LiveCounter(this, INITIAL_LIVES);
    this.score = 0;
    this.mobileControls = new MobileControls(this);
  }

  create() {
    this.physics.world.setBoundsCollision(true, true, true, false);
    
    this.add.image(410, 250, 'background');
    
    this.liveCounter.create();
    
    this.platform.create();
    this.ball.create();
    
    this.physics.add.collider(this.ball.get(), this.platform.get(), this.platformImpact, null, this);
    
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
    this.mobileControls.create();

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.platform.updatePosition(this.ball, this.cursors, this.mobileControls);

    if (this.ball.isLost()) {
      let gameNotFinished = this.liveCounter.liveLost();
      if (!gameNotFinished) {
        this.liveLostSample.play();
        this.platform.setInitialState(this.ball);
        this.platform.setInitialSize();
        this.platform.removeGlue();
        this.glueRecordVelocityX = INITIAL_VELOCITY_X;
      }
    }

    if (this.cursors.up.isDown || this.mobileControls.launch.isDown ) {
      if (this.ball.isGlued) {
        this.startGameSample.play();
        this.ball.throw(INITIAL_VELOCITY_X);
      } else if(this.platform.isGluedBecausePower()) {
        this.ball.throw(this.glueRecordVelocityX);
        this.platform.hasBallGlued = false;
      }
    }
  }

  platformImpact(ball, platform) {
    this.platformImpactSample.play();
    this.increasePoints(1);
    let relativeImpact = ball.x - platform.x;
    if(this.platform.hasGluePower()) {
      ball.setVelocityY(0);
      ball.setVelocityX(0);
      this.glueRecordVelocityX = this.calculateVelocity(relativeImpact);
      this.platform.hasBallGlued = true;
    } else {
      ball.setVelocityX(this.calculateVelocity(relativeImpact));
    }
  }

  calculateVelocity(relativeImpact) {
    if(relativeImpact > 50) {
      relativeImpact = 50;
    }
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

  removeGlueFromBall() {
    this.ball.removeGlue();
  }
}
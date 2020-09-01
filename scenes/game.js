import { LiveCounter } from '../components/live-counter.js';

export class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
  }
  
  init() {
    this.score = 0;
    this.liveCounter = new LiveCounter(this, 3);
  }

  preload() {
    this.load.image('background', 'images/background.png');
    this.load.image('platform', 'images/platform.png');
    this.load.image('ball', 'images/ball.png');
    this.load.image('bluebrick', 'images/brickBlue.png');
    this.load.image('blackbrick', 'images/brickBlack.png');
    this.load.image('greenbrick', 'images/brickGreen.png');
    this.load.image('orangebrick', 'images/brickOrange.png');

    this.load.audio('platformimpactsample', 'sounds/platform-impact.ogg');
    this.load.audio('brickimpactsample', 'sounds/brick-impact.ogg');
    this.load.audio('gameoversample', 'sounds/gameover.ogg');
    this.load.audio('winsample', 'sounds/you_win.ogg');
    this.load.audio('startgamesample', 'sounds/start-game.ogg');
    this.load.audio('livelostsample', 'sounds/live-lost.ogg');
  }

  create() {
    this.physics.world.setBoundsCollision(true, true, true, false);
    
    this.add.image(410, 250, 'background');
    
    this.liveCounter.create();
    
    this.bricks = this.physics.add.staticGroup({
      key: ['bluebrick', 'orangebrick', 'greenbrick', 'blackbrick'], 
      frameQuantity: 10,
      gridAlign: { 
        width: 10, 
        height: 4, 
        cellWidth: 67, 
        cellHeight: 34, 
        x: 112, 
        y: 100
      }
    });

    this.platform = this.physics.add.image(400, 460, 'platform').setImmovable();
    this.platform.body.allowGravity = false;
    this.platform.setCollideWorldBounds(true);
    
    this.cursors = this.input.keyboard.createCursorKeys();
    
    this.ball = this.physics.add.image(385, 430, 'ball');
    this.ball.setBounce(1);
    this.ball.setCollideWorldBounds(true);
    this.ball.setData('glue', true);

    this.physics.add.collider(this.ball, this.platform, this.platformImpact, null, this);

    this.physics.add.collider(this.ball, this.bricks, this.brickImpact, null, this);

    this.scoreText = this.add.text(16, 16, 'PUNTOS: 0', { fontSize: '20px', fill: '#fff', fontFamily: 'verdana, arial, sans-serif' });

    this.platformImpactSample = this.sound.add('platformimpactsample');
    this.brickImpactSample = this.sound.add('brickimpactsample');
    this.brickImpactSample = this.sound.add('brickimpactsample');
    this.gameOverSample = this.sound.add('gameoversample');
    this.winSample = this.sound.add('winsample');
    this.startGameSample = this.sound.add('startgamesample');
    this.liveLostSample = this.sound.add('livelostsample');
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
      this.liveCounter.liveLost();
      if(this.liveCounter.isAlive()) {
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
    if (this.bricks.countActive() === 0) {
      this.endGame(true);
      this.winSample.play();
    }
  }

  increasePoints(points) {
    this.score += points;
    this.scoreText.setText('PUNTOS: ' + this.score);
  }

  endGame(completed = false) {
    this.scene.pause();
    if(! completed) {
      this.scene.start('gameover');
    } else {
      this.scene.start('congratulations');
    }
  }

  setInitialPlatformState() {
    this.liveLostSample.play();
    this.platform.x = 400;
    this.platform.y = 460;
    this.ball.setVelocity(0,0);
    this.ball.x = 385;
    this.ball.y = 430;
    this.ball.setData('glue', true);
  }
}
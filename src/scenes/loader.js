import { PlayButton } from '../components/play-button.js';

export class Loader extends Phaser.Scene {
  constructor() {
    super({ key: 'loader' });
    this.playButton = new PlayButton(this);
  }

  preload() {
    // mobile controls
    this.load.image('rightbutton', '/images/right.png');
    this.load.image('leftbutton', '/images/left.png');
    this.load.image('launchbutton', '/images/launchbutton.png');


    // Preload
    this.load.image('background-preload', '/images/background-preload.png');
    this.load.spritesheet('playbutton', '/images/playbutton.png', { frameWidth: 190, frameHeight: 49 });
    this.load.audio('breakoutsample', '/sounds/breakout.mp3');

    // Game
    this.load.image('background', '/images/background.png');
    this.load.image('platform', '/images/platform2.png');
    this.load.image('ball', '/images/ball.png');
    this.load.image('bluebrick', '/images/brickBlue.png');
    this.load.image('blackbrick', '/images/brickBlack.png');
    this.load.image('greenbrick', '/images/brickGreen.png');
    this.load.image('orangebrick', '/images/brickOrange.png');
    this.load.image('yellowbrick', '/images/brickYellow.png');
    this.load.image('whitebrick', '/images/brickWhite.png');
    this.load.image('greybrick', '/images/brickGrey.png');
    
    this.load.spritesheet('bluediamond',
      '/images/blue_diamond-sprites.png',
      { frameWidth: 48, frameHeight: 48 }
    );
    this.load.spritesheet('reddiamond',
      '/images/red_diamond-sprites.png',
      { frameWidth: 48, frameHeight: 48 }
    );
    this.load.spritesheet('greendiamond',
      '/images/green_diamond-sprites.png',
      { frameWidth: 48, frameHeight: 48 }
    );

    this.load.audio('platformimpactsample', '/sounds/platform-impact.mp3');
    this.load.audio('brickimpactsample', '/sounds/brick-impact.mp3');
    this.load.audio('fixedbrickimpactsample', '/sounds/fixed-brick-impact.mp3');
    this.load.audio('gameoversample', '/sounds/gameover.mp3');
    this.load.audio('winsample', '/sounds/you_win.mp3');
    this.load.audio('startgamesample', '/sounds/start-game.mp3');
    this.load.audio('livelostsample', '/sounds/live-lost.mp3');
    this.load.audio('phasechange', '/sounds/phasechange.mp3');
    
    // Game over & Congratulations
    this.load.spritesheet('restartbutton', '/images/restart.png', { frameWidth: 190, frameHeight: 49 });
    this.load.image('congratulations', '/images/congratulations.png');
    this.load.image('gameover', '/images/gameover.png');
  }
  
  create() {
    this.add.image(400, 250, 'background-preload');
    this.playButton.create();
    this.breakoutSample = this.sound.add('breakoutsample');
    
  }
}
import { Loader } from './scenes/loader.js';
import { Game } from './scenes/game.js';
import { Congratulations } from './scenes/congratulations.js';
import { Gameover } from './scenes/gameover.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  scene: [Loader, Game, Gameover, Congratulations],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
}

var game = new Phaser.Game(config);
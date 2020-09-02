import { Button } from './button.js';

export class PlayButton extends Button {
  constructor(scene) {
    super(scene, 'playbutton', 400, 400);
  }

  doClick() {
    this.relatedScene.breakoutSample.play();
    this.relatedScene.scene.start('game');
  }
  
}
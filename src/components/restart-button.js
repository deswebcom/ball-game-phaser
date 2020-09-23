import { Button } from './button.js';

export class RestartButton extends Button {
  constructor(scene) {
    super(scene, 'restartbutton', 400, 230);
  }

  doClick() {
    this.relatedScene.scene.start('game');
  }

}
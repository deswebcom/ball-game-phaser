import { Power } from './power.js';

export class LivePower extends Power {
  constructor(scene, diamonds) {
    super(scene, diamonds, 'bluediamond');
  }

  givePower() {
    this.relatedScene.increaseLives();
  }
}
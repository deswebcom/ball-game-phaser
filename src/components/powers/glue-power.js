import { Power } from './power.js';

export class GluePower extends Power {
  constructor(scene, diamonds) {
    super(scene, diamonds, 'greendiamond');
  }

  givePower() {
    this.relatedScene.setGluePower();
  }
}

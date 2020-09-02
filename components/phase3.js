import { Phase } from './phase.js'
import { LivePower } from './powers/live-power.js';

export class Phase3 extends Phase {

  create() {
    this.bricks = this.relatedScene.physics.add.staticGroup();

    this.bricks.create(110, 270, 'orangebrick');
    this.bricks.create(170, 225, 'bluebrick');
    this.bricks.create(230, 180, 'yellowbrick');
    this.bricks.create(290, 135, 'blackbrick');
    this.bricks.create(350, 90, 'greenbrick');

    this.bricks.create(680, 270, 'orangebrick');
    this.bricks.create(620, 225, 'bluebrick');
    this.bricks.create(560, 180, 'yellowbrick');
    this.bricks.create(500, 135, 'blackbrick');
    this.bricks.create(440, 90, 'greenbrick');

    this.configureColisions();
    
    this.powers[3] = new LivePower(this.relatedScene);
    this.powers[4] = new LivePower(this.relatedScene);;
    this.powers[5] = new LivePower(this.relatedScene);;

  }
}
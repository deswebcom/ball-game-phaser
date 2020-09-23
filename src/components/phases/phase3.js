import { Phase } from './phase.js'
import { LivePower } from '../powers/live-power.js';
import { LargePlatformPower } from '../powers/large-platform-power.js';
import { GluePower } from '../powers/glue-power.js';
import { Diamonds } from "../diamonds.js";

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
  
    this.diamonds = new Diamonds(this.relatedScene);
    this.setBrickCollider(this.diamonds.diamonds);

    this.powers[3] = new LivePower(this.relatedScene, this.diamonds);
    this.powers[4] = new LargePlatformPower(this.relatedScene, this.diamonds);
    this.powers[1] = new GluePower(this.relatedScene, this.diamonds);

  }
}
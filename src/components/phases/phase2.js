import { Phase } from './phase.js'
import { Diamonds } from "../diamonds.js";
import { LivePower } from '../powers/live-power.js';
import { LargePlatformPower } from '../powers/large-platform-power.js';
import { GluePower } from '../powers/glue-power.js';

export class Phase2 extends Phase {

  create() {
    this.bricks = this.relatedScene.physics.add.staticGroup();

    this.bricks.create(400, 270, 'orangebrick');
    this.bricks.create(360, 225, 'orangebrick');
    this.bricks.create(440, 225, 'orangebrick');
    this.bricks.create(480, 180, 'orangebrick');
    this.bricks.create(400, 180, 'orangebrick');
    this.bricks.create(320, 180, 'orangebrick');
    this.bricks.create(280, 135, 'orangebrick');
    this.bricks.create(360, 135, 'orangebrick');
    this.bricks.create(440, 135, 'orangebrick');
    this.bricks.create(520, 135, 'orangebrick');
    this.bricks.create(330, 90, 'orangebrick');
    this.bricks.create(470, 90, 'orangebrick');

    this.configureColisions();

    this.diamonds = new Diamonds(this.relatedScene);
    this.setBrickCollider(this.diamonds.diamonds);

    this.powers[11] = new LivePower(this.relatedScene, this.diamonds);
    this.powers[10] = new LargePlatformPower(this.relatedScene, this.diamonds);
    this.powers[4] = new GluePower(this.relatedScene, this.diamonds);
  }
}
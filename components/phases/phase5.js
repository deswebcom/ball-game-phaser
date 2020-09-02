import { Phase } from './phase.js'
import { Diamonds } from "../diamonds.js";
import { LivePower } from '../powers/live-power.js';
import { LargePlatformPower } from '../powers/large-platform-power.js';

export class Phase5 extends Phase {

  create() {
    this.bricks = this.relatedScene.physics.add.staticGroup({
      key: ['bluebrick'],
      frameQuantity: 4,
      gridAlign: {
        width: 10,
        height: 5,
        cellWidth: 67,
        cellHeight: 34,
        x: 290,
        y: 150
      }
    });

    this.fixedBricks = this.relatedScene.physics.add.staticGroup({
      key: ['greybrick'],
      frameQuantity: 4,
      gridAlign: {
        width: 10,
        height: 5,
        cellWidth: 67,
        cellHeight: 34,
        x: 290,
        y: 190
      }
    });

    this.configureColisions();
    this.configureColisionsFixed();

    this.diamonds = new Diamonds(this.relatedScene);
    this.setBrickCollider(this.diamonds.diamonds);

    this.powers[1] = new LivePower(this.relatedScene, this.diamonds);
    this.powers[3] = new LargePlatformPower(this.relatedScene, this.diamonds);

  }
}
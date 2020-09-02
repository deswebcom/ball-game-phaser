import { Phase } from './phase.js';
import { Diamonds } from "../diamonds.js";
import { LivePower } from '../powers/live-power.js';
import { LargePlatformPower } from '../powers/large-platform-power.js';
import { GluePower } from '../powers/glue-power.js';

export class Phase1 extends Phase {
  create() {
    this.bricks = this.relatedScene.physics.add.staticGroup({
      key: ['bluebrick', 'orangebrick', 'greenbrick', 'blackbrick', 'yellowbrick', 'blackbrick', 'yellowbrick', 'bluebrick', 'orangebrick', 'greenbrick'],
      frameQuantity: 1,
      gridAlign: {
        width: 5,
        height: 4,
        cellWidth: 150,
        cellHeight: 100,
        x: 135,
        y: 150
      }
    });

    this.fixedBricks = this.relatedScene.physics.add.staticGroup();
    this.fixedBricks.create(316, 165, 'greybrick');
    this.fixedBricks.create(466, 165, 'greybrick');

    this.configureColisions();
    this.configureColisionsFixed();

    this.diamonds = new Diamonds(this.relatedScene);
    this.setBrickCollider(this.diamonds.diamonds);

    this.powers[3] = new LivePower(this.relatedScene, this.diamonds);
    this.powers[5] = new LargePlatformPower(this.relatedScene, this.diamonds);
    this.powers[7] = new GluePower(this.relatedScene, this.diamonds);
  }
}
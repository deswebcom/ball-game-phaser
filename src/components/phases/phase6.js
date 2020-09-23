import { Phase } from './phase.js'
import { Diamonds } from "../diamonds.js";
import { LivePower } from '../powers/live-power.js';
import { LargePlatformPower } from '../powers/large-platform-power.js';
import { GluePower } from '../powers/glue-power.js';

export class Phase6 extends Phase {

  create() {
    this.bricks = this.relatedScene.physics.add.staticGroup({
      key: ['whitebrick', 'blackbrick', 'whitebrick', 'blackbrick', 'whitebrick'],
      frameQuantity: 10,
      gridAlign: {
        width: 10,
        height: 5,
        cellWidth: 67,
        cellHeight: 34,
        x: 105,
        y: 70
      }
    });

    this.bricks.getChildren().forEach( (element, index) => {
      if ((index >= 10 && index < 20) || (index >= 30 && index < 40)) {
        index++;
      }
      if(((index+1) % 2) == 0) {
        element.disableBody(true, true);
      }
    });

    this.configureColisions();

    this.diamonds = new Diamonds(this.relatedScene);
    this.setBrickCollider(this.diamonds.diamonds);

    this.powers[3] = new LivePower(this.relatedScene, this.diamonds);
    this.powers[14] = new LargePlatformPower(this.relatedScene, this.diamonds);
    this.powers[21] = new GluePower(this.relatedScene, this.diamonds);
    this.powers[4] = new LivePower(this.relatedScene, this.diamonds);
    this.powers[15] = new LargePlatformPower(this.relatedScene, this.diamonds);
    this.powers[22] = new GluePower(this.relatedScene, this.diamonds);

  }
}
import { Phase } from './phase.js'

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


  }
}
import { Phase } from './phase.js'

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
  }
}
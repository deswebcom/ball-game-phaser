import { Phase } from './phase.js'

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

    // this.bricks.create(480, 180, 'orangebrick');
    // this.bricks.create(400, 180, 'orangebrick');
    // this.bricks.create(320, 180, 'orangebrick');
    // this.bricks.create(280, 135, 'orangebrick');
    // this.bricks.create(360, 135, 'orangebrick');
    // this.bricks.create(440, 135, 'orangebrick');
    // this.bricks.create(520, 135, 'orangebrick');
    // this.bricks.create(330, 90, 'orangebrick');
    // this.bricks.create(470, 90, 'orangebrick');

    this.configureColisions();

  }
}
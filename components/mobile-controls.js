export class MobileControls {

  constructor(scene) {
    this.relatedScene = scene;
    this.right = {isDown: false};
    this.left = { isDown: false };
    this.launch = { isDown: false };
  }

  create() {
    this.leftButton = this.relatedScene.add.image(60, 320, 'leftbutton').setInteractive();
    this.rightButton = this.relatedScene.add.image(740, 320, 'rightbutton').setInteractive();
    this.launchButton = this.relatedScene.add.image(726, 430, 'launchbutton').setInteractive();

    this.leftButton.on('pointerdown', () => {
      this.left.isDown = true;
    });
    this.leftButton.on('pointerup', () => {
      this.left.isDown = false;
    });

    this.rightButton.on('pointerdown', () => {
      this.right.isDown = true;
    });
    this.rightButton.on('pointerup', () => {
      this.right.isDown = false;
    });

    this.launchButton.on('pointerdown', () => {
      this.launch.isDown = true;
    });
    this.launchButton.on('pointerup', () => {
      this.launch.isDown = false;
    });
  }
}
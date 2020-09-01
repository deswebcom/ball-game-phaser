import { Phase1 } from './phase1.js'
import { Phase2 } from './phase2.js'

const phases = [
  Phase1
];

export class PhaseConstructor {
  constructor(scene) {
    this.relatedScene = scene;
  }

  create() {
    let CurrenPhaseClass = phases.pop();
    let currentPhase = new CurrenPhaseClass(this.relatedScene);
    return currentPhase.create();
  }

  nextLevel() {
    if(phases.length == 0) {
      this.relatedScene.endGame(true);
    } else {
      return this.create();
    }
  }
}
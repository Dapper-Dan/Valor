import Board from "./board";
import MonsterSprite from "./monster_sprite";

export default class Monster {
  constructor() {
    this.currentPos = [17, 2]//[[17, 2], [6, 7]];
    this.nextPos = [1, 4];
    this.timeStart = 0;
    this.delayMove = 300;
    this.size = [50, 50]; 
    this.possibleMapPos = [[1130, 150], [570, 500]];
    this.sampleBoard = new Board();
    this.direction = "right";
    this.lastDir = "right"
    this.moving = false;
    this.sprites = {
      "up": new MonsterSprite("./src/images/knightFrames.png", { 0: { pos: [5, 167], size: [35, 39] },
                                                                   1: { pos: [40, 166], size: [40, 39] },
                                                                   2: { pos: [85, 165], size: [40, 39] }
                                                                  },
                                                                  200), 
      "right": new MonsterSprite("./src/images/knightFrames.png", { 0: { pos: [5, 167], size: [35, 39] },
                                                                     1: { pos: [40, 166], size: [40, 39] },
                                                                     2: { pos: [85, 165], size: [40, 39] }
                                                                   },
                                                                   200), 
      "down": new MonsterSprite("./src/images/knightFrames.png", { 0: { pos: [5, 167], size: [35, 39] },
                                                                    1: { pos: [40, 166], size: [40, 39] },
                                                                    2: { pos: [85, 165], size: [40, 39] }
                                                                    },
                                                                    200), 
      "left": new MonsterSprite("./src/images/knightFrames.png", { 0: { pos: [84, 30], size: [40, 39] },
                                                                    1: { pos: [50, 29], size: [34, 39] },
                                                                    2: { pos: [15, 29], size: [34, 39] }
                                                                    },
                                                                    200)

    }
    
  }
}
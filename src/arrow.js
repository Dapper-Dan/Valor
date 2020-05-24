import Board from "./board";
import MonsterSprite from "./monster_sprite";
import Player from "./player";

export default class Arrow {
  constructor(startPos, nextPos, mapPos) {
    this.currentPos = startPos
    this.nextPos = nextPos;
    this.timeStart = 0;
    this.delayMove = 50;
    this.size = [30, 30]; 
    this.mapPos = mapPos;
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
  
  move(x, y) {
    this.currentPos = [x, y];
    this.nextPos = [x, y];
    this.mapPos = [
      (this.sampleBoard.tileWidth * x) + ((this.sampleBoard.tileWidth - this.size[0]) / 2), 
      (this.sampleBoard.tileHeight * y) + ((this.sampleBoard.tileHeight - this.size[1]) / 2)
    ];
  }

  handleMove(currentTime) {
    if (this.currentPos[0] === this.nextPos[0] && this.currentPos[1] === this.nextPos[1]) return false;

    if ((currentTime - this.timeStart) >= this.delayMove ) {
      this.move(this.nextPos[0], this.nextPos[1]);
      this.moving = !this.moving
    } else {
      this.getMapPos();
      this.checkDirectionAndAdjust(currentTime);
      this.mapPos[0] = Math.round(this.mapPos[0]);
      this.mapPos[1] = Math.round(this.mapPos[1]);
    }

    return true;
  }

  getMapPos() {// 
    this.mapPos[0] = (this.currentPos[0] * this.sampleBoard.tileWidth) + ((this.sampleBoard.tileWidth - this.size[0]) / 2);
    this.mapPos[1] = (this.currentPos[1] * this.sampleBoard.tileHeight) + ((this.sampleBoard.tileHeight - this.size[1]) / 2);
  }

  checkDirectionAndAdjust(currentTime) {
    if (this.nextPos[0] !== this.currentPos[0]) {
      let pixelDist = (this.sampleBoard.tileWidth / this.delayMove) * (currentTime - this.timeStart);

      if (this.nextPos[0] < this.currentPos[0]) {
        this.mapPos[0] += (0 - pixelDist);
      } else {
        this.mapPos[0] += (pixelDist);
      }
    } else {
      let pixelDist = (this.sampleBoard.tileHeight / this.delayMove) * (currentTime - this.timeStart);

      if (this.nextPos[1] < this.currentPos[1]) {
        this.mapPos[1] += (0 - pixelDist);
      } else {
        this.mapPos[1] += (pixelDist);
      }
    }
  }

  toIndex(x, y) {
    return ((y * this.sampleBoard.mapWidth) + x);
  }

  isWalkable(x, y) {
    if (x < 0 || x >= this.sampleBoard.mapWidth || y < 0 || y >= this.sampleBoard.mapHeight) return false;
    if (this.sampleBoard.tileTypes[this.sampleBoard.gameMap[this.toIndex(x, y)]].floor !== this.sampleBoard.floorTypes.walkable) return false; 
    return true;
  }

  canMoveUp() {
    return this.isWalkable(this.currentPos[0], this.currentPos[1] - 1);
  }

  canMoveDown() {
    return this.isWalkable(this.currentPos[0], this.currentPos[1] + 1);
  }

  canMoveLeft() {
    return this.isWalkable(this.currentPos[0] - 1, this.currentPos[1]);
  }

  canMoveRight() {
    return this.isWalkable(this.currentPos[0] + 1, this.currentPos[1]);
  }

  moveUp(currentGameTime) {
    this.nextPos[1] -= 1;
    this.timeStart = currentGameTime;
    if (this.lastDir === "left") this.direction = "left";
    this.moving = true;
  }
  
  moveDown(currentGameTime) {
    this.nextPos[1] += 1;
    this.timeStart = currentGameTime;
    if (this.lastDir === "left") this.direction = "left";
    this.moving = true;
  }

  moveLeft(currentGameTime) {
    this.nextPos[0] -= 1;
    this.timeStart = currentGameTime;
    this.direction = "left";
    this.moving = true; 
  }

  moveRight(currentGameTime) {
    this.nextPos[0] += 1;
    this.timeStart = currentGameTime;
    this.direction = "right";
    this.moving = true;
  }

}

  // moveUpLeft(currentGameTime) {
  //   this.nextPos[0] -= 1;  NEEDS WORK-ANIMATION
  //   this.nextPos[1] -= 1;
  //   this.timeStart = currentGameTime;
  //   this.direction = "upLeft"
  //   this.moving = true;
  // }
  
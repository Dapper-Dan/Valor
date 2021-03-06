import Board from "./board";
import Sprite from "./sprite";

export default class Monster {
  constructor() {
    this.currentPos = [17, 21]
    this.nextPos = [17, 22];
    this.guardPoint = [17, 22]
    this.timeStart = 0;
    this.delayMove = {
      skull: 250,
      red: 400,
      green: 350,
      purple: 600,
      boss: 500
    }
    this.size = [50, 50]; 
    this.mapPos = [1130, 150];
    this.sampleBoard = new Board();
    this.direction = "right";
    this.life = {
      skull: 1,
      red: 2,
      green: 1,
      purple: 3,
      boss: 5
    }
    this.walkingDIR = null;
    this.needToGoDIR = null;
    this.stuck = false;
    this.moving = true;
    this.alive = true;
    this.sprites = {
      "red": new Sprite({ 
        0: { pos: [6, 7], size: [25, 32] },
        1: { pos: [65, 6], size: [26, 32] },
        2: { pos: [118, 3], size: [23, 37] },
        3: { pos: [165, 8], size: [27, 32] }
      }, 250), 
      "skull": new Sprite({ 0: { pos: [12, 61], size: [11, 14] },
        1: { pos: [43, 61], size: [11, 14] },
        2: { pos: [86, 61], size: [11, 15] },
        3: { pos: [114, 61], size: [11, 14] }
      }, 250),  
      "green": new Sprite({ 0: { pos: [10, 93], size: [15, 13] },
        1: { pos: [46, 92], size: [16, 14] },
        2: { pos: [85, 92], size: [14, 14] },
        3: { pos: [119, 90], size: [14, 16] }
      }, 250),  
      "purple": new Sprite({ 0: { pos: [10, 128], size: [13, 15] },
        1: { pos: [35, 128], size: [8, 17] },
        2: { pos: [67, 128], size: [13, 16] },
        3: { pos: [95, 128], size: [14, 14] }
      }, 250),
      "boss": new Sprite({ 
        0: { pos: [15, 163], size: [18, 27] },
        1: { pos: [62, 158], size: [20, 27] },
        2: { pos: [107, 155], size: [19, 33] },
        3: { pos: [152, 159], size: [20, 29] }
      }, 150)
    };
  }
  
  move(x, y) {
    this.currentPos = [x, y];
    this.nextPos = [x, y];
    this.mapPos = [
      (this.sampleBoard.tileWidth * x) + ((this.sampleBoard.tileWidth - this.size[0]) / 2), 
      (this.sampleBoard.tileHeight * y) + ((this.sampleBoard.tileHeight - this.size[1]) / 2)
    ];
  }

  handleMove(currentTime, type) {
    if (this.nextPos) {
      if (this.currentPos[0] === this.nextPos[0] && this.currentPos[1] === this.nextPos[1]) return false;

      if ((currentTime - this.timeStart) >= this.delayMove[type] ) {
        this.move(this.nextPos[0], this.nextPos[1]);
        this.moving = !this.moving
      } else {
        this.getMapPos();
        this.checkDirectionAndAdjust(currentTime, type);
        this.mapPos[0] = Math.round(this.mapPos[0]);
        this.mapPos[1] = Math.round(this.mapPos[1]);
      }

      return true;
    }
  }

  getMapPos() {// 
    this.mapPos[0] = (this.currentPos[0] * this.sampleBoard.tileWidth) + ((this.sampleBoard.tileWidth - this.size[0]) / 2);
    this.mapPos[1] = (this.currentPos[1] * this.sampleBoard.tileHeight) + ((this.sampleBoard.tileHeight - this.size[1]) / 2);
  }

  checkDirectionAndAdjust(currentTime, type) {
    if (this.nextPos[0] !== this.currentPos[0]) {
      let pixelDist = (this.sampleBoard.tileWidth / this.delayMove[type]) * (currentTime - this.timeStart);

      if (this.nextPos[0] < this.currentPos[0]) {
        this.mapPos[0] += (0 - pixelDist);
      } else {
        this.mapPos[0] += (pixelDist);
      }
    } else {
      let pixelDist = (this.sampleBoard.tileHeight / this.delayMove[type]) * (currentTime - this.timeStart);

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
  

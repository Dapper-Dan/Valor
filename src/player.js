import Board from "./board";
import Sprite from "./sprite";

export default class Player {
  constructor() {
    this.currentPos = [1, 10];
    this.nextPos = [1, 10];
    this.timeStart = 0;
    this.delayMove = 100; //300 is def. boosted for map exploration rn- dan 6/9/20
    this.size = [40, 40]; 
    this.mapPos = [80, 710];
    this.sampleBoard = new Board();
    this.direction = "right";
    this.shootDir = {
      "right": [1, 0],
      "left": [-1, 0],
      "up": [0, -1],
      "down": [0, 1]
    };
    this.lastDir = "right"
    this.moving = false;
    this.ROF = 200;
    this.lastArrowFired = 0;
    
    this.sprites = {
      "up": new Sprite({ 0: { pos: [1, 84], size: [46, 43] },
                                                                   1: { pos: [57, 83], size: [46, 43] },
                                                                   2: { pos: [111, 85], size: [46, 43] }
                                                                  },
                                                                  200), 
      "right": new Sprite({ 0: { pos: [5, 160], size: [35, 43] },
                                                                     1: { pos: [40, 159], size: [40, 43] },
                                                                     2: { pos: [85, 157], size: [40, 43] }
                                                                   },
                                                                   200), 
      "down": new Sprite({ 0: { pos: [11, 220], size: [46, 40] },
                                                                    1: { pos: [81, 220], size: [46, 40] },
                                                                    2: { pos: [162, 217], size: [46, 40] }
                                                                    },
                                                                    200), 
      "left": new Sprite({ 0: { pos: [83, 15], size: [35, 42] },
                                                                    1: { pos: [46, 13], size: [36, 42] },
                                                                    2: { pos: [10, 15], size: [36, 43] }
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
    this.direction = "up"
    this.moving = true;
  }
  
  moveDown(currentGameTime) {
    this.nextPos[1] += 1;
    this.timeStart = currentGameTime;
    this.direction = "down";
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

  // moveUpLeft(currentGameTime) {
  //   this.nextPos[0] -= 1;  NEEDS WORK-ANIMATION
  //   this.nextPos[1] -= 1;
  //   this.timeStart = currentGameTime;
  //   this.direction = "upLeft"
  //   this.moving = true;
  // }

};


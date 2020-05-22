import Board from "./board";
import Sprite from "./sprite";

export default class Player {
  constructor() {
    this.currentPos = [1, 4];
    this.nextPos = [1, 4];
    this.timeStart = 0;
    this.delayMove = 800;
    this.size = [50, 50];
    this.mapPos = [95, 305];
    this.sampleBoard = new Board();
    this.direction = this.sampleBoard.directions.right
    this.sprites = {
      0: new Sprite("./src/images/toons.png", [320, 188], [40, 40]), 
      1: new Sprite("./src/images/toons.png", [320, 188], [40, 40]), 
      2: new Sprite("./src/images/toons.png", [320, 188], [40, 40]), 
      3: new Sprite("./src/images/toons.png", [314, 352], [40, 40])

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
    } else {
      this.getMapPos();
      this.checkDirectionAndAdjust(currentTime);
      this.mapPos[0] = Math.round(this.mapPos[0]);
      this.mapPos[1] = Math.round(this.mapPos[1]);
    }

    return true;
  }

  getMapPos() {
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
    this.direction = this.sampleBoard.directions.up;
  }
  
  moveDown(currentGameTime) {
    this.nextPos[1] += 1;
    this.timeStart = currentGameTime;
    this.direction = this.sampleBoard.directions.down;
  }

  moveLeft(currentGameTime) {
    this.nextPos[0] -= 1;
    this.timeStart = currentGameTime;
    this.direction = this.sampleBoard.directions.left;
  }

  moveRight(currentGameTime) {
    this.nextPos[0] += 1;
    this.timeStart = currentGameTime;
    this.direction = this.sampleBoard.directions.right;
  }

};


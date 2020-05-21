import Board from "./board";

export default class Player {
  constructor() {
    this.currentPos = [1, 1];
    this.nextPos = [1, 1];
    this.timeStart = 0;
    this.delayMove = 800;
    this.size = [40, 40];
    this.mapPos = [45, 45];
  }
  
  move(x, y) {
    let sampleBoard = new Board();
    this.currentPos = [x, y];
    this.nextPos = [x, y];
    this.mapPos = [
      (sampleBoard.tileWidth * x) + ((sampleBoard.tileWidth - this.size[0]) / 2), 
      (sampleBoard.tileHeight * y) + ((sampleBoard.tileHeight - this.size[1]) / 2)
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
    this.mapPos[0] = (this.currentPos[0] * sampleBoard.tileWidth) + ((sampleBoard.tileWidth - this.size[0]) / 2);
    this.mapPos[1] = (this.currentPos[1] * sampleBoard.tileHeight) + ((sampleBoard.tileHeight - this.size[1]) / 2);
  }

  checkDirectionAndAdjust(currentTime) {
    if (this.nextPos[0] !== this.currentPos[0]) {
      let pixelDist = (sampleBoard.tileWidth / this.delayMove) * (currentTime - this.timeStart);

      if (this.nextPos[0] < this.currentPos[0]) {
        this.mapPos[0] += (0 - pixelDist);
      } else {
        this.mapPos[0] += (pixelDist);
      }
    } else {
      let pixelDist = (sampleBoard.tileHeight / this.delayMove) * (currentTime - this.timeStart);

      if (this.nextPos[1] < this.currentPos[1]) {
        this.mapPos[1] += (0 - pixelDist);
      } else {
        this.mapPos[1] += (pixelDist);
      }
    }
  }

  //toIndex?






};


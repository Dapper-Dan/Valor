import Player from "./player";
import Monster from "./monster";
import Board from "./board";
import * as Keys from "./keys";

export default class Game {
  constructor() {
    this.board = new Board();
    this.player = new Player();
    this.keys = Keys.keysDown;
    this.currentSecond = 0;
    this.frameCount = 0;
    this.framesLastSecond = 0;
    this.lastFrameTime = 0; 
    this.drawGame = this.drawGame.bind(this)
  }

  
  drawGame() {
    let currentFrameTime = Date.now();
    let timeElapsed = currentFrameTime - this.lastFrameTime

    let sec = Math.floor(Date.now()/1000);
    if (sec !== this.currentSecond) {
      this.currentSecond = sec;
      this.framesLastSecond = this.frameCount; 
      this.frameCount = 1;
    } else {
      this.frameCount++;
    }
    
    if (!this.player.handleMove(currentFrameTime)) {
      this.checkValidMove()
      if (this.player.currentPos[0] !== this.player.nextPos[0] || this.player.currentPos[1] !== this.player.nextPos[1]) this.player.timeStart = currentFrameTime;
    }



    for (let y = 0; y < this.board.mapHeight; y++) {
      for (let x = 0; x < this.board.mapWidth; x++) {
        switch(this.board.gameMap[((y * this.board.mapWidth) + x)]) {
          case 0:
            this.board.ctx.fillStyle = "#999999";
            break;
          case 1:
            this.board.ctx.fillStyle = "#12c934";
        }

        this.board.ctx.fillRect(x * this.board.tileWidth, y * this.board.tileHeight, this.board.tileWidth, this.board.tileHeight);
      }
    }

    this.board.ctx.fillStyle = "#ff0000";
    this.board.ctx.fillRect(this.player.mapPos[0], this.player.mapPos[1], this.player.size[0], this. player.size[1]);

    this.board.ctx.fillStyle = "#ff0000";
    this.board.ctx.fillText(`FPS: ${this.framesLastSecond}`, 10, 20);
    
    this.lastFrameTime = currentFrameTime;
    requestAnimationFrame(this.drawGame);
  }

  checkValidMove() {
    if (this.keys[37] && this.player.currentPos[0] > 0 && this.board.gameMap[this.player.toIndex(this.player.currentPos[0] - 1, this.player.currentPos[1])] === 1) {
      this.player.nextPos[0] -= 1;
    } else if (this.keys[38] && this.player.currentPos[1] > 0 && this.board.gameMap[this.player.toIndex(this.player.currentPos[0], this.player.currentPos[1] - 1)]  === 1) {
      this.player.nextPos[1] -= 1;
    } else if (this.keys[39] && this.player.currentPos[0] < (this.board.mapWidth - 1) && this.board.gameMap[this.player.toIndex(this.player.currentPos[0] + 1, this.player.currentPos[1])] === 1) {
      this.player.nextPos[0] += 1;
    } else if (this.keys[40] && this.player.currentPos[1] < (this.board.mapHeight - 1) && this.board.gameMap[this.player.toIndex(this.player.currentPos[0], this.player.currentPos[1] + 1)]  === 1) {
      this.player.nextPos[1] += 1;
    }
  }


};
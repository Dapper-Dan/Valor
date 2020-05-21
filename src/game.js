import Player from "./player";
import Monster from "./monster";
import Board from "./board";

export default class Game {
  constructor() {
    this.board = new Board();
    this.currentSecond = 0;
    this.frameCount = 0;
    this.framesLastSecond = 0;
    this.drawGame = this.drawGame.bind(this)
  }

  
  drawGame() {
    let sec = Math.floor(Date.now()/1000);
    if (sec !== this.currentSecond) {
      this.currentSecond = sec;
      this.framesLastSecond = this.frameCount; 
      this.frameCount = 1;
    } else {
      this.frameCount++;
    }

    for (let y = 0; y < this.board.mapHeight; y++) {
      for (let x = 0; x < this.board.mapWidth; x++) {
        switch(this.board.gameMap[y][x]) {
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
    this.board.ctx.fillText(`FPS: ${this.framesLastSecond}`, 10, 20);
    
    requestAnimationFrame(this.drawGame);
  }

};
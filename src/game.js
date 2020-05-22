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
      this.checkValidMove(currentFrameTime)
    }

    for (let y = 0; y < this.board.mapHeight; y++) {
      for (let x = 0; x < this.board.mapWidth; x++) {
        let tile =  this.board.tileTypes[this.board.gameMap[this.player.toIndex(x, y)]];
        let tileset = new Image()
        tileset.src = tile.sprite.url
        this.board.ctx.drawImage(tileset, tile.sprite.pos[0], tile.sprite.pos[1], tile.sprite.size[0], tile.sprite.size[1], (x * this.board.tileWidth), (y * this.board.tileHeight), this.board.tileWidth, this.board.tileHeight)
      }
    }

    this.board.ctx.fillStyle = "#ff0000";
    this.board.ctx.fillRect(this.player.mapPos[0], this.player.mapPos[1], this.player.size[0], this. player.size[1]);

    this.board.ctx.fillStyle = "#ff0000";
    this.board.ctx.fillText(`FPS: ${this.framesLastSecond}`, 10, 20);
    
    this.lastFrameTime = currentFrameTime;
    requestAnimationFrame(this.drawGame);
  }

  checkValidMove(currentFrameTime) {
    if (this.keys[37] && this.player.canMoveLeft()) {
      this.player.moveLeft(currentFrameTime);
    } else if (this.keys[38] && this.player.canMoveUp()) {
      this.player.moveUp(currentFrameTime);
    } else if (this.keys[39] && this.player.canMoveRight()) {
      this.player.moveRight(currentFrameTime);
    } else if (this.keys[40] && this.player.canMoveDown()) {
      this.player.moveDown(currentFrameTime);
    }
  }

};
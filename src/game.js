import Player from "./player";
import Monster from "./monster";
import Board from "./board";

export default class Game {
  constructor() {
    this.board = new Board();
  }

  draw() {
    this.board.drawBoard()
    let player = new Player();
    player.spawn(this.board.ctx)
  }


};
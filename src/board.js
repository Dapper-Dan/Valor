export default class Board {
  constructor() {
    this.gameBoard = document.getElementById("gameBoard"); 
    this.ctx = this.gameBoard.getContext('2d');
    this.gameBoard.width = 1000;
    this.gameBoard.height = 600;
  }

  drawBoard() {
    this.ctx.fillRect(0, 0, this.gameBoard.width, this.gameBoard.height)
  }
  
};
export default class Board {
  constructor() {
    this.gameBoard = document.getElementById("gameBoard"); 
    this.ctx = this.gameBoard.getContext('2d');
    this.gameBoard.width = 1000;
    this.gameBoard.height = 600;
  }

  drawBoard() {
    let background = new Image();
    background.src = "../src/images/dung.jpg"
    background.onload = () => {
      this.ctx.drawImage(background, 0, 0); 
    }
  }

};
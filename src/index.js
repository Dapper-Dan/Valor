import Game from "./game";

document.addEventListener("DOMContentLoaded", function () {
    
    const game = new Game();
    const board = game.board;
    board.drawBoard();
    game.draw();
});
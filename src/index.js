import Game from "./game";
import Player from "./player";

document.addEventListener("DOMContentLoaded", function () {
    const game = new Game();
    requestAnimationFrame(game.drawGame);
  

});
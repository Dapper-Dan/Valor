import Game from "./game";

document.addEventListener("DOMContentLoaded", function () {
    const game = new Game();
    requestAnimationFrame(game.drawGame);

    window.addEventListener("keydown", function(e) {
      if (e.keyCode >= 37 && e.keyCode <= 40) game.keys[e.keyCode] = true;   
    });

    
    window.addEventListener("keydown", function(e) {
      if (e.keyCode === 32) game.keys[e.keyCode] = true;   
    });

    window.addEventListener("keyup", function(e) {
      if (e.keyCode >= 37 && e.keyCode <= 40) game.keys[e.keyCode] = false;   
    });


});
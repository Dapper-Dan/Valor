import Game from "./game";

document.addEventListener("DOMContentLoaded", function () {
    const game = new Game();
    
    
    window.addEventListener("keydown", function(e) {
      if (e.keyCode >= 37 && e.keyCode <= 40 || e.keyCode === 32) game.keys[e.keyCode] = true;   
    });

    
    // window.addEventListener("keydown", function(e) {
    //   if (e.keyCode === 32) game.keys[e.keyCode] = true;   
    // });

    // window.addEventListener("keyup", function(e) {
    //   if (e.keyCode === 32) game.keys[e.keyCode] = false;   
    // });

   
    window.addEventListener("keyup", function(e) {
      if (e.keyCode >= 37 && e.keyCode <= 40 || e.keyCode === 32) game.keys[e.keyCode] = false;   
    });
    

    requestAnimationFrame(game.drawGame);

});
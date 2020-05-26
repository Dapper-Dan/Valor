import Game from "./game";

window.monsterSet = new Image();
window.monsterSet.src = "./src/images/monsterSet.png";

window.arrowSet = new Image();
window.arrowSet.src = "./src/images/arrows.png";

window.tileset = new Image();
window.tileset.src = "./src/images/dungeonTiles.png"

window.toonSet = new Image();
window.toonSet.src = "./src/images/knightFrames.png"

window.bloodSet = new Image();
window.bloodSet.src = "./src/images/bloodEffects.png"



document.addEventListener("DOMContentLoaded", function () {
    const game = new Game();
    

    window.addEventListener("keydown", function(e) {
      if (e.keyCode >= 37 && e.keyCode <= 40 || e.keyCode === 32) game.keys[e.keyCode] = true;   
    });

   
    window.addEventListener("keyup", function(e) {
      if (e.keyCode >= 37 && e.keyCode <= 40 || e.keyCode === 32) game.keys[e.keyCode] = false;   
    });
    

    requestAnimationFrame(game.drawGame);

});
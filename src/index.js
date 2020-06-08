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

window.HUD = new Image();
window.HUD.src = "./src/images/HUD.png"


document.addEventListener("DOMContentLoaded", () => {
  const play = document.getElementById("play")
  play.addEventListener("click", () => { 
    document.querySelectorAll(".intro")[0].setAttribute("hidden", "true")
    
    let gameMusic = new Audio("./src/audio/Resurrections.mp3")
    gameMusic.play()
  
    const game = new Game();
    
    window.addEventListener("keydown", function(e) {
      if (e.keyCode >= 37 && e.keyCode <= 40 || e.keyCode === 32) game.keys[e.keyCode] = true;   
    });

   
    window.addEventListener("keyup", function(e) {
      if (e.keyCode >= 37 && e.keyCode <= 40 || e.keyCode === 32) game.keys[e.keyCode] = false;   
    });

    window.addEventListener("keydown", function(e) {
      if (e.keyCode === 80) game.togglePause();
    });
    
    game.board.viewPort.screen = [ game.board.gameBoard.width, game.board.gameBoard.height ]
    
    requestAnimationFrame(game.drawGame);
    

    
  })
});
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

window.scenery = new Image();
window.scenery.src = "./src/images/scenery.png"

window.ui = new Image();
window.ui.src = "./src/images/ui.png";

window.healthbar = new Image();
window.healthbar.src = "./src/images/healthbar.png";

window.healthbar2 = new Image();
window.healthbar2.src = "./src/images/healthbar2.png";

// Mobile Touch Controls
let touchStartX = 0;
let touchStartY = 0;
let lastTap = 0;

const canvas = document.querySelector('canvas');

if (canvas) {
  canvas.addEventListener('touchmove', function(e) { e.preventDefault(); }, { passive: false });
  canvas.addEventListener('touchstart', function(e) {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  }, { passive: false });

  // Handle movement while finger is down
  canvas.addEventListener('touchmove', function(e) {
    const touch = e.touches[0];
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    const swipeThreshold = 30; // px

    // Clear all movement keys
    window.game.keys[37] = false;
    window.game.keys[38] = false;
    window.game.keys[39] = false;
    window.game.keys[40] = false;

    // Detect direction and set key
    if (absDx > absDy && absDx > swipeThreshold) {
      if (dx > 0) {
        window.game.keys[39] = true;
      } else {
        window.game.keys[37] = true;
      }
    } else if (absDy > absDx && absDy > swipeThreshold) {
      if (dy > 0) {
        window.game.keys[40] = true;
      } else {
        window.game.keys[38] = true;
      }
    }
  });

  // On touchend, clear all movement keys and handle shooting
  canvas.addEventListener('touchend', function(e) {
    window.game.keys[37] = false;
    window.game.keys[38] = false;
    window.game.keys[39] = false;
    window.game.keys[40] = false;

    
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    if (tapLength < 300 && tapLength > 0) {
      window.game.keys[32] = true;
      setTimeout(() => { window.game.keys[32] = false; }, 100);
    }
    lastTap = currentTime;
  }, { passive: false });
}


document.addEventListener("DOMContentLoaded", () => {
  const play = document.getElementById("play");
  play.addEventListener("click", () => { 
    document.querySelectorAll(".intro")[0].setAttribute("hidden", "true")
    document.querySelectorAll(".landingPage")[0].style.display = "none";
    document.querySelectorAll(".intro")[0].style.display = "none";
    
    let gameMusic = new Audio("./src/audio/Resurrections.mp3");
    gameMusic.play()
    
    let muteButton = document.getElementById("mute");
    let audioButton = document.getElementById("audio");
    audioButton.hidden = false;
    gameMusic.muted = false;

    audioButton.addEventListener("click", () => {
      gameMusic.muted = !gameMusic.muted;
      muteButton.hidden = !muteButton.hidden;
      audioButton.hidden = !audioButton.hidden;
      audioButton.blur();
    })

    muteButton.addEventListener("click", () => {
      gameMusic.muted = !gameMusic.muted;
      muteButton.hidden = !muteButton.hidden;
      audioButton.hidden = !audioButton.hidden;
      muteButton.blur();
    })

    let playAgain = document.getElementById("playAgain")
    playAgain.addEventListener("click", () => {
      location.reload();
    })
    
    const game = new Game();
    window.game = game;
    
    window.addEventListener("keydown", function(e) {
      if (e.keyCode >= 37 && e.keyCode <= 40 || e.keyCode === 32) game.keys[e.keyCode] = true;   
    });

    window.addEventListener("keyup", function(e) {
      if (e.keyCode >= 37 && e.keyCode <= 40 || e.keyCode === 32) game.keys[e.keyCode] = false;   
    });

    window.addEventListener("keydown", function(e) {
      if (e.keyCode === 80) game.togglePause();
    });
    
    game.board.viewPort.screen = [ game.board.gameBoard.width, game.board.gameBoard.height ];
  
    requestAnimationFrame(game.drawGame);

  });

  const info = document.getElementById("info");
  info.addEventListener("click", () => {
    document.querySelectorAll(".enemyInfoBox")[0].style.display = "flex";
    document.querySelectorAll(".gameBackgroundInfo")[0].style.display = "flex";
  });
});


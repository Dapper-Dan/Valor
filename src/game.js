import Player from "./player";
import Monster from "./monster";
import Board from "./board";
import * as Keys from "./keys";
import Sprite from "./sprite";
import Arrow from "./arrow";

export default class Game {
  constructor() {
    this.board = new Board();
    this.player = new Player();
    this.monsters = [];
    this.arrows = [];
    this.keys = Keys.keysDown;
    this.currentSecond = 0;
    this.frameCount = 0;
    this.framesLastSecond = 0;
    this.lastFrameTime = 0; 
    this.score = 0;
    this.drawGame = this.drawGame.bind(this)
  }

  
  drawGame() {
    let currentFrameTime = Date.now();
    let timeElapsed = currentFrameTime - this.lastFrameTime

    let sec = Math.floor(Date.now()/1000);
    if (sec !== this.currentSecond) {
      this.currentSecond = sec;
      this.framesLastSecond = this.frameCount; 
      this.frameCount = 1;
    } else {
      this.frameCount++;
    }

    // let monsterSet = new Image();
    // monsterSet.src = "./src/images/monsterSet.png";

    // let arrowSet = new Image();
    // arrowSet.src = "./src/images/blueArrowFrames.png";

    // let tileset = new Image();
    //     tileset.src = "./src/images/dungeonTiles.png" //tile.sprite.url;
    
    for (let m of this.monsters) {
      if (this.enemyCollision(m)) {
        let monster = new Monster();
        this.monsters.push(monster);
        this.score += 100;
      }
    }
    

    if (this.keys[32]) {
      this.arrows.push(new Arrow(this.player.currentPos, [(this.player.currentPos[0] + this.player.shootDir[this.player.direction][0]), (this.player.currentPos[1] + this.player.shootDir[this.player.direction][1])] , this.player.mapPos, this.player.direction));
      this.keys[32] = false;
      
    }



    if (!this.player.handleMove(currentFrameTime)) {
      this.checkValidMove(currentFrameTime)
    }

    for (let y = 0; y < this.board.mapHeight; y++) {
      for (let x = 0; x < this.board.mapWidth; x++) {
        let tile =  this.board.tileTypes[this.board.gameMap[this.player.toIndex(x, y)]];
        // let tileset = new Image();
        // tileset.src = tile.sprite.url;
        this.board.ctx.drawImage(window.tileset, tile.sprite.pos[0], tile.sprite.pos[1], tile.sprite.size[0], tile.sprite.size[1], (x * this.board.tileWidth), (y * this.board.tileHeight), this.board.tileWidth, this.board.tileHeight)
      }
    }

    let spritePlayer = this.player.sprites[this.player.direction]
    // let toonSet = new Image();
    // toonSet.src = spritePlayer.url
    let totalSpriteTime = 0;

    console.log(this.monsters.length)

    for (let s in spritePlayer.frames) {
      spritePlayer.frames[s]['start'] = totalSpriteTime;
      totalSpriteTime += spritePlayer.aniTime;
      spritePlayer.frames[s]['end'] = totalSpriteTime;
    }

    spritePlayer['totalSpriteDuration'] = totalSpriteTime;
    
    let toon = this.getFrame(spritePlayer.frames, spritePlayer.totalSpriteDuration, currentFrameTime, this.player.moving)
    this.board.ctx.drawImage(window.toonSet, toon.pos[0], toon.pos[1], toon.size[0], toon.size[1], this.player.mapPos[0], this.player.mapPos[1], this.player.size[0], this.player.size[1])
  

    
    while (this.monsters.length < 6) {
      let monster = new Monster();
      this.monsters.push(monster);
    }


   
    if (this.arrows.length > 0) {
      for (let arrow of this.arrows) {
        if (!arrow.handleMove(currentFrameTime)) {
          this.arrowCheckValidMove(arrow, currentFrameTime)
        }
      }
    }

    

    
    for (let m = 0; m < this.monsters.length; m++) {
      if (!this.monsters[m].handleMove(currentFrameTime)) {
        this.monsterCheckValidMove(this.monsters[m], currentFrameTime)
      }
      let spriteMonster = this.monsters[m];
      // let monsterSet = new Image();
      // monsterSet.src = "./src/images/monsterSet.png";
      this.board.ctx.drawImage(window.monsterSet, 16, 14, 40, 40, spriteMonster.mapPos[0], spriteMonster.mapPos[1], spriteMonster.size[0], spriteMonster.size[1])
    }



    
    for(let a in this.arrows) {
      let arrowSprite = this.arrows[a];
      // let arrowSet = new Image();
      // arrowSet.src = "./src/images/blueArrowFrames.png";
      if (this.arrows.length > 0) {
        if(arrowSprite.destroyed === false) this.board.ctx.drawImage(window.arrowSet, 3, 15, 20, 20, arrowSprite.mapPos[0], arrowSprite.mapPos[1], arrowSprite.size[0], arrowSprite.size[1])
      }
    }


    for (let m in this.monsters) {
      if (!this.monsters[m].alive) this.monsters.splice(m, 1)
    }

    for (let a in this.arrows) {
      if (this.arrows[a].destroyed) this.arrows.splice(a, 1)
    }
  console.log(this.monsters)
   
  
    this.board.ctx.fillStyle = "#ff0000";
    this.board.ctx.fillText(this.player.mapPos, 10, 20)
    this.board.ctx.fillText(`FPS: ${this.framesLastSecond}`, 10, 30);
    this.board.ctx.fillText(this.player.currentPos, 10, 50);
    this.board.ctx.fillText(this.score, 10, 70);

    
    this.lastFrameTime = currentFrameTime;
    requestAnimationFrame(this.drawGame);
  }
  

  
  checkValidMove(currentFrameTime) {
    // if (this.keys[37] && this.keys[38] && this.player.canMoveLeft() && this.player.canMoveUp()) {
    //   this.player.moveUpLeft(currentFrameTime); NEEDS WORK- ANIMATION
    if (this.keys[37] && this.player.canMoveLeft()) {
      this.player.moveLeft(currentFrameTime);
    } else if (this.keys[38] && this.player.canMoveUp()) {
      this.player.moveUp(currentFrameTime);
    } else if (this.keys[39] && this.player.canMoveRight()) {
      this.player.moveRight(currentFrameTime);
    } else if (this.keys[40] && this.player.canMoveDown()) {
      this.player.moveDown(currentFrameTime);
    }
  }

  monsterCheckValidMove(monster, currentFrameTime) {
    if (monster.canMoveLeft() && (this.player.currentPos[0] < monster.currentPos[0])) {
      monster.moveLeft(currentFrameTime)
    } else if (monster.canMoveUp() && (this.player.currentPos[1] < monster.currentPos[1])) {
      monster.moveUp(currentFrameTime);
    } else if (monster.canMoveRight() && (this.player.currentPos[0] > monster.currentPos[0])) {
      monster.moveRight(currentFrameTime);
    } else if (monster.canMoveDown() && (this.player.currentPos[1] > monster.currentPos[1])) {
      monster.moveDown(currentFrameTime);
    }
  }

  arrowCheckValidMove(arrow, currentFrameTime) {
    if (arrow.direction === "right") {
      if (arrow.canMoveRight()) {
        arrow.moveRight(currentFrameTime);
      } else {
        arrow.destroyed = true;
      }
    } else if (arrow.direction === "left") {
      if (arrow.canMoveLeft()) {
        arrow.moveLeft(currentFrameTime);
      } else {
        arrow.destroyed = true;
      }
    } else if (arrow.direction === "up") {
      if (arrow.canMoveUp()) {
        arrow.moveUp(currentFrameTime);
      } else {
        arrow.destroyed = true;
      }
    } else if (arrow.direction === "down") {
      if (arrow.canMoveDown()) {
        arrow.moveDown(currentFrameTime);
      } else {
        arrow.destroyed = true;
      }
    }
  }

  getFrame(sprites, duration, time, moving) {
    if (!moving) return sprites[0]
    time = time % duration;
    for (let i in sprites) {
      if (sprites[i].end >= time) return sprites[i];
    }
  }

  enemyCollision(monster) {
      for (let arrow of this.arrows) {

        if (JSON.stringify(arrow.currentPos) === JSON.stringify(monster.currentPos) && monster.alive) {
          monster.alive = false;
          arrow.destroyed = true;
          return true;
        }
        
      }
  }
  

};
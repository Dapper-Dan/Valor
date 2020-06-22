import Player from "./player";
import Monster from "./monster";
import Board from "./board";
import * as Keys from "./keys";
import Tile from "./tile";
import Arrow from "./arrow";
import Sprite from "./sprite";
import SFXSprite from "./sfxSprite";
import Scenery from "./scenery";
import findPath from "./pathfinder";


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
    this.phase = 0;
    this.totalTime = 0
    this.drawGame = this.drawGame.bind(this)
    this.paused = false;
    this.scenery = new Scenery()
    this.gameOver = false;
    
   
    
    
  }


  drawGame() {
    let currentFrameTime = Date.now();
    let timeElapsed = currentFrameTime - this.lastFrameTime
    let viewPort = this.board.viewPort

    let seconds = Math.floor((this.totalTime / 60) % 60)
    let minutes = Math.floor((Math.floor(this.totalTime / 60)) / 60)
    
    let sec = Math.floor(Date.now()/1000);
    if (sec !== this.currentSecond) {
      this.currentSecond = sec;
      this.framesLastSecond = this.frameCount; 
      this.frameCount = 1;
    } else {
      this.frameCount++;
      this.totalTime ++;
    }

   
    
    let redPossibleSpawns = {
      0: { pos: [18, 12] },
      1: { pos: [7, 8] },
      2: { pos: [1, 7]},
    }

    let redSpawnMax = 3

    // switch (this.phase) {
    //   case 1:
    //     redSpawnMax = 4;
    //     break;
    //   case 2: 
    //     redSpawnMax = 6;
    //     break;
    //   case 3: 
    //     redSpawnMax = 8;
    //   default: 
    //     redSpawnMax = 2;
    // }

    while (this.monsters.length < redSpawnMax) {
      let num = Math.floor(Math.random() * 3); 
      let monster = new Monster();
      monster.nextPos = redPossibleSpawns[num].pos
      this.monsters.push(monster);
    }

    
    for (let m of this.monsters) {
      if (this.enemyCollision(m)) {

        let num = Math.floor(Math.random() * 3); 
        let monster = new Monster();
        monster.nextPos = redPossibleSpawns[num].pos
        this.monsters.push(monster);
        this.score += 10;
      }
    }
    

    if (this.keys[32] && (currentFrameTime - this.player.lastArrowFired) > this.player.ROF) {
      this.arrows.push(new Arrow(this.player.currentPos, [(this.player.currentPos[0] + this.player.shootDir[this.player.direction][0]), (this.player.currentPos[1] + this.player.shootDir[this.player.direction][1])] , this.player.mapPos, this.player.direction));
      this.player.lastArrowFired = currentFrameTime
      this.keys[32] = false;
      
    }



    if (!this.player.handleMove(currentFrameTime)) {
      this.checkValidMove(currentFrameTime)
    }
    
    viewPort.update(this.player.mapPos[0] + (this.player.size[0] / 2), this.player.mapPos[1] + (this.player.size[1] / 2))
    this.board.ctx.fillStyle = "#000000"

    
    this.board.ctx.fillRect(0, 0, viewPort.screen[0], viewPort.screen[1]) 
    for (let y = viewPort.startTile[1]; y < viewPort.endTile[1]; y++) {
      for (let x = viewPort.startTile[0]; x < viewPort.endTile[0]; x++) {
        let tile =  this.board.tileTypes[this.board.gameMap[this.player.toIndex(x, y)]];
        this.board.ctx.drawImage(window.tileset, tile.sprite.pos[0], tile.sprite.pos[1], tile.sprite.size[0], tile.sprite.size[1], (viewPort.offset[0] + (x * this.board.tileWidth)), (viewPort.offset[1] + (y * this.board.tileHeight)), this.board.tileWidth, this.board.tileHeight)
      }
    }

    let spritePlayer = this.player.sprites[this.player.direction]
    let totalSpriteTime = 0;
    this.scenery.drawScenery(this.board.ctx, totalSpriteTime, currentFrameTime, viewPort)
    this.scenery.drawTallCandle(this.board.ctx, totalSpriteTime, currentFrameTime, viewPort)
    this.scenery.drawLava(this.board.ctx, totalSpriteTime, currentFrameTime, viewPort)

    this.drawMonsters(this.board.ctx, totalSpriteTime, currentFrameTime, viewPort, this.monsters, totalSpriteTime)
    

    for (let s in spritePlayer.frames) {
      spritePlayer.frames[s]['start'] = totalSpriteTime;
      totalSpriteTime += spritePlayer.aniTime;
      spritePlayer.frames[s]['end'] = totalSpriteTime;
    }

    spritePlayer['totalSpriteDuration'] = totalSpriteTime;
    
    let toon = this.getFrame(spritePlayer.frames, spritePlayer.totalSpriteDuration, currentFrameTime, this.player.moving)
    this.board.ctx.drawImage(window.toonSet, toon.pos[0], toon.pos[1], toon.size[0], toon.size[1], (viewPort.offset[0] + this.player.mapPos[0]), (viewPort.offset[1] + this.player.mapPos[1]), this.player.size[0], this.player.size[1])
  



    switch(this.totalTime / 100) {
      case 10:
        this.phase = 1;
        break;
      case 25:
        this.phase = 2;
        break;
      case 45:
        this.phase = 3;
        break;
    }

  
    // this.scenery.drawScenery(this.board.ctx, totalSpriteTime, currentFrameTime, viewPort)
    
    if (this.arrows.length > 0) {
      for (let arrow of this.arrows) {
        if (!arrow.handleMove(currentFrameTime)) {
          this.arrowCheckValidMove(arrow, currentFrameTime)
        }
      }
    }

   
    
    for(let a in this.arrows) {
      let arrowSprite = this.arrows[a];
      let arrowSpriteDir = arrowSprite.sprites[arrowSprite.direction].frames[0]
      
      if (this.arrows.length > 0) {
        if(arrowSprite.destroyed === false) this.board.ctx.drawImage(window.arrowSet, arrowSpriteDir.pos[0], arrowSpriteDir.pos[1], arrowSpriteDir.size[0], arrowSpriteDir.size[1], viewPort.offset[0] + arrowSprite.mapPos[0], viewPort.offset[1] + arrowSprite.mapPos[1], arrowSpriteDir.size[0], arrowSpriteDir.size[1])
      }
    }


    for (let m in this.monsters) {
      if (!this.monsters[m].alive) {
        let bloodEffect = new SFXSprite()
        for (let b in bloodEffect.frames) {
          bloodEffect.frames[b]['start'] = totalSpriteTime;
          totalSpriteTime += bloodEffect.aniTime;
          bloodEffect.frames[b]['end'] = totalSpriteTime;
        }
        
        bloodEffect['totalSpriteDuration'] = totalSpriteTime;
        let blood = this.getFrame(bloodEffect.frames, bloodEffect.totalSpriteDuration, currentFrameTime, true)
        
        // let deadMonsterCoord = this.monsters[m].
        this.board.ctx.drawImage(window.bloodSet, blood.pos[0], blood.pos[1], blood.size[0], blood.size[1], viewPort.offset[0] + this.monsters[m].mapPos[0], viewPort.offset[1] + this.monsters[m].mapPos[1], 150, 150)
        
        this.monsters.splice(m, 1)
      }
    }

    for (let m in this.monsters) {
      if (this.monsters[m].currentPos[0] === this.player.currentPos[0] &&  this.monsters[m].currentPos[1] === this.player.currentPos[1]) this.gameOver = true;
    }

    for (let a in this.arrows) {
      if (this.arrows[a].destroyed) this.arrows.splice(a, 1)
    }

   
  
    // this.scenery.drawScenery(this.board.ctx, totalSpriteTime, currentFrameTime, viewPort)
    this.board.ctx.drawImage(window.HUD, 175, 257, 135, 205, 10, 50, 200, 205)
    this.board.ctx.drawImage(window.logo, 331, 205, 810, 371, 5, 5, 200, 50)

    this.board.ctx.fillStyle = '#ff0000'
    this.board.ctx.fillText(this.player.mapPos, 10, 600)
    this.board.ctx.fillText(`FPS: ${this.framesLastSecond}`, 10, 700);
    this.board.ctx.fillText(this.player.currentPos, 10, 500);


    this.board.ctx.font = "40px Ancient";
    this.board.ctx.fillStyle = "#000000";
    if (this.score < 100) {
      this.board.ctx.fillText(this.score, 94, 130);
    } else {
      this.board.ctx.fillText(this.score, 80, 130);
    }
    this.board.ctx.font = "19px Ancient";
    this.board.ctx.fillText(`${minutes} minute(s) ${seconds} seconds`, 36, 168);
    
    
    this.lastFrameTime = currentFrameTime;

    
    if (this.gameOver) {
      this.reset()
    }

    

    if (!this.paused && !this.gameOver) {
      requestAnimationFrame(this.drawGame);
    }


    
  
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
    

    // viewPort.update(this.player.mapPos[0] + (this.player.size[0] / 2), this.player.mapPos[1] + (this.player.size[1] / 2))
  }

  monsterCheckValidMove(monster, currentFrameTime, monstersArray) {

  monster.nextPos = findPath(this.board.gameMap, monster.currentPos, this.player.currentPos, monstersArray)[1]
  monster.timeStart = currentFrameTime
  monster.moving =  true;

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

  togglePause() {
    if (!this.paused) {
      this.paused = true;
      this.drawGame()
    } else {
      this.paused= false;
      this.drawGame()
    }
  }

  reset() {
    let playAgain = document.getElementById("playAgain")
    playAgain.hidden = !playAgain.hidden;
   
  }

  drawMonsters(ctx, totalSpriteTime, currentFrameTime, viewPort, mon) {
    for (let m = 0; m < this.monsters.length; m++) {
      if (!this.monsters[m].handleMove(currentFrameTime)) {
        this.monsterCheckValidMove(this.monsters[m], currentFrameTime, this.monsters)
      }
      let spriteMonster = this.monsters[m].sprites[this.monsters[m].direction];

      for (let sm in spriteMonster.frames) {
        spriteMonster.frames[sm]['start'] = totalSpriteTime;
        totalSpriteTime += spriteMonster.aniTime;
        spriteMonster.frames[sm]['end'] = totalSpriteTime;
      }

      spriteMonster['totalSpriteDuration'] = totalSpriteTime;
      let monsterToon = this.getFrame(spriteMonster.frames, spriteMonster.totalSpriteDuration, currentFrameTime, this.monsters[m].moving)
      ctx.drawImage(window.monsterSet, monsterToon.pos[0], monsterToon.pos[1], monsterToon.size[0], monsterToon.size[1], viewPort.offset[0] + this.monsters[m].mapPos[0], viewPort.offset[1] + this.monsters[m].mapPos[1], this.monsters[m].size[0] / 1.4, this.monsters[m].size[1] / 1.4)
    }

  }



};
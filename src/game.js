import Player from "./player";
import Monster from "./monster";
import Board from "./board";
import * as Keys from "./keys";
import Sprite from "./sprite";
import Arrow from "./arrow";
import MonsterSprite from "./monster_sprite";

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



    let possibleSpawns = {
      0: { pos: [16, 2] },
      1: { pos: [6, 7] },
      2: { pos: [5, 6] },
      3: { pos: [13, 7]},
      4: { pos: [4, 3]},
      5: { pos: [1, 7]},
      6: { pos: [18, 3]},
      7: { pos: [18, 5]},
    }
    
    for (let m of this.monsters) {
      if (this.enemyCollision(m)) {
        let num = Math.floor(Math.random() * 8); 
        let monster = new Monster();
        monster.nextPos = possibleSpawns[num].pos
        this.monsters.push(monster);
        this.score += 100;
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

    for (let y = 0; y < this.board.mapHeight; y++) {
      for (let x = 0; x < this.board.mapWidth; x++) {
        let tile =  this.board.tileTypes[this.board.gameMap[this.player.toIndex(x, y)]];
        this.board.ctx.drawImage(window.tileset, tile.sprite.pos[0], tile.sprite.pos[1], tile.sprite.size[0], tile.sprite.size[1], (x * this.board.tileWidth), (y * this.board.tileHeight), this.board.tileWidth, this.board.tileHeight)
      }
    }
////////////////////////////////////////////////////////
    let spritePlayer = this.player.sprites[this.player.direction]
    let totalSpriteTime = 0;

    

    for (let s in spritePlayer.frames) {
      spritePlayer.frames[s]['start'] = totalSpriteTime;
      totalSpriteTime += spritePlayer.aniTime;
      spritePlayer.frames[s]['end'] = totalSpriteTime;
    }

    spritePlayer['totalSpriteDuration'] = totalSpriteTime;
    
    let toon = this.getFrame(spritePlayer.frames, spritePlayer.totalSpriteDuration, currentFrameTime, this.player.moving)
    this.board.ctx.drawImage(window.toonSet, toon.pos[0], toon.pos[1], toon.size[0], toon.size[1], this.player.mapPos[0], this.player.mapPos[1], this.player.size[0], this.player.size[1])
  /////////////////////////////////////////////////////////////////

    
    while (this.monsters.length < 1) {
      let num = Math.floor(Math.random() * 8);
      let monster = new Monster();
      monster.nextPos = possibleSpawns[num].pos
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
      let spriteMonster = this.monsters[m].sprites[this.monsters[m].direction];

      for (let sm in spriteMonster.frames) {
        spriteMonster.frames[sm]['start'] = totalSpriteTime;
        totalSpriteTime += spriteMonster.aniTime;
        spriteMonster.frames[sm]['end'] = totalSpriteTime;
      }

      spriteMonster['totalSpriteDuration'] = totalSpriteTime;
      let monsterToon = this.getFrame(spriteMonster.frames, spriteMonster.totalSpriteDuration, currentFrameTime, this.monsters[m].moving)
      this.board.ctx.drawImage(window.monsterSet, monsterToon.pos[0], monsterToon.pos[1], monsterToon.size[0], monsterToon.size[1], this.monsters[m].mapPos[0], this.monsters[m].mapPos[1], this.monsters[m].size[0], this.monsters[m].size[1])
    }



    
    for(let a in this.arrows) {
      let arrowSprite = this.arrows[a];
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
    } else if ((this.player.currentPos[1] < monster.currentPos[1] || this.player.currentPos[1] === monster.currentPos[1]) && (!monster.canMoveLeft() || !monster.canMoveRight())) {
      if (!monster.canMoveDown()) {
        monster.moveUp(currentFrameTime);
      } else if (!monster.canMoveUp()) {
        monster.moveDown(currentFrameTime)
      }
    } else if ((this.player.currentPos[1] > monster.currentPos[1] || this.player.currentPos[1] === monster.currentPos[1]) && (!monster.canMoveLeft() || !monster.canMoveRight())) {
      if (monster.canMoveUp()) {
        monster.moveUp(currentFrameTime);
      } else if (monster.canMoveDown()) {
        monster.moveDown(currentFrameTime)
      }
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
import Player from "./player";
import Monster from "./monster";
import Board from "./board";
import * as Keys from "./keys";
import Arrow from "./arrow";
import SFXSprite from "./sfxSprite";
import Scenery from "./scenery";
import findPath from "./pathfinder";

export default class Game {
  constructor() {
    this.board = new Board();
    this.player = new Player();
    this.redMonsters = [];
    this.skullMonsters = [];
    this.greenMonsters = [];
    this.purpleMonsters = [];
    this.bossMonster = new Monster();
    this.arrows = [];
    this.keys = Keys.keysDown;
    this.currentSecond = 0;
    this.frameCount = 0;
    this.framesLastSecond = 0;
    this.lastFrameTime = 0; 
    this.score = 0;
    this.phase = 0;
    this.totalTime = 0;
    this.bossDeathTime = 0;
    this.bossSpawnTime = 2500;
    this.purpleDeathTime = 0;
    this.purpleSpawnTime = 300;
    this.holyStartTime = 0;
    this.holyEndTime = 2500;
    this.drawGame = this.drawGame.bind(this);
    this.paused = false;
    this.scenery = new Scenery();
    this.gameOver = false;
    this.skullPossibleSpawns = {
      0: { pos: [12, 3], taken: false },
      1: { pos: [22, 4], taken: false },
      2: { pos: [20, 27], taken: false }
    };
    this.greenPossibleSpawns = {
      0: { pos: [26, 8], taken: false },
      1: { pos: [29, 10], taken: false },
      2: { pos: [26, 14], taken: false },
      3: { pos: [30, 16], taken: false }
    };
    this.purplePossibleSpawns = {
      0: { pos: [34, 15], taken: false },
      1: { pos: [10, 20], taken: false },
      2: { pos: [2, 29], taken: false },
      3: { pos: [32, 25], taken: false },
      4: { pos: [23, 20], taken: false },
      5: { pos: [24, 1], taken: false },
      6: { pos: [4, 21], taken: false },
      7: { pos: [2, 22], taken: false }
    }

  }

  drawGame() {
    let currentFrameTime = Date.now();
    let viewPort = this.board.viewPort;
    let seconds = Math.floor((this.totalTime / 60) % 60);
    let minutes = Math.floor((Math.floor(this.totalTime / 60)) / 60);

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

    let redSpawnMax = 3;

    switch (this.phase) {
      case 1:
        redSpawnMax = 5;
        break;
      case 2: 
        redSpawnMax = 6;
        break;
      case 3: 
        redSpawnMax = 8;
      default: 
        redSpawnMax = 2;
    }

    let skullSpawnMax = 3;
    let greenSpawnMax = 3;
    let purpleSpawnMax = 8;

    while (this.skullMonsters.length < skullSpawnMax) {
      let monster = new Monster();
      for (let i = 0; i < Object.keys(this.skullPossibleSpawns).length; i ++) {
        if (!this.skullPossibleSpawns[i].taken) {
          monster.nextPos = this.skullPossibleSpawns[i].pos;
          monster.spawnNum = i;
          this.skullMonsters.push(monster);
          this.skullPossibleSpawns[i].taken = true;
          break
        }
      }
    }

    for (let mon of this.skullMonsters) {
      if (this.enemyCollision(mon)) {
        this.score += 10;
        this.skullPossibleSpawns[mon.spawnNum].taken = false;
        let monster = new Monster();
        for (let i = 0; i < Object.keys(this.skullPossibleSpawns).length; i ++) {
          if (!this.skullPossibleSpawns[i].taken) {
            monster.nextPos = this.skullPossibleSpawns[i].pos;
            monster.spawnNum = i;
            this.skullMonsters.push(monster);
            this.skullPossibleSpawns[i].taken = true;
            break
          }
        }
      }
    }
    
    while (this.redMonsters.length < redSpawnMax) {
      let num = Math.floor(Math.random() * 3); 
      let monster = new Monster();
      monster.nextPos = redPossibleSpawns[num].pos
      this.redMonsters.push(monster);
    }

    
    for (let mon of this.redMonsters) {
      if (this.enemyCollision(mon)) {
        let num = Math.floor(Math.random() * 3); 
        let monster = new Monster();
        monster.nextPos = redPossibleSpawns[num].pos
        this.redMonsters.push(monster);
        this.score += 10;
      }
    }
    

    
    while (this.greenMonsters.length < greenSpawnMax) { 
      let monster = new Monster();
      for (let i = 0; i < Object.keys(this.greenPossibleSpawns).length; i ++) {
        if (!this.greenPossibleSpawns[i].taken) {
          monster.nextPos = this.greenPossibleSpawns[i].pos;
          monster.guardPoint = this.greenPossibleSpawns[i].pos;
          monster.spawnNum = i;
          this.greenMonsters.push(monster);
          this.greenPossibleSpawns[i].taken = true;
          break
        }
      }
    }

    for (let mon of this.greenMonsters) {
      if (this.enemyCollision(mon)) {
        this.score += 10;
        this.greenPossibleSpawns[mon.spawnNum].taken = false;
        let monster = new Monster();
        for (let i = 0; i < Object.keys(this.greenPossibleSpawns).length; i ++) {
          if (!this.greenPossibleSpawns[i].taken) {
            monster.nextPos = this.greenPossibleSpawns[i].pos;
            monster.guardPoint = this.greenPossibleSpawns[i].pos;
            monster.spawnNum = i;
            this.greenMonsters.push(monster);
            this.greenPossibleSpawns[i].taken = true;
            break
          }
        }
      }
    }

    while (this.purpleMonsters.length < purpleSpawnMax) {
      let monster = new Monster();
      for (let i = 0; i < Object.keys(this.purplePossibleSpawns).length; i ++) {
        if (!this.purplePossibleSpawns[i].taken) {
          monster.nextPos = this.purplePossibleSpawns[i].pos;
          monster.spawnNum = i;
          this.purpleMonsters.push(monster);
          this.purplePossibleSpawns[i].taken = true;
          break
        }
      }
    }

    for (let mon of this.purpleMonsters) {
      if (this.enemyCollision(mon)) {
        this.score += 10;
        this.purplePossibleSpawns[mon.spawnNum].taken = false;
        let monster = new Monster();
        for (let i = 0; i < Object.keys(this.purplePossibleSpawns).length; i ++) {
          if (!this.purplePossibleSpawns[i].taken) {
            monster.nextPos = this.purplePossibleSpawns[i].pos;
            monster.spawnNum = i;
            this.purpleMonsters.push(monster);
            this.purplePossibleSpawns[i].taken = true;
            break
          }
        }
      }
    }

    if (this.bossMonster === null && this.bossDeathTime === this.bossSpawnTime) {
      this.bossMonster = new Monster();
      this.bossMonster.nextPos = [17, 22];
      this.bossMonster.guardPoint = [17, 22];
    } else if (this.bossMonster === null && this.bossDeathTime !== this.bossSpawnTime) {
      this.bossDeathTime += 1;
    }

    if (this.bossMonster !== null && this.enemyCollision(this.bossMonster)) this.score += 100;
   
    if (this.keys[32] && (currentFrameTime - this.player.lastArrowFired) > this.player.ROF) {
      this.arrows.push(new Arrow(this.player.currentPos, [(this.player.currentPos[0] + this.player.shootDir[this.player.direction][0]), (this.player.currentPos[1] + this.player.shootDir[this.player.direction][1])] , this.player.mapPos, this.player.direction));
      this.player.lastArrowFired = currentFrameTime;
      this.keys[32] = false;
    }

    if (JSON.stringify(this.player.mapPos) === JSON.stringify([1275, 1485])) this.player.holy = true;

    if (this.player.holy && this.holyStartTime !== this.holyEndTime) {
      this.player.ROF = 150;
      this.player.delayMove = 100;
      this.holyStartTime += 1;
    } else if (this.player.holy && this.holyStartTime === this.holyEndTime) {
      this.player.holy = false;
      this.holyStartTime = 0;
      this.player.ROF = 400;
      this.player.delayMove = 300;
    }

    if (!this.player.handleMove(currentFrameTime)) {
      this.checkValidMove(currentFrameTime)
    }
    
    viewPort.update(this.player.mapPos[0] + (this.player.size[0] / 2), this.player.mapPos[1] + (this.player.size[1] / 2))
    this.board.ctx.fillStyle = "#000000";

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
    if (!this.player.holy) this.scenery.drawPotion(this.board.ctx, totalSpriteTime, currentFrameTime, viewPort)

    this.drawRedMonsters(this.board.ctx, totalSpriteTime, currentFrameTime, viewPort, this.redMonsters, totalSpriteTime)
    this.drawSkullMonsters(this.board.ctx, totalSpriteTime, currentFrameTime, viewPort, this.skullMonsters, totalSpriteTime)
    this.drawGreenMonsters(this.board.ctx, totalSpriteTime, currentFrameTime, viewPort, this.greenMonsters, totalSpriteTime)
    this.drawPurpleMonsters(this.board.ctx, totalSpriteTime, currentFrameTime, viewPort, this.greenMonsters, totalSpriteTime)
    this.drawBossMonster(this.board.ctx, totalSpriteTime, currentFrameTime, viewPort, this.greenMonsters, totalSpriteTime)
    
    for (let s in spritePlayer.frames) {
      spritePlayer.frames[s]['start'] = totalSpriteTime;
      totalSpriteTime += spritePlayer.aniTime;
      spritePlayer.frames[s]['end'] = totalSpriteTime;
    }

    spritePlayer['totalSpriteDuration'] = totalSpriteTime;
    let toon = this.getFrame(spritePlayer.frames, spritePlayer.totalSpriteDuration, currentFrameTime, this.player.moving);
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

    if (this.arrows.length > 0) {
      for (let arrow of this.arrows) {
        if (!arrow.handleMove(currentFrameTime)) {
          this.arrowCheckValidMove(arrow, currentFrameTime)
        }
      }
    }

    for(let a in this.arrows) {
      let arrowSprite = this.arrows[a];
      let arrowSpriteDir = arrowSprite.sprites[arrowSprite.direction].frames[0];
      if (this.arrows.length > 0 && arrowSprite.destroyed === false) {
        this.board.ctx.drawImage(window.arrowSet, arrowSpriteDir.pos[0], arrowSpriteDir.pos[1], arrowSpriteDir.size[0], arrowSpriteDir.size[1], viewPort.offset[0] + arrowSprite.mapPos[0], viewPort.offset[1] + arrowSprite.mapPos[1], arrowSpriteDir.size[0], arrowSpriteDir.size[1])
      }
    }

    for (let m in this.redMonsters) {
      if (!this.redMonsters[m].alive) {
        let bloodEffect = new SFXSprite();
        for (let b in bloodEffect.frames) {
          bloodEffect.frames[b]['start'] = totalSpriteTime;
          totalSpriteTime += bloodEffect.aniTime;
          bloodEffect.frames[b]['end'] = totalSpriteTime;
        }
        bloodEffect['totalSpriteDuration'] = totalSpriteTime;
        let blood = this.getFrame(bloodEffect.frames, bloodEffect.totalSpriteDuration, currentFrameTime, true);
        this.board.ctx.drawImage(window.bloodSet, blood.pos[0], blood.pos[1], blood.size[0], blood.size[1], viewPort.offset[0] + this.redMonsters[m].mapPos[0], viewPort.offset[1] + this.redMonsters[m].mapPos[1], 150, 150)
        this.redMonsters.splice(m, 1)
      }
    }

    for (let m in this.skullMonsters) {
      if (!this.skullMonsters[m].alive) {
        let bloodEffect = new SFXSprite();
        for (let b in bloodEffect.frames) {
          bloodEffect.frames[b]['start'] = totalSpriteTime;
          totalSpriteTime += bloodEffect.aniTime;
          bloodEffect.frames[b]['end'] = totalSpriteTime;
        }
        bloodEffect['totalSpriteDuration'] = totalSpriteTime;
        let blood = this.getFrame(bloodEffect.frames, bloodEffect.totalSpriteDuration, currentFrameTime, true);
        this.board.ctx.drawImage(window.bloodSet, blood.pos[0], blood.pos[1], blood.size[0], blood.size[1], viewPort.offset[0] + this.skullMonsters[m].mapPos[0], viewPort.offset[1] + this.skullMonsters[m].mapPos[1], 150, 150)
        this.skullMonsters.splice(m, 1)
      }
    }

    for (let m in this.greenMonsters) {
      if (!this.greenMonsters[m].alive) {
        let bloodEffect = new SFXSprite();
        for (let b in bloodEffect.frames) {
          bloodEffect.frames[b]['start'] = totalSpriteTime;
          totalSpriteTime += bloodEffect.aniTime;
          bloodEffect.frames[b]['end'] = totalSpriteTime;
        }
        bloodEffect['totalSpriteDuration'] = totalSpriteTime;
        let blood = this.getFrame(bloodEffect.frames, bloodEffect.totalSpriteDuration, currentFrameTime, true);
        this.board.ctx.drawImage(window.bloodSet, blood.pos[0], blood.pos[1], blood.size[0], blood.size[1], viewPort.offset[0] + this.greenMonsters[m].mapPos[0], viewPort.offset[1] + this.greenMonsters[m].mapPos[1], 150, 150)
        this.greenMonsters.splice(m, 1)
      }
    }

    for (let m in this.purpleMonsters) {
      if (!this.purpleMonsters[m].alive) {
        let bloodEffect = new SFXSprite();
        for (let b in bloodEffect.frames) {
          bloodEffect.frames[b]['start'] = totalSpriteTime;
          totalSpriteTime += bloodEffect.aniTime;
          bloodEffect.frames[b]['end'] = totalSpriteTime;
        }
        bloodEffect['totalSpriteDuration'] = totalSpriteTime;
        let blood = this.getFrame(bloodEffect.frames, bloodEffect.totalSpriteDuration, currentFrameTime, true);
        this.board.ctx.drawImage(window.bloodSet, blood.pos[0], blood.pos[1], blood.size[0], blood.size[1], viewPort.offset[0] + this.purpleMonsters[m].mapPos[0], viewPort.offset[1] + this.purpleMonsters[m].mapPos[1], 150, 150)
        this.purpleMonsters.splice(m, 1)
      }
    }

    if (this.bossMonster !== null) {
    if (!this.bossMonster.alive) {
      let bloodEffect = new SFXSprite();
      for (let b in bloodEffect.frames) {
        bloodEffect.frames[b]['start'] = totalSpriteTime;
        totalSpriteTime += bloodEffect.aniTime;
        bloodEffect.frames[b]['end'] = totalSpriteTime;
      }
      bloodEffect['totalSpriteDuration'] = totalSpriteTime;
      let blood = this.getFrame(bloodEffect.frames, bloodEffect.totalSpriteDuration, currentFrameTime, true);
      this.board.ctx.drawImage(window.bloodSet, blood.pos[0], blood.pos[1], blood.size[0], blood.size[1], viewPort.offset[0] + this.bossMonster.mapPos[0], viewPort.offset[1] + this.bossMonster.mapPos[1], 150, 150)
      this.bossMonster = null
      this.bossDeathTime = 0
    }
   }

    for (let m in this.redMonsters) {
      if (this.redMonsters[m].currentPos[0] === this.player.currentPos[0] &&  this.redMonsters[m].currentPos[1] === this.player.currentPos[1]) this.gameOver = true;
    }

    for (let m in this.greenMonsters) {
      if (this.greenMonsters[m].currentPos[0] === this.player.currentPos[0] &&  this.greenMonsters[m].currentPos[1] === this.player.currentPos[1]) this.gameOver = true;
    }

    for (let m in this.purpleMonsters) {
      if (this.purpleMonsters[m].currentPos[0] === this.player.currentPos[0] &&  this.purpleMonsters[m].currentPos[1] === this.player.currentPos[1]) this.gameOver = true;
    }

    for (let m in this.skullMonsters) {
      if (this.skullMonsters[m].currentPos[0] === this.player.currentPos[0] &&  this.skullMonsters[m].currentPos[1] === this.player.currentPos[1]) this.gameOver = true;
    }

    if (this.bossMonster !== null) {
    if (this.bossMonster.currentPos[0] === this.player.currentPos[0] &&  this.bossMonster.currentPos[1] === this.player.currentPos[1]) this.gameOver = true;
    }

    for (let a in this.arrows) {
      if (this.arrows[a].destroyed) this.arrows.splice(a, 1)
    }

    this.board.ctx.drawImage(window.HUD, 175, 257, 135, 205, 10, 50, 200, 205)
    this.board.ctx.drawImage(window.logo, 331, 205, 810, 371, 5, 5, 200, 50)
    this.board.ctx.fillStyle = '#ff0000';
    this.board.ctx.fillText(this.player.mapPos, 10, 600)
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

  monsterSeekerCheckValidMove(monster, currentFrameTime) {
    monster.nextPos = findPath(this.board.gameMap, monster.currentPos, this.player.currentPos)[1];
    monster.timeStart = currentFrameTime;
    monster.moving =  true;
  }

  monsterLinearCheckValidMove(monster, currentFrameTime) {
    if (monster.direction === "right" ) {
      if (monster.canMoveRight()) {
        monster.moveRight(currentFrameTime)
      } else {
        monster.moveLeft(currentFrameTime)
      }
    } else {
      if (monster.canMoveLeft()) {
        monster.moveLeft(currentFrameTime)
      } else {
        monster.moveRight()
      }
    }
    monster.timeStart = currentFrameTime;
    monster.moving =  true;
  }

  monsterProximityCheckValidMove(monster, radius) {
    for (let i = 1; i < radius; i ++) {
      if (JSON.stringify(this.player.currentPos) === JSON.stringify([monster.currentPos[0] + i, monster.currentPos[1] ]) || JSON.stringify(this.player.currentPos) === JSON.stringify([monster.currentPos[0], monster.currentPos[1] + i ]) ) {
        return true
      } else if (JSON.stringify(this.player.currentPos) === JSON.stringify([monster.currentPos[0] - i, monster.currentPos[1] ]) || JSON.stringify(this.player.currentPos) === JSON.stringify([monster.currentPos[0], monster.currentPos[1] - i ])) {
        return true;
      }

      for (let j = 1; j < radius; j ++) {
        if (JSON.stringify(this.player.currentPos) === JSON.stringify([monster.currentPos[0] + i, monster.currentPos[1] + j ]) || JSON.stringify(this.player.currentPos) === JSON.stringify([monster.currentPos[0] + j, monster.currentPos[1] + i ]) ) {
          return true
        } else if (JSON.stringify(this.player.currentPos) === JSON.stringify([monster.currentPos[0] - i, monster.currentPos[1] - j ]) || JSON.stringify(this.player.currentPos) === JSON.stringify([monster.currentPos[0] - j, monster.currentPos[1] - i ])) {
          return true;
        } else if (JSON.stringify(this.player.currentPos) === JSON.stringify([monster.currentPos[0] + i, monster.currentPos[1] - j ]) || JSON.stringify(this.player.currentPos) === JSON.stringify([monster.currentPos[0] - j, monster.currentPos[1] + i ])) {
          return true;
        }
      }
    }
  }

  monsterDineRoomCheckValidMove() {
    if ((this.player.currentPos[1] >= 6 && this.player.currentPos[1] <= 16) && (this.player.currentPos[0] >= 25 && this.player.currentPos[0] <= 30)) {
      return true;
    }
  }

  monsterTreasureRoomCheckValidMove() {
    if ((this.player.currentPos[1] >= 20 && this.player.currentPos[1] <= 26) && (this.player.currentPos[0] >= 13 && this.player.currentPos[0] <= 18)) {
      return true;
    }
  }

  randomCheckValidMove(monster, currentFrameTime){
    let dirs = {
      "left": function() {
        if (monster.canMoveLeft()) {
          monster.moveLeft(currentFrameTime)
        } else {
          monster.direction = randomDirs[Math.floor(Math.random() * 4)]
        }
      },
      "right": function() {
        if (monster.canMoveRight()) {
          monster.moveRight(currentFrameTime)
        } else {
          monster.direction = randomDirs[Math.floor(Math.random() * 4)]
        }
      },
      "up": function() {
        if (monster.canMoveUp()) {
          monster.moveUp(currentFrameTime)
        } else {
          monster.direction = randomDirs[Math.floor(Math.random() * 4)]
        }
      },
      "down": function() {
        if (monster.canMoveDown()) {
          monster.moveDown(currentFrameTime)
        } else {
          monster.direction = randomDirs[Math.floor(Math.random() * 4)]
        }
      }
    }

    let randomDirs = ["left", "right", "up", "down"]
    dirs[monster.direction]()
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

  drawRedMonsters(ctx, totalSpriteTime, currentFrameTime, viewPort) {
    for (let m = 0; m < this.redMonsters.length; m++) {
      if (!this.redMonsters[m].handleMove(currentFrameTime, "red")) {
        this.monsterSeekerCheckValidMove(this.redMonsters[m], currentFrameTime)
      }
      let spriteMonster = this.redMonsters[m].sprites['red'];

      for (let sm in spriteMonster.frames) {
        spriteMonster.frames[sm]['start'] = totalSpriteTime;
        totalSpriteTime += spriteMonster.aniTime;
        spriteMonster.frames[sm]['end'] = totalSpriteTime;
      }

      spriteMonster['totalSpriteDuration'] = totalSpriteTime;
      let monsterToon = this.getFrame(spriteMonster.frames, spriteMonster.totalSpriteDuration, currentFrameTime, this.redMonsters[m].moving)
      ctx.drawImage(window.monsterSet, monsterToon.pos[0], monsterToon.pos[1], monsterToon.size[0], monsterToon.size[1], viewPort.offset[0] + this.redMonsters[m].mapPos[0], viewPort.offset[1] + this.redMonsters[m].mapPos[1], this.redMonsters[m].size[0] / 1.4, this.redMonsters[m].size[1] / 1.4)
    }
  }

  drawSkullMonsters(ctx, totalSpriteTime, currentFrameTime, viewPort) {
    for (let m = 0; m < this.skullMonsters.length; m++) {
      if (!this.skullMonsters[m].handleMove(currentFrameTime, "skull")) {
        this.monsterLinearCheckValidMove(this.skullMonsters[m], currentFrameTime)
      }
      let spriteMonster = this.skullMonsters[m].sprites['skull'];
      for (let sm in spriteMonster.frames) {
        spriteMonster.frames[sm]['start'] = totalSpriteTime;
        totalSpriteTime += spriteMonster.aniTime;
        spriteMonster.frames[sm]['end'] = totalSpriteTime;
      }
      spriteMonster['totalSpriteDuration'] = totalSpriteTime;
      let monsterToon = this.getFrame(spriteMonster.frames, spriteMonster.totalSpriteDuration, currentFrameTime, this.skullMonsters[m].moving)
      ctx.drawImage(window.monsterSet, monsterToon.pos[0], monsterToon.pos[1], monsterToon.size[0], monsterToon.size[1], viewPort.offset[0] + this.skullMonsters[m].mapPos[0], viewPort.offset[1] + this.skullMonsters[m].mapPos[1] + 10, this.skullMonsters[m].size[0] / 2.5, this.skullMonsters[m].size[1] / 1.8)
    }
  }

  drawGreenMonsters(ctx, totalSpriteTime, currentFrameTime, viewPort) {
    for (let m = 0; m < this.greenMonsters.length; m++) {
      if (!this.greenMonsters[m].handleMove(currentFrameTime, "green")) {
        if (this.monsterDineRoomCheckValidMove()){
          this.greenMonsters[m].nextPos = findPath(this.board.gameMap, this.greenMonsters[m].currentPos, this.player.currentPos)[1]
          this.greenMonsters[m].timeStart = currentFrameTime
          this.greenMonsters[m].moving =  true;
        } else {
          if (this.greenMonsters[m].nextPos !== undefined) {
            this.greenMonsters[m].nextPos = findPath(this.board.gameMap, this.greenMonsters[m].currentPos, this.greenMonsters[m].guardPoint)[1]
            this.greenMonsters[m].timeStart = currentFrameTime
            this.greenMonsters[m].moving =  true;
          } else{
            this.greenMonsters[m].moving =  false;
          }
        }
      }
      let spriteMonster = this.greenMonsters[m].sprites['green'];

      for (let sm in spriteMonster.frames) {
        spriteMonster.frames[sm]['start'] = totalSpriteTime;
        totalSpriteTime += spriteMonster.aniTime;
        spriteMonster.frames[sm]['end'] = totalSpriteTime;
      }

      spriteMonster['totalSpriteDuration'] = totalSpriteTime;
      let monsterToon = this.getFrame(spriteMonster.frames, spriteMonster.totalSpriteDuration, currentFrameTime, this.greenMonsters[m].moving)
      ctx.drawImage(window.monsterSet, monsterToon.pos[0], monsterToon.pos[1], monsterToon.size[0], monsterToon.size[1], viewPort.offset[0] + this.greenMonsters[m].mapPos[0], viewPort.offset[1] + this.greenMonsters[m].mapPos[1] + 15, this.greenMonsters[m].size[0] / 2, this.greenMonsters[m].size[1] / 2)
    }
  }

  drawPurpleMonsters(ctx, totalSpriteTime, currentFrameTime, viewPort) {
    for (let m = 0; m < this.purpleMonsters.length; m++) {
      if (!this.purpleMonsters[m].handleMove(currentFrameTime, "purple")) {
        if (this.monsterProximityCheckValidMove(this.purpleMonsters[m], 4)) {
          this.purpleMonsters[m].nextPos = findPath(this.board.gameMap, this.purpleMonsters[m].currentPos, this.player.currentPos)[1]
          this.purpleMonsters[m].timeStart = currentFrameTime
          this.purpleMonsters[m].moving =  true;
        } else {
          this.randomCheckValidMove(this.purpleMonsters[m], currentFrameTime)
        }
      }
      let spriteMonster = this.purpleMonsters[m].sprites['purple'];
      for (let sm in spriteMonster.frames) {
        spriteMonster.frames[sm]['start'] = totalSpriteTime;
        totalSpriteTime += spriteMonster.aniTime;
        spriteMonster.frames[sm]['end'] = totalSpriteTime;
      }
      spriteMonster['totalSpriteDuration'] = totalSpriteTime;
      let monsterToon = this.getFrame(spriteMonster.frames, spriteMonster.totalSpriteDuration, currentFrameTime, this.purpleMonsters[m].moving)
      ctx.drawImage(window.monsterSet, monsterToon.pos[0], monsterToon.pos[1], monsterToon.size[0], monsterToon.size[1], viewPort.offset[0] + this.purpleMonsters[m].mapPos[0], viewPort.offset[1] + this.purpleMonsters[m].mapPos[1] + 10, this.purpleMonsters[m].size[0] / 2.5, this.purpleMonsters[m].size[1] / 1.8)
    }
  }

  drawBossMonster(ctx, totalSpriteTime, currentFrameTime, viewPort) {
    if (this.bossMonster !== null) {
      if (!this.bossMonster.handleMove(currentFrameTime, "boss")) {
        if (this.monsterTreasureRoomCheckValidMove()){
          this.bossMonster.nextPos = findPath(this.board.gameMap, this.bossMonster.currentPos, this.player.currentPos)[1]
          this.bossMonster.timeStart = currentFrameTime
          this.bossMonster.moving =  true;
        } else {
          if (this.bossMonster.nextPos !== undefined) {
            this.bossMonster.nextPos = findPath(this.board.gameMap, this.bossMonster.currentPos, this.bossMonster.guardPoint)[1]
            this.bossMonster.timeStart = currentFrameTime
            this.bossMonster.moving =  true;
          } else{
            this.bossMonster.moving =  false;
          }
        }
      }
      let spriteMonster = this.bossMonster.sprites['boss'];
      for (let sm in spriteMonster.frames) {
        spriteMonster.frames[sm]['start'] = totalSpriteTime;
        totalSpriteTime += spriteMonster.aniTime;
        spriteMonster.frames[sm]['end'] = totalSpriteTime;
      }
      spriteMonster['totalSpriteDuration'] = totalSpriteTime;
      let monsterToon = this.getFrame(spriteMonster.frames, spriteMonster.totalSpriteDuration, currentFrameTime, this.bossMonster.moving)
      ctx.drawImage(window.monsterSet, monsterToon.pos[0], monsterToon.pos[1], monsterToon.size[0], monsterToon.size[1], viewPort.offset[0] + this.bossMonster.mapPos[0], viewPort.offset[1] + this.bossMonster.mapPos[1], this.bossMonster.size[0] / 1.3, this.bossMonster.size[1]  )
    }
  }
}
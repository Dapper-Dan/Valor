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
    this.greenRespawnQueue = [];
    this.greenMonstersInitialized = false;
    this.skullRespawnQueue = [];
    this.purpleRespawnQueue = [];
    this.skullMonstersInitialized = false;
    this.purpleMonstersInitialized = false;
  }

  /**
   * Main game loop: handles spawning, movement, drawing, and game state updates.
   */
  drawGame() {
    let currentFrameTime = Date.now();
    let viewPort = this.board.viewPort;

    // Set up possible spawn locations for red monsters
    let redPossibleSpawns = {
      0: { pos: [18, 12] },
      1: { pos: [7, 8] },
      2: { pos: [1, 7]},
    }

    let redSpawnMax = 3;

    // Adjust red monster spawn max based on game phase
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

    // Initial spawn of skull monsters
    if (!this.skullMonstersInitialized) {
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
      this.skullMonstersInitialized = true;
    }

    // Check for dead skull monsters and queue them for respawn
    for (let i = this.skullMonsters.length - 1; i >= 0; i--) {
      let mon = this.skullMonsters[i];
      if (this.enemyCollision(mon)) {
        this.score += 10;
        this.skullPossibleSpawns[mon.spawnNum].taken = false;
        this.skullRespawnQueue.push({ time: currentFrameTime, spawnNum: mon.spawnNum });
        this.skullMonsters.splice(i, 1);
      }
    }

    // Handle skull monster respawn delay
    for (let i = this.skullRespawnQueue.length - 1; i >= 0; i--) {
      let respawn = this.skullRespawnQueue[i];
      if (currentFrameTime - respawn.time >= 5000) {
        let monster = new Monster();
        monster.nextPos = this.skullPossibleSpawns[respawn.spawnNum].pos;
        monster.spawnNum = respawn.spawnNum;
        this.skullMonsters.push(monster);
        this.skullPossibleSpawns[respawn.spawnNum].taken = true;
        this.skullRespawnQueue.splice(i, 1);
      }
    }
    
    // Spawn red monsters if needed
    while (this.redMonsters.length < redSpawnMax) {
      let num = Math.floor(Math.random() * 3); 
      let monster = new Monster();
      monster.nextPos = redPossibleSpawns[num].pos
      this.redMonsters.push(monster);
    }

    // Check for dead red monsters and respawn them
    for (let mon of this.redMonsters) {
      if (this.enemyCollision(mon)) {
        let num = Math.floor(Math.random() * 3); 
        let monster = new Monster();
        monster.nextPos = redPossibleSpawns[num].pos
        this.redMonsters.push(monster);
        this.score += 10;
      }
    }
    
    // Initial spawn of green monsters
    if (!this.greenMonstersInitialized) {
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
      this.greenMonstersInitialized = true;
    }

    // Check for dead green monsters and queue them for respawn
    for (let i = this.greenMonsters.length - 1; i >= 0; i--) {
      let mon = this.greenMonsters[i];
      if (this.enemyCollision(mon)) {
        this.score += 10;
        this.greenPossibleSpawns[mon.spawnNum].taken = false;
        // Add to respawn queue with timestamp
        this.greenRespawnQueue.push({ time: currentFrameTime, spawnNum: mon.spawnNum });
        this.greenMonsters.splice(i, 1);
      }
    }

    // Handle green monster respawn delay
    for (let i = this.greenRespawnQueue.length - 1; i >= 0; i--) {
      let respawn = this.greenRespawnQueue[i];
      if (currentFrameTime - respawn.time >= 5000) {
        let monster = new Monster();
        monster.nextPos = this.greenPossibleSpawns[respawn.spawnNum].pos;
        monster.guardPoint = this.greenPossibleSpawns[respawn.spawnNum].pos;
        monster.spawnNum = respawn.spawnNum;
        this.greenMonsters.push(monster);
        this.greenPossibleSpawns[respawn.spawnNum].taken = true;
        this.greenRespawnQueue.splice(i, 1);
      }
    }

    // Initial spawn of purple monsters
    if (!this.purpleMonstersInitialized) {
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
      this.purpleMonstersInitialized = true;
    }

    // Check for dead purple monsters and queue them for respawn
    for (let i = this.purpleMonsters.length - 1; i >= 0; i--) {
      let mon = this.purpleMonsters[i];
      if (this.enemyCollision(mon)) {
        this.score += 10;
        this.purplePossibleSpawns[mon.spawnNum].taken = false;
        this.purpleRespawnQueue.push({ time: currentFrameTime, spawnNum: mon.spawnNum });
        this.purpleMonsters.splice(i, 1);
      }
    }

    // Handle purple monster respawn delay
    for (let i = this.purpleRespawnQueue.length - 1; i >= 0; i--) {
      let respawn = this.purpleRespawnQueue[i];
      if (currentFrameTime - respawn.time >= 3000) {
        let monster = new Monster();
        monster.nextPos = this.purplePossibleSpawns[respawn.spawnNum].pos;
        monster.spawnNum = respawn.spawnNum;
        this.purpleMonsters.push(monster);
        this.purplePossibleSpawns[respawn.spawnNum].taken = true;
        this.purpleRespawnQueue.splice(i, 1);
      }
    }

    // Boss monster spawn/respawn logic
    if (this.bossMonster === null && this.bossDeathTime === this.bossSpawnTime) {
      this.bossMonster = new Monster();
      this.bossMonster.nextPos = [17, 22];
      this.bossMonster.guardPoint = [17, 22];
    } else if (this.bossMonster === null && this.bossDeathTime !== this.bossSpawnTime) {
      this.bossDeathTime += 1;
    }

    // If boss monster is killed by an arrow, add score
    if (this.bossMonster !== null && this.enemyCollision(this.bossMonster)) this.score += 100;
   
    // Handle player shooting arrows
    if (this.keys[32] && (currentFrameTime - this.player.lastArrowFired) > this.player.ROF) {
      this.arrows.push(new Arrow(this.player.currentPos, [(this.player.currentPos[0] + this.player.shootDir[this.player.direction][0]), (this.player.currentPos[1] + this.player.shootDir[this.player.direction][1])] , this.player.mapPos, this.player.direction));
      this.player.lastArrowFired = currentFrameTime;
      this.keys[32] = false;
    }

    // Check for special player state (holy mode)
    if (JSON.stringify(this.player.mapPos) === JSON.stringify([1275, 1485])) this.player.holy = true;

    // Handle holy mode timing and effects
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

    // Handle player movement
    if (!this.player.handleMove(currentFrameTime)) {
      this.checkValidMove(currentFrameTime)
    }
    
    // Update viewport based on player position
    viewPort.update(this.player.mapPos[0] + (this.player.size[0] / 2), this.player.mapPos[1] + (this.player.size[1] / 2))
    this.board.ctx.fillStyle = "#000000";

    // Draw the background
    this.board.ctx.fillRect(0, 0, viewPort.screen[0], viewPort.screen[1]) 
    // Draw the map tiles
    for (let y = viewPort.startTile[1]; y < viewPort.endTile[1]; y++) {
      for (let x = viewPort.startTile[0]; x < viewPort.endTile[0]; x++) {
        let tile =  this.board.tileTypes[this.board.gameMap[this.player.toIndex(x, y)]];
        this.board.ctx.drawImage(window.tileset, tile.sprite.pos[0], tile.sprite.pos[1], tile.sprite.size[0], tile.sprite.size[1], (viewPort.offset[0] + (x * this.board.tileWidth)), (viewPort.offset[1] + (y * this.board.tileHeight)), this.board.tileWidth, this.board.tileHeight)
      }
    }

    // Draw scenery and monsters
    let spritePlayer = this.player.sprites[this.player.direction]
    let totalSpriteTime = 0;
    this.scenery.drawScenery(this.board.ctx, totalSpriteTime, currentFrameTime, viewPort)
    this.scenery.drawTallCandle(this.board.ctx, totalSpriteTime, currentFrameTime, viewPort)
    this.scenery.drawLava(this.board.ctx, totalSpriteTime, currentFrameTime, viewPort)
    if (!this.player.holy) this.scenery.drawPotion(this.board.ctx, totalSpriteTime, currentFrameTime, viewPort)

    // Draw all monsters
    this.drawRedMonsters(this.board.ctx, totalSpriteTime, currentFrameTime, viewPort)
    this.drawSkullMonsters(this.board.ctx, totalSpriteTime, currentFrameTime, viewPort)
    this.drawGreenMonsters(this.board.ctx, totalSpriteTime, currentFrameTime, viewPort)
    this.drawPurpleMonsters(this.board.ctx, totalSpriteTime, currentFrameTime, viewPort)
    this.drawBossMonster(this.board.ctx, totalSpriteTime, currentFrameTime, viewPort)
    
    // Animate player sprite
    for (let s in spritePlayer.frames) {
      spritePlayer.frames[s]['start'] = totalSpriteTime;
      totalSpriteTime += spritePlayer.aniTime;
      spritePlayer.frames[s]['end'] = totalSpriteTime;
    }

    spritePlayer['totalSpriteDuration'] = totalSpriteTime;
    let toon = this.getFrame(spritePlayer.frames, spritePlayer.totalSpriteDuration, currentFrameTime, this.player.moving);
    this.board.ctx.drawImage(window.toonSet, toon.pos[0], toon.pos[1], toon.size[0], toon.size[1], (viewPort.offset[0] + this.player.mapPos[0]), (viewPort.offset[1] + this.player.mapPos[1]), this.player.size[0], this.player.size[1])
  
    // Handle phase changes based on time
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

    // Move arrows and check for collisions
    if (this.arrows.length > 0) {
      for (let arrow of this.arrows) {
        if (!arrow.handleMove(currentFrameTime)) {
          this.arrowCheckValidMove(arrow, currentFrameTime)
        }
      }
    }

    // Draw all arrows
    for(let a in this.arrows) {
      let arrowSprite = this.arrows[a];
      let arrowSpriteDir = arrowSprite.sprites[arrowSprite.direction].frames[0];
      if (this.arrows.length > 0 && arrowSprite.destroyed === false) {
        this.board.ctx.drawImage(window.arrowSet, arrowSpriteDir.pos[0], arrowSpriteDir.pos[1], arrowSpriteDir.size[0], arrowSpriteDir.size[1], viewPort.offset[0] + arrowSprite.mapPos[0], viewPort.offset[1] + arrowSprite.mapPos[1], arrowSpriteDir.size[0], arrowSpriteDir.size[1])
      }
    }

    // Draw blood effects and remove dead monsters
    for (let m in this.redMonsters) {
      // For each dead red monster, play blood effect and remove from array
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
      // For each dead skull monster, play blood effect and remove from array
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
      // For each dead green monster, play blood effect and remove from array
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
      // For each dead purple monster, play blood effect and remove from array
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
    // For dead boss monster, play blood effect and reset boss state
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

    // Update player invulnerability and check for collisions
    this.player.updateInvulnerability(currentFrameTime);
    this.checkCollisions(currentFrameTime);

    // Remove destroyed arrows
    for (let a in this.arrows) {
      if (this.arrows[a].destroyed) this.arrows.splice(a, 1)
    }
  
    this.lastFrameTime = currentFrameTime;

    // Draw game title
    this.board.ctx.font = "48px Pixel";
    this.board.ctx.fillStyle = "#fff";
    this.board.ctx.textAlign = "center";
    this.board.ctx.letterSpacing = "0px";
    this.board.ctx.fillText("VALOR", viewPort.screen[0] / 2, 100);

    // Handle game over state
    if (this.gameOver) {
      this.reset()
    }

    // Continue the game loop if not paused or over
    if (!this.paused && !this.gameOver) {
      requestAnimationFrame(this.drawGame);
    }

    // Draw health bar and check for game over
    this.drawPlayerHealthBar();
    if (this.player.currentHealth <= 0) {
      this.gameOver = true;
      this.drawGameOver();
    }
  }

  /**
   * Checks which direction the player can move and moves them if a key is pressed.
   */
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

  /**
   * Makes a monster move toward the player using pathfinding.
   */
  monsterSeekerCheckValidMove(monster, currentFrameTime) {
    monster.nextPos = findPath(this.board.gameMap, monster.currentPos, this.player.currentPos)[1];
    monster.timeStart = currentFrameTime;
    monster.moving =  true;
  }

  /**
   * Makes a monster move in a straight line, reversing direction if blocked.
   */
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

  /**
   * Checks if the player is within a certain radius of a monster.
   */
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

  /**
   * Checks if the player is in the "dining room" area for green monster logic.
   */
  monsterDineRoomCheckValidMove() {
    if ((this.player.currentPos[1] >= 6 && this.player.currentPos[1] <= 16) && (this.player.currentPos[0] >= 25 && this.player.currentPos[0] <= 30)) {
      return true;
    }
  }

  /**
   * Checks if the player is in the "treasure room" area for boss monster logic.
   */
  monsterTreasureRoomCheckValidMove() {
    if ((this.player.currentPos[1] >= 20 && this.player.currentPos[1] <= 26) && (this.player.currentPos[0] >= 13 && this.player.currentPos[0] <= 18)) {
      return true;
    }
  }

  /**
   * Makes a monster move in a random direction.
   */
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

  /**
   * Moves an arrow in its current direction, or destroys it if blocked.
   */
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

  /**
   * Gets the correct animation frame for a sprite based on time and movement.
   */
  getFrame(sprites, duration, time, moving) {
    if (!moving) return sprites[0]
    time = time % duration;
    for (let i in sprites) {
      if (sprites[i].end >= time) return sprites[i];
    }
  }

  /**
   * Checks if a monster has been hit by an arrow and marks it as dead if so.
   */
  enemyCollision(monster) {
    for (let arrow of this.arrows) {
      if (JSON.stringify(arrow.currentPos) === JSON.stringify(monster.currentPos) && monster.alive) {
        monster.alive = false;
        arrow.destroyed = true;
        return true;
      }
    }
  }

  /**
   * Toggles the game pause state.
   */
  togglePause() {
    if (!this.paused) {
      this.paused = true;
      this.drawGame()
    } else {
      this.paused= false;
      this.drawGame()
    }
  }

  /**
   * Shows the play again button and resets the game state.
   */
  reset() {
    let playAgain = document.getElementById("playAgain")
    playAgain.hidden = !playAgain.hidden;
  }

  /**
   * Draws all red monsters and their animations.
   */
  drawRedMonsters(ctx, totalSpriteTime, currentFrameTime, viewPort) {
    // Loop through all red monsters and draw them
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

  /**
   * Draws all skull monsters and their animations.
   */
  drawSkullMonsters(ctx, totalSpriteTime, currentFrameTime, viewPort) {
    // Loop through all skull monsters and draw them
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

  /**
   * Draws all green monsters and their animations.
   */
  drawGreenMonsters(ctx, totalSpriteTime, currentFrameTime, viewPort) {
    // Loop through all green monsters and draw them
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

  /**
   * Draws all purple monsters and their animations.
   */
  drawPurpleMonsters(ctx, totalSpriteTime, currentFrameTime, viewPort) {
    // Loop through all purple monsters and draw them
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

  /**
   * Draws the boss monster and its animation.
   */
  drawBossMonster(ctx, totalSpriteTime, currentFrameTime, viewPort) {
    // Draw the boss monster if it exists
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

  /**
   * Draws the player's health bar and UI elements.
   */
  drawPlayerHealthBar() {
    const barWidth = 200;
    const barHeight = 50;
    const x = (this.board.viewPort.screen[0] - barWidth) / 2;
    const y = 100;

    // Draw the empty bar frame (always full width)
    this.board.ctx.drawImage(window.healthbar2, x, y + 7, barWidth, barHeight);

    // Calculate width of the red fill based on health (6 = full, 0 = empty)
    let health = Math.max(0, Math.min(6, this.player.currentHealth));
    let fillWidth = Math.floor(barWidth * (health / 6));

    // Draw only the filled portion of the bar
    if (fillWidth > 0) {
      this.board.ctx.drawImage(
        window.healthbar,
        0, 0, fillWidth, barHeight,
        x, y, fillWidth, barHeight
      );
    }

    // Draw UI element below the hearts
    const uiWidth = 200;
    const uiHeight = 60;
    const uiX = (this.board.viewPort.screen[0] - uiWidth) / 2;
    const uiY = 150;
    this.board.ctx.drawImage(window.ui, uiX, uiY, uiWidth, uiHeight);

    this.board.ctx.font = "38px Ancient";
    this.board.ctx.fillStyle = "#fff";
    this.board.ctx.textAlign = "end";
    this.board.ctx.letterSpacing = "24px";
    this.board.ctx.fillText(this.score, uiX + 192, uiY + 40);
  }

  /**
   * Draws the game over screen.
   */
  drawGameOver() {
    // Implement the logic to draw the game over screen
  }

  /**
   * Checks for collisions between the player and all monsters.
   */
  checkCollisions(currentFrameTime) {
    // Only check collisions if player is not invulnerable
    if (this.player.isInvulnerable) return;

    // Check collisions with red monsters
    for (let m in this.redMonsters) {
      if (this.redMonsters[m].currentPos[0] === this.player.currentPos[0] && 
          this.redMonsters[m].currentPos[1] === this.player.currentPos[1]) {
        this.player.takeDamage(currentFrameTime);
        return;
      }
    }

    // Check collisions with green monsters
    for (let m in this.greenMonsters) {
      if (this.greenMonsters[m].currentPos[0] === this.player.currentPos[0] && 
          this.greenMonsters[m].currentPos[1] === this.player.currentPos[1]) {
        this.player.takeDamage(currentFrameTime);
        return;
      }
    }

    // Check collisions with purple monsters
    for (let m in this.purpleMonsters) {
      if (this.purpleMonsters[m].currentPos[0] === this.player.currentPos[0] && 
          this.purpleMonsters[m].currentPos[1] === this.player.currentPos[1]) {
        this.player.takeDamage(currentFrameTime);
        return;
      }
    }

    // Check collisions with skull monsters
    for (let m in this.skullMonsters) {
      if (this.skullMonsters[m].currentPos[0] === this.player.currentPos[0] && 
          this.skullMonsters[m].currentPos[1] === this.player.currentPos[1]) {
        this.player.takeDamage(currentFrameTime);
        return;
      }
    }

    // Check collision with boss monster
    if (this.bossMonster && 
        this.bossMonster.currentPos[0] === this.player.currentPos[0] && 
        this.bossMonster.currentPos[1] === this.player.currentPos[1]) {
      this.player.takeDamage(currentFrameTime);
    }
  }
}
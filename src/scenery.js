export default class Scenery {
    constructor(frames, aniTime) {
      this.frames = frames; 
      this.aniTime = aniTime;
    }

    drawScenery(ctx, totalSpriteTime, currentFrameTime, viewPort) {
      let wallCandle = new Scenery({
        0: { pos: [209, 29], size: [25, 28] },
        1: { pos: [249, 29], size: [25, 27] },
        2: { pos: [293, 30], size: [27, 28] }
      }, 250);
      
      let spawnTwo = [ [785, 160], [975, 160], [1135, 160], [1345, 160], [1485, 1840], [1710, 1840], [1975, 1840], [295, 1145], [1135, 1145], [2325, 1210], [2325, 585]]
      
      for (let i in wallCandle.frames) {
          wallCandle.frames[i]['start'] = totalSpriteTime;
          totalSpriteTime += wallCandle.aniTime;
          wallCandle.frames[i]['end'] = totalSpriteTime;
      }
      wallCandle['totalSpriteDuration'] = totalSpriteTime;
      let wallCandleFrame = this.getFrame(wallCandle.frames, wallCandle.totalSpriteDuration, currentFrameTime, true)
      for (let s in spawnTwo) {
        ctx.drawImage(window.scenery, wallCandleFrame.pos[0], wallCandleFrame.pos[1], wallCandleFrame.size[0], wallCandleFrame.size[1], viewPort.offset[0] + spawnTwo[s][0], viewPort.offset[1] + spawnTwo[s][1], 30, 30)
      }
    
      //TABLE
      ctx.drawImage(window.scenery, 5, 118, 60, 40, viewPort.offset[0] + 1835, viewPort.offset[1] + 505, 65, 45)
      ctx.drawImage(window.scenery, 5, 118, 60, 40, viewPort.offset[0] + 1890, viewPort.offset[1] + 505, 65, 45)
      ctx.drawImage(window.scenery, 5, 118, 60, 40, viewPort.offset[0] + 1945, viewPort.offset[1] + 505, 65, 45)
      ctx.drawImage(window.scenery, 5, 118, 60, 40, viewPort.offset[0] + 2000, viewPort.offset[1] + 505, 65, 45)
      ctx.drawImage(window.scenery, 5, 118, 60, 40, viewPort.offset[0] + 2055, viewPort.offset[1] + 505, 65, 45)
      ctx.drawImage(window.scenery, 5, 118, 60, 40, viewPort.offset[0] + 1835, viewPort.offset[1] + 795, 65, 45)
      ctx.drawImage(window.scenery, 5, 118, 60, 40, viewPort.offset[0] + 1890, viewPort.offset[1] + 795, 65, 45)
      ctx.drawImage(window.scenery, 5, 118, 60, 40, viewPort.offset[0] + 1945, viewPort.offset[1] + 795, 65, 45)
      ctx.drawImage(window.scenery, 5, 118, 60, 40, viewPort.offset[0] + 2000, viewPort.offset[1] + 795, 65, 45)
      ctx.drawImage(window.scenery, 5, 118, 60, 40, viewPort.offset[0] + 2055, viewPort.offset[1] + 795, 65, 45)
      ctx.drawImage(window.scenery, 5, 118, 60, 40, viewPort.offset[0] + 1835, viewPort.offset[1] + 1065, 65, 45)
      ctx.drawImage(window.scenery, 5, 118, 60, 40, viewPort.offset[0] + 1890, viewPort.offset[1] + 1065, 65, 45)
      ctx.drawImage(window.scenery, 5, 118, 60, 40, viewPort.offset[0] + 1945, viewPort.offset[1] + 1065, 65, 45)
      ctx.drawImage(window.scenery, 5, 118, 60, 40, viewPort.offset[0] + 2000, viewPort.offset[1] + 1065, 65, 45)
      ctx.drawImage(window.scenery, 5, 118, 60, 40, viewPort.offset[0] + 2055, viewPort.offset[1] + 1065, 65, 45)
      
      //hole
      ctx.drawImage(window.scenery, 207, 64, 140, 70, viewPort.offset[0] + 780, viewPort.offset[1] + 710, 140, 70)

      //banner1
      ctx.drawImage(window.scenery, 184, 80, 20, 35, viewPort.offset[0] + 715, viewPort.offset[1] + 510, 25, 50)
      ctx.drawImage(window.scenery, 149, 80, 20, 28, viewPort.offset[0] + 943, viewPort.offset[1] + 510, 20, 55)
      ctx.drawImage(window.scenery, 149, 80, 20, 28, viewPort.offset[0] + 1695, viewPort.offset[1] + 860, 20, 55)
      ctx.drawImage(window.scenery, 149, 80, 20, 28, viewPort.offset[0] + 2185, viewPort.offset[1] + 860, 20, 55)
      ctx.drawImage(window.scenery, 149, 80, 20, 28, viewPort.offset[0] + 855, viewPort.offset[1] + 1910, 20, 55)

      //box
      ctx.drawImage(window.scenery, 213, 228, 30, 32, viewPort.offset[0] + 70, viewPort.offset[1] + 900, 30, 32)
      ctx.drawImage(window.scenery, 213, 228, 30, 32, viewPort.offset[0] + 2325, viewPort.offset[1] + 2025, 30, 32)

      //rack 
      ctx.drawImage(window.scenery, 13, 226, 30, 40, viewPort.offset[0] + 1065, viewPort.offset[1] + 515, 40, 50)
      ctx.drawImage(window.scenery, 63, 223, 30, 40, viewPort.offset[0] + 1135, viewPort.offset[1] + 510, 40, 50)
      ctx.drawImage(window.scenery, 63, 223, 30, 40, viewPort.offset[0] + 1205, viewPort.offset[1] + 1985, 40, 50)
      ctx.drawImage(window.scenery, 63, 223, 30, 40, viewPort.offset[0] + 2185, viewPort.offset[1] + 1350, 40, 50)
      ctx.drawImage(window.scenery, 13, 226, 30, 40, viewPort.offset[0] + 1695, viewPort.offset[1] + 1350, 40, 50)
      ctx.drawImage(window.scenery, 13, 226, 30, 40, viewPort.offset[0] + 715, viewPort.offset[1] + 1000, 40, 50)
      ctx.drawImage(window.scenery, 13, 226, 30, 40, viewPort.offset[0] + 155, viewPort.offset[1] + 1425, 40, 50)

      //rug
      ctx.drawImage(window.scenery, 81, 300, 70, 45, viewPort.offset[0] + 670, viewPort.offset[1] + 1370, 140, 90)
      ctx.drawImage(window.scenery, 81, 300, 70, 45, viewPort.offset[0] + 2240, viewPort.offset[1] + 1745, 120, 70)

      //table
      ctx.drawImage(window.scenery, 5, 118, 60, 40, viewPort.offset[0] + 645, viewPort.offset[1] + 1415, 65, 45)

      //lamp
      ctx.drawImage(window.scenery, 126, 19, 30, 45, viewPort.offset[0] + 645, viewPort.offset[1] + 1020, 30, 45)
      ctx.drawImage(window.scenery, 126, 19, 30, 45, viewPort.offset[0] + 1765, viewPort.offset[1] + 395, 30, 45)
      ctx.drawImage(window.scenery, 126, 19, 30, 45, viewPort.offset[0] + 2140, viewPort.offset[1] + 395, 30, 45)
      ctx.drawImage(window.scenery, 126, 19, 30, 45, viewPort.offset[0] + 435, viewPort.offset[1] + 1790, 30, 45)

      //chair
      ctx.drawImage(window.scenery, 97, 125, 20, 30, viewPort.offset[0] + 785, viewPort.offset[1] + 1030, 25, 35)
      ctx.drawImage(window.scenery, 97, 125, 20, 30, viewPort.offset[0] + 1900, viewPort.offset[1] + 765, 25, 35)
      ctx.drawImage(window.scenery, 97, 125, 20, 30, viewPort.offset[0] + 1835, viewPort.offset[1] + 530, 25, 35)
      ctx.drawImage(window.scenery, 97, 125, 20, 30, viewPort.offset[0] + 1900, viewPort.offset[1] + 530, 25, 35)
      
      //chair2
      ctx.drawImage(window.scenery, 67, 125, 20, 30, viewPort.offset[0] + 2000, viewPort.offset[1] + 765, 25, 35)
      ctx.drawImage(window.scenery, 67, 125, 20, 30, viewPort.offset[0] + 2100, viewPort.offset[1] + 820, 25, 35)
      ctx.drawImage(window.scenery, 67, 125, 20, 30, viewPort.offset[0] + 2050, viewPort.offset[1] + 475, 25, 35)
      ctx.drawImage(window.scenery, 67, 125, 20, 30, viewPort.offset[0] + 1975, viewPort.offset[1] + 1033, 25, 35)

      //banner2
      ctx.drawImage(window.scenery, 149, 80, 20, 28, viewPort.offset[0] + 925, viewPort.offset[1] + 1140, 20, 55)
      ctx.drawImage(window.scenery, 184, 80, 20, 35, viewPort.offset[0] + 1345, viewPort.offset[1] + 1140, 25, 50)
      ctx.drawImage(window.scenery, 184, 80, 20, 35, viewPort.offset[0] + 435, viewPort.offset[1] + 1140, 25, 50)
      ctx.drawImage(window.scenery, 149, 80, 20, 28, viewPort.offset[0] + 155, viewPort.offset[1] + 1140, 20, 55)
      ctx.drawImage(window.scenery, 149, 80, 20, 28, viewPort.offset[0] + 2255, viewPort.offset[1] + 1630, 20, 55)
      ctx.drawImage(window.scenery, 184, 80, 20, 35, viewPort.offset[0] + 225, viewPort.offset[1] + 1770, 25, 50)
      ctx.drawImage(window.scenery, 184, 80, 20, 35, viewPort.offset[0] + 1625, viewPort.offset[1] + 25, 25, 50)
      ctx.drawImage(window.scenery, 184, 80, 20, 35, viewPort.offset[0] + 2185, viewPort.offset[1] + 25, 25, 50)

      //chest
      ctx.drawImage(window.scenery, 111, 233, 30, 30, viewPort.offset[0] + 295, viewPort.offset[1] + 1800, 30, 30)

      //gate
      ctx.drawImage(window.scenery, 231, 134, 42, 42, viewPort.offset[0] + 1960, viewPort.offset[1] + 17, 45, 55)
      ctx.drawImage(window.scenery, 231, 134, 42, 42, viewPort.offset[0] + 1765, viewPort.offset[1] + 1345, 45, 55)
      ctx.drawImage(window.scenery, 231, 134, 42, 42, viewPort.offset[0] + 225, viewPort.offset[1] + 1415, 45, 55)

      //gold
      ctx.drawImage(window.scenery, 10, 182, 41, 30, viewPort.offset[0] + 925, viewPort.offset[1] + 1395, 60, 49)
      ctx.drawImage(window.scenery, 332, 164, 50, 53, viewPort.offset[0] + 1268, viewPort.offset[1] + 1625, 80, 83)
      ctx.drawImage(window.scenery, 153, 183, 41, 30, viewPort.offset[0] + 1282, viewPort.offset[1] + 1380, 60, 49)
      ctx.drawImage(window.scenery, 65, 183, 30, 28, viewPort.offset[0] + 1100, viewPort.offset[1] + 1395, 45, 43)
      ctx.drawImage(window.scenery, 109, 186, 27, 22, viewPort.offset[0] + 1000, viewPort.offset[1] + 1395, 45, 40)
      ctx.drawImage(window.scenery, 215, 186, 41, 30, viewPort.offset[0] + 1150, viewPort.offset[1] + 1395, 60, 40)
      ctx.drawImage(window.scenery, 262, 237, 23, 17, viewPort.offset[0] + 1065, viewPort.offset[1] + 1625, 36, 30)
      ctx.drawImage(window.scenery, 262, 237, 23, 17, viewPort.offset[0] + 1135, viewPort.offset[1] + 1415, 36, 30)
      ctx.drawImage(window.scenery, 262, 237, 23, 17, viewPort.offset[0] + 925, viewPort.offset[1] + 1905, 30, 24)
      ctx.drawImage(window.scenery, 302, 238, 23, 17, viewPort.offset[0] + 1215, viewPort.offset[1] + 1485, 36, 30)
      ctx.drawImage(window.scenery, 272, 263, 4, 4, viewPort.offset[0] + 995, viewPort.offset[1] + 1555, 8, 8)
      ctx.drawImage(window.scenery, 272, 263, 4, 4, viewPort.offset[0] + 925, viewPort.offset[1] + 1485, 8, 8)
      ctx.drawImage(window.scenery, 289, 254, 9, 10, viewPort.offset[0] + 1135, viewPort.offset[1] + 1555, 11, 12)
      ctx.drawImage(window.scenery, 262, 182, 45, 52, viewPort.offset[0] + 915, viewPort.offset[1] + 1675, 75, 82)

      //chest2
      ctx.drawImage(window.scenery, 157, 234, 38, 28, viewPort.offset[0] + 1250, viewPort.offset[1] + 1396, 40, 30)

      //skull spawn
      ctx.drawImage(window.scenery, 213, 288, 33, 41, viewPort.offset[0] + 855, viewPort.offset[1] + 200, 15, 23)
      ctx.drawImage(window.scenery, 213, 288, 33, 41, viewPort.offset[0] + 1600, viewPort.offset[1] + 295, 15, 23)
      ctx.drawImage(window.scenery, 213, 288, 33, 41, viewPort.offset[0] + 1415, viewPort.offset[1] + 1880, 15, 23)
    }

    drawTallCandle(ctx, totalSpriteTime, currentFrameTime, viewPort) {
      let candle = new Scenery({
        0: { pos: [19, 18], size: [16, 40] },
        1: { pos: [57, 20], size: [16, 40] },
        2: { pos: [91, 20], size: [16, 40] }
      }, 300);
      
      let spawns = [ [290, 600], [360, 600], [1345, 525], [715, 1870], [2465, 1515], [2115, 1995] ]
      for (let i in candle.frames) {
        candle.frames[i]['start'] = totalSpriteTime;
        totalSpriteTime += candle.aniTime;
        candle.frames[i]['end'] = totalSpriteTime;
      }
      candle['totalSpriteDuration'] = totalSpriteTime;
      let candleFrame = this.getFrame(candle.frames, candle.totalSpriteDuration, currentFrameTime, true)
      for (let s in spawns) {
        ctx.drawImage(window.scenery, candleFrame.pos[0], candleFrame.pos[1], candleFrame.size[0], candleFrame.size[1], viewPort.offset[0] + spawns[s][0], viewPort.offset[1] + spawns[s][1], candleFrame.size[0], candleFrame.size[1])
      }
    }

    drawLava(ctx, totalSpriteTime, currentFrameTime, viewPort) {
      let redFountain = new Scenery({
        0: { pos: [13, 80], size: [30, 30] },
        1: { pos: [58, 80], size: [30, 30] },
        2: { pos: [102, 80], size: [30, 30] },
        3: { pos: [13, 80], size: [30, 30] },
        4: { pos: [58, 80], size: [30, 30] },
        5: { pos: [102, 80], size: [30, 30] }
      }, 300);
      
      let loc = [ [80, 460], [505, 531] ]
      
      for (let i in redFountain.frames) {
        redFountain.frames[i]['start'] = totalSpriteTime;
        totalSpriteTime += redFountain.aniTime;
        redFountain.frames[i]['end'] = totalSpriteTime;
      }
      redFountain['totalSpriteDuration'] = totalSpriteTime;
      let redFountainFrame = this.getFrame(redFountain.frames, redFountain.totalSpriteDuration, currentFrameTime, true)
      for (let s in loc) {
        ctx.drawImage(window.scenery, redFountainFrame.pos[0], redFountainFrame.pos[1], redFountainFrame.size[0], redFountainFrame.size[1], viewPort.offset[0] + loc[s][0], viewPort.offset[1] + loc[s][1], 30, 30)
      }

      ctx.drawImage(window.scenery, 179, 293, 11, 31, viewPort.offset[0] + 1322, viewPort.offset[1] + 855, 11, 31)
    }

    drawPotion(ctx, totalSpriteTime, currentFrameTime, viewPort) {
      let potion = new Scenery({
        0: { pos: [18, 388], size: [8, 11] },
        1: { pos: [37, 388], size: [8, 11] },
        2: { pos: [54, 388], size: [8, 11] },
        3: { pos: [71, 388], size: [8, 11] }
      }, 50);
    
      for (let i in potion.frames) {
        potion.frames[i]['start'] = totalSpriteTime;
        totalSpriteTime += potion.aniTime;
        potion.frames[i]['end'] = totalSpriteTime;
      }
      potion['totalSpriteDuration'] = totalSpriteTime;
      let potionFrame = this.getFrame(potion.frames, potion.totalSpriteDuration, currentFrameTime, true);
      ctx.drawImage(window.scenery, potionFrame.pos[0], potionFrame.pos[1], potionFrame.size[0], potionFrame.size[1], viewPort.offset[0] + 1275, viewPort.offset[1] + 1485, potionFrame.size[0] * 1.3, potionFrame.size[1] * 1.3)
    }

    getFrame(sprites, duration, time, moving) {
      if (!moving) return sprites[0]
      time = time % duration;
      for (let i in sprites) {
        if (sprites[i].end >= time) return sprites[i];
      }
    }
}
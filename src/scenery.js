export default class Scenery {
    constructor(frames, aniTime) {
      this.frames = frames; 
      this.aniTime = aniTime;
    }


    drawScenery(ctx, totalSpriteTime, currentFrameTime, viewPort) {
     //CANDLE   
      
      let candle = new Scenery( {
            0: { pos: [19, 18], size: [16, 40] },
            1: { pos: [57, 19], size: [16, 41] },
            2: { pos: [91, 20], size: [16, 39] }
            }, 300   
        );
        
        let spawns = [ [290, 600], [360, 600] ]
        
        for (let i in candle.frames) {
            candle.frames[i]['start'] = totalSpriteTime;
            totalSpriteTime += candle.aniTime;
            candle.frames[i]['end'] = totalSpriteTime;
        }
        candle['totalSpriteDuration'] = totalSpriteTime;
        let candleFrame = this.getFrame(candle.frames, candle.totalSpriteDuration, currentFrameTime, true)
        for (let s in spawns) {
          ctx.drawImage(window.scenery, candleFrame.pos[0], candleFrame.pos[1], candleFrame.size[0], candleFrame.size[1], viewPort.offset[0] + spawns[s][0], viewPort.offset[1] + spawns[s][1], 16, 40)
        }




      //RED FOUNTAIN
        let redFountain = new Scenery( {
          0: { pos: [13, 80], size: [30, 30] },
          1: { pos: [58, 80], size: [30, 30] },
          2: { pos: [102, 80], size: [30, 30] },
          3: { pos: [13, 80], size: [30, 30] },
          4: { pos: [58, 80], size: [30, 30] },
          5: { pos: [102, 80], size: [30, 30] }
          }, 700   
      );
      
      let loc = [ [80, 460] ]
      
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




      //TABLE
      ctx.drawImage(window.scenery, 5, 118, 60, 40, viewPort.offset[0] + 780, viewPort.offset[1] + 710, 65, 45)

      //hole
      ctx.drawImage(window.scenery, 207, 64, 140, 70, viewPort.offset[0] + 780, viewPort.offset[1] + 710, 140, 70)





    }


    getFrame(sprites, duration, time, moving) {
        if (!moving) return sprites[0]
        time = time % duration;
        for (let i in sprites) {
          if (sprites[i].end >= time) return sprites[i];
        }
    }
}
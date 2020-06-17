export default class Scenery {
    constructor(frames, aniTime) {
      this.frames = frames; 
      this.aniTime = aniTime;
    }


    drawScenery(ctx, totalSpriteTime, currentFrameTime, viewPort) {
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

    }


    getFrame(sprites, duration, time, moving) {
        if (!moving) return sprites[0]
        time = time % duration;
        for (let i in sprites) {
          if (sprites[i].end >= time) return sprites[i];
        }
    }
}
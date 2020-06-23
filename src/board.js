import Player from "./player"
import Tile from "./tile";

export default class Board {
  constructor() {
    this.gameBoard = document.getElementById("gameBoard"); 
    this.ctx = this.gameBoard.getContext('2d');
    this.gameBoard.width = window.innerWidth;
    this.gameBoard.height = window.innerHeight;
    this.tileWidth = 70;
    this.tileHeight = 70;
    this.mapWidth = 36;
    this.mapHeight = 36;
    this.gameMap =  [
  //   0   1   2   3  4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25  26  27  28  29  30  31  32  33  34  35 
      20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 28, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 29,// 0
      20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 28, 18, 15, 40, 40, 40, 15, 40, 40, 15, 40, 15, 40, 40, 40, 15, 29,// 1 
      20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 28, 21, 21, 21, 21, 21, 21, 21, 21, 21, 16, 38, 38, 38, 38, 14, 38, 38, 38, 38, 38, 38, 13, 38, 38, 29,// 2 
      20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 28, 18, 15, 40, 40, 40, 15, 40, 40, 15, 13, 38, 38, 32, 21, 21, 33, 16, 38, 32, 21, 21, 33, 16, 38, 29,// 3 
      20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 28, 16, 12, 38, 12, 13, 14, 38, 12, 14, 38, 14, 38, 29, 20, 20, 28, 16, 12, 29, 20, 20, 28, 16, 38, 29,// 4 
      20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 28, 16, 38, 32, 21, 21, 21, 21, 21, 33, 16, 38, 38, 29, 28, 21, 25, 16, 13, 24, 21, 29, 28, 16, 38, 29,// 5 
      28, 21, 21, 21, 29, 20, 20, 20, 20, 20, 28, 16, 12, 29, 20, 20, 20, 20, 20, 28, 16, 12, 38, 29, 28, 18, 15, 38, 38, 40, 15, 29, 30, 33, 16, 29,// 6
      28, 18, 40, 15, 29, 28, 21, 21, 21, 21, 25, 16, 38, 24, 21, 21, 21, 21, 21, 21, 16, 38, 14, 29, 28, 16, 41, 41, 41, 41, 38, 29, 20, 28, 16, 29,// 7
      28, 16, 14, 38, 21, 21, 18, 40, 40, 40, 15, 38, 38, 40, 15, 15, 40, 40, 40, 15, 38, 38, 38, 29, 28, 16, 38, 38, 38, 38, 12, 29, 28, 21, 16, 29,// 8
      28, 16, 12, 38, 15, 40, 14, 38, 38, 38, 38, 14, 38, 38, 38, 38, 38, 38, 38, 38, 14, 38, 38, 29, 28, 16, 13, 38, 12, 38, 38, 29, 28, 18, 12, 29,// 9
      28, 16, 38, 38, 12, 14, 38, 14, 12, 14, 38, 41, 41, 38, 12, 38, 38, 14, 38, 38, 38, 38, 13, 29, 28, 16, 38, 38, 14, 38, 38, 29, 28, 16, 32, 31,// 10
      28, 16, 38, 38, 38, 38, 38, 38, 14, 38, 13, 38, 38, 38, 14, 38, 13, 38, 12, 32, 33, 16, 38, 29, 28, 16, 41, 41, 41, 41, 38, 29, 28, 16, 29, 20,// 11
      28, 16, 12, 13, 38, 38, 13, 38, 38, 12, 38, 38, 38, 38, 38, 38, 38, 38, 14, 29, 28, 16, 14, 21, 21, 16, 38, 38, 38, 38, 13, 21, 25, 16, 24, 33,// 12
      28, 16, 14, 38, 32, 33, 16, 38, 38, 38, 14, 12, 38, 38, 12, 14, 38, 12, 38, 29, 28, 16, 38, 15, 15, 38, 38, 14, 38, 38, 38, 40, 15, 38, 38, 36,// 13
      30, 21, 21, 21, 31, 30, 21, 21, 33, 21, 21, 21, 32, 21, 21, 21, 21, 21, 21, 31, 28, 16, 38, 32, 33, 16, 12, 38, 38, 38, 38, 32, 21, 33, 16, 36,// 14
      20, 20, 20, 20, 20, 20, 20, 20, 28, 18, 40, 15, 29, 20, 20, 20, 20, 20, 20, 20, 28, 16, 14, 29, 28, 16, 41, 41, 41, 41, 38, 29, 20, 28, 16, 36,// 15
      28, 21, 21, 21, 21, 21, 21, 21, 21, 16, 38, 38, 21, 21, 21, 21, 21, 21, 21, 21, 21, 16, 38, 29, 28, 16, 38, 13, 14, 38, 38, 29, 20, 28, 16, 36,// 16
      28, 18, 15, 40, 40, 40, 40, 40, 15, 38, 38, 38, 15, 40, 40, 15, 15, 40, 40, 15, 40, 38, 38, 29, 30, 21, 33, 16, 38, 32, 21, 31, 28, 21, 16, 32,// 17
      28, 16, 32, 21, 21, 21, 21, 21, 33, 16, 38, 12, 38, 38, 12, 38, 14, 38, 38, 14, 38, 38, 12, 29, 20, 20, 28, 16, 13, 29, 20, 20, 28, 18, 38, 29,// 18
      28, 16, 29, 20, 20, 20, 20, 20, 28, 16, 14, 38, 35, 21, 21, 21, 21, 21, 21, 35, 16, 38, 38, 21, 21, 21, 25, 16, 38, 24, 21, 21, 21, 16, 13, 29,// 19
      28, 16, 21, 21, 21, 29, 20, 20, 28, 16, 38, 38, 34, 18, 15, 40, 40, 15, 15, 34, 16, 38, 13, 40, 40, 15, 40, 14, 14, 40, 15, 40, 15, 38, 38, 29,// 20
      28, 16, 38, 38, 38, 29, 20, 20, 30, 21, 21, 21, 37, 16, 38, 12, 38, 14, 38, 42, 21, 21, 21, 21, 33, 16, 13, 38, 38, 38, 32, 21, 33, 16, 12, 33,// 21
      28, 16, 38, 12, 38, 29, 20, 20, 20, 20, 20, 20, 28, 16, 38, 14, 38, 12, 38, 29, 20, 20, 20, 20, 30, 21, 21, 21, 21, 21, 31, 20, 28, 16, 38, 36,// 22
      28, 16, 32, 21, 21, 31, 20, 20, 20, 20, 20, 20, 28, 16, 38, 38, 14, 38, 12, 29, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 28, 21, 16, 38, 36,// 23
      28, 16, 29, 20, 20, 20, 20, 20, 20, 20, 20, 20, 28, 16, 14, 38, 38, 14, 38, 29, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 28, 18, 38, 14, 36,// 24
      28, 16, 21, 21, 21, 21, 21, 29, 20, 20, 20, 20, 28, 16, 38, 38, 12, 38, 14, 29, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 28, 16, 12, 38, 36,// 25
      28, 16, 40, 40, 15, 40, 40, 29, 20, 28, 21, 21, 34, 16, 38, 13, 32, 21, 21, 37, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 29, 30, 21, 33, 16, 36,// 26
      30, 33, 16, 14, 38, 38, 38, 29, 20, 28, 18, 15, 21, 16, 38, 14, 29, 20, 20, 28, 18, 40, 15, 40, 40, 40, 40, 15, 15, 40, 29, 20, 20, 28, 16, 36,// 27
      20, 28, 16, 38, 38, 14, 38, 21, 21, 21, 16, 38, 15, 38, 38, 12, 21, 21, 21, 21, 16, 32, 33, 14, 32, 21, 33, 16, 38, 38, 21, 21, 21, 21, 16, 36,// 28
      20, 28, 16, 12, 38, 38, 38, 15, 40, 40, 38, 38, 32, 33, 16, 13, 40, 40, 15, 40, 38, 29, 30, 21, 31, 20, 28, 16, 38, 14, 15, 40, 40, 15, 12, 36,// 29
      20, 30, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 31, 30, 21, 21, 21, 21, 21, 21, 21, 31, 20, 20, 20, 20, 30, 21, 21, 21, 21, 21, 21, 21, 21, 21,//30
      20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,  //31
      20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,  //32
      20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,  //33
      20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,  //34
      20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 //35

    ]; 
    
    this.viewPort = {
      screen: [0, 0],
      startTile: [0, 0],
      endTile: [0, 0],
      offset: [0, 0],
      update: function(px, py) {
        this.offset[0] = Math.floor((this.screen[0] / 2) - px)
        this.offset[1] = Math.floor((this.screen[1] / 2) - py)

        let tile = [ Math.floor(px / 70), Math.floor(py / 70) ]

        this.startTile[0] = tile[0] - 1 - Math.ceil((this.screen[0] / 2) / 70)
        this.startTile[1] = tile[1] - 1 - Math.ceil((this.screen[1] / 2) / 70)

        if (this.startTile[0] < 0) this.startTile[0] = 0;
        if (this.startTile[1] < 0) this.startTile[1] = 0;


        this.endTile[0] = tile[0] + 1 + Math.ceil((this.screen[0] / 2) / 70)
        this.endTile[1] = tile[1] + 1 + Math.ceil((this.screen[1] / 2) / 70)

        if (this.endTile[0] >= 37) this.endTile[0] = 37 - 1;
        if (this.endTile[1] >= 32) this.endTile[1] = 32 - 1;
      }
    }
    
    this.floorTypes = {
      solid: 0,
      walkable: 1
    };


    this.tileTypes = {
      20: { type: "outOfMap", floor: this.floorTypes.solid, sprite: new Tile([14, 191], [70, 70]) },
      21: { type: "xWall", floor: this.floorTypes.solid, sprite: new Tile([13, 102], [70, 70]) },
      22: { type: "xWallPillDown", floor: this.floorTypes.solid, sprite: new Tile([103, 104], [70, 70]) },
      23: { type: "xWallPillUp", floor: this.floorTypes.solid, sprite: new Tile([456, 108], [70, 70]) },
      24: { type: "xWallDoorFrameR", floor: this.floorTypes.solid, sprite: new Tile([189, 101], [70, 70]) },
      25: { type: "xWallDoorFrameL", floor: this.floorTypes.solid, sprite: new Tile([277, 105], [70, 69]) },
      26: { type: "xDoor", floor: this.floorTypes.solid, sprite: new Tile([103, 194], [70, 70]) },
      27: { type: "xWallDecor", floor: this.floorTypes.solid, sprite: new Tile([165, 106], [70, 70]) },
      28: { type: "yWallL", floor: this.floorTypes.solid, sprite: new Tile([623, 107], [70, 70]) },
      29: { type: "yWallR", floor: this.floorTypes.solid, sprite: new Tile([539, 106], [70, 70]) },
      // 10: { type: "yDoor", floor: this.floorTypes.solid, sprite: new Tile([13, 95], [70, 70]) },
      // 11: { type: "spikes", floor: this.floorTypes.solid, sprite: new Tile([13, 95], [70, 70]) },
      12: { type: "groundReg", floor: this.floorTypes.walkable, sprite: new Tile([100, 7], [70, 70]) },
      13: { type: "groundReg2", floor: this.floorTypes.walkable, sprite: new Tile([189, 10], [70, 70]) },
      14: { type: "groundReg3", floor: this.floorTypes.walkable, sprite: new Tile([370, 12], [70, 70]) },
      15: { type: "groundTop", floor: this.floorTypes.walkable, sprite: new Tile([10, 7], [70, 70]) },
      16: { type: "groundL", floor: this.floorTypes.walkable, sprite: new Tile([459, 13], [70, 70]) },
      17: { type: "groundR", floor: this.floorTypes.walkable, sprite: new Tile([624, 15], [70, 70]) },
      18: { type: "groundLCorner", floor: this.floorTypes.walkable, sprite: new Tile([280, 10], [70, 70]) },
      19: { type: "groundRCorner", floor: this.floorTypes.walkable, sprite: new Tile([543, 14], [70, 70]) },
      30: { type: "bottomCornerPillL", floor: this.floorTypes.solid, sprite: new Tile([194, 196], [70, 70]) },
      31: { type: "bottomCornerPillR", floor: this.floorTypes.solid, sprite: new Tile([283, 197], [70, 70]) },
      32: { type: "bottomCornerUpL", floor: this.floorTypes.solid, sprite: new Tile([368, 198], [70, 70]) },
      33: { type: "bottomCornerUpR", floor: this.floorTypes.solid, sprite: new Tile([455, 198], [70, 70]) },
      34: { type: "narrowYL", floor: this.floorTypes.solid, sprite: new Tile([198, 308], [70, 70]) },
      35: { type: "narrowRL", floor: this.floorTypes.solid, sprite: new Tile([101, 308], [70, 70]) },
      36: { type: "mazeR", floor: this.floorTypes.walkable, sprite: new Tile([16, 310], [70, 70]) },
      37: { type: "narrowCustom", floor: this.floorTypes.solid, sprite: new Tile([418, 308], [70, 70]) },
      38: { type: "groundBlank", floor: this.floorTypes.walkable, sprite: new Tile([510, 308], [70, 70]) },
      40: { type: "groundTopAlt", floor: this.floorTypes.walkable, sprite: new Tile([597, 308], [70, 70]) },
      41: { type: "fakeOut", floor: this.floorTypes.solid, sprite: new Tile([370, 12], [70, 70]) },
      42: { type: "narrowC2", floor: this.floorTypes.solid, sprite: new Tile([102, 395], [70, 70]) }
    };

    // this.directions = {
    //   up: 0,
    //   right: 1,
    //   down: 2,
    //   left: 3
    // };
  }


};



import Player from "./player"
import Sprite from "./sprite";

export default class Board {
  constructor() {
    this.gameBoard = document.getElementById("gameBoard"); 
    this.ctx = this.gameBoard.getContext('2d');
    this.gameBoard.width = 1500;
    this.gameBoard.height = 700;
    this.tileWidth = 70;
    this.tileHeight = 70;
    this.mapWidth = 20;
    this.mapHeight = 10;
    this.gameMap =  [
  //   0   1   2   3  4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19 
      28, 21, 21, 21, 29, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, // 0
      28, 18, 15, 15, 29, 28, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 20, // 1
      28, 16, 12, 14, 21, 21, 18, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 20, // 2
      28, 16, 12, 13, 15, 15, 12, 12, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 20, // 3
      28, 16, 12, 12, 12, 13, 13, 12, 12, 12, 12, 12, 12, 12, 12, 12, 14, 14, 14, 20, // 4
      28, 16, 14, 14, 14, 14, 13, 13, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 20, // 5
      28, 16, 12, 12, 14, 14, 13, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 20, // 6
      28, 16, 12, 12, 32, 33, 16, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 20, // 7
      30, 21, 21, 21, 31, 30, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 20, // 8
      20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20  // 9

    ];  
    
    this.floorTypes = {
      solid: 0,
      walkable: 1
    };


    this.tileTypes = {
      20: { type: "outOfMap", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/dungeonTiles.png", [14, 191], [70, 70]) },
      21: { type: "xWall", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/dungeonTiles.png", [13, 102], [70, 70]) },
      22: { type: "xWallPillDown", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/dungeonTiles.png", [103, 104], [70, 70]) },
      23: { type: "xWallPillUp", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/dungeonTiles.png", [456, 108], [70, 70]) },
      24: { type: "xWallDoorFrameR", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/dungeonTiles.png", [200, 101], [70, 70]) },
      25: { type: "xWallDoorFrameL", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/dungeonTiles.png", [207, 144], [70, 70]) },
      26: { type: "xDoor", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/dungeonTiles.png", [103, 194], [70, 70]) },
      27: { type: "xWallDecor", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/dungeonTiles.png", [165, 106], [70, 70]) },
      28: { type: "yWallL", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/dungeonTiles.png", [623, 107], [70, 70]) },
      29: { type: "yWallR", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/dungeonTiles.png", [539, 106], [70, 70]) },
      // 10: { type: "yDoor", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/dungeonTiles.png", [13, 95], [70, 70]) },
      // 11: { type: "spikes", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/dungeonTiles.png", [13, 95], [70, 70]) },
      12: { type: "groundReg", floor: this.floorTypes.walkable, sprite: new Sprite("./src/images/dungeonTiles.png", [100, 7], [70, 70]) },
      13: { type: "groundReg2", floor: this.floorTypes.walkable, sprite: new Sprite("./src/images/dungeonTiles.png", [189, 10], [70, 70]) },
      14: { type: "groundReg3", floor: this.floorTypes.walkable, sprite: new Sprite("./src/images/dungeonTiles.png", [370, 12], [70, 70]) },
      15: { type: "groundTop", floor: this.floorTypes.walkable, sprite: new Sprite("./src/images/dungeonTiles.png", [10, 7], [70, 70]) },
      16: { type: "groundL", floor: this.floorTypes.walkable, sprite: new Sprite("./src/images/dungeonTiles.png", [459, 13], [70, 70]) },
      17: { type: "groundR", floor: this.floorTypes.walkable, sprite: new Sprite("./src/images/dungeonTiles.png", [624, 15], [70, 70]) },
      18: { type: "groundLCorner", floor: this.floorTypes.walkable, sprite: new Sprite("./src/images/dungeonTiles.png", [280, 10], [70, 70]) },
      19: { type: "groundRCorner", floor: this.floorTypes.walkable, sprite: new Sprite("./src/images/dungeonTiles.png", [543, 14], [70, 70]) },
      30: { type: "bottomCornerPillL", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/dungeonTiles.png", [194, 196], [70, 70]) },
      31: { type: "bottomCornerPillR", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/dungeonTiles.png", [283, 197], [70, 70]) },
      32: { type: "bottomCornerUpL", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/dungeonTiles.png", [368, 198], [70, 70]) },
      33: { type: "bottomCornerUpR", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/dungeonTiles.png", [455, 198], [70, 70]) }
    };

    // this.directions = {
    //   up: 0,
    //   right: 1,
    //   down: 2,
    //   left: 3
    // };
  }


};



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
  //  0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 
      8, 1, 1, 1, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 0
      8, 18, 15, 15, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, // 1
      8, 12, 12, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, // 2
      0, 12, 12, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, // 3
      0, 12, 12, 12, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, // 4
      0, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, // 5
      0, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, // 6
      0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, // 7
      0, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, // 8
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 // 9

    ];  
    
    this.floorTypes = {
      solid: 0,
      walkable: 1
    };


    this.tileTypes = {
      0: { type: "outOfMap", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/DungeonTiles.png", [14, 191], [70, 70]) },
      1: { type: "xWall", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/DungeonTiles.png", [13, 102], [70, 70]) },
      2: { type: "xWallPillDown", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/DungeonTiles.png", [103, 104], [70, 70]) },
      3: { type: "xWallPillUp", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/DungeonTiles.png", [456, 108], [70, 70]) },
      4: { type: "xWallDoorFrameR", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/DungeonTiles.png", [200, 101], [70, 70]) },
      5: { type: "xWallDoorFrameL", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/DungeonTiles.png", [207, 144], [70, 70]) },
      6: { type: "xDoor", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/DungeonTiles.png", [103, 194], [70, 70]) },
      7: { type: "xWallDecor", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/DungeonTiles.png", [165, 106], [70, 70]) },
      8: { type: "yWallL", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/DungeonTiles.png", [623, 107], [70, 70]) },
      9: { type: "yWallR", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/DungeonTiles.png", [539, 106], [70, 70]) },
      // 10: { type: "yDoor", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/DungeonTiles.png", [13, 95], [70, 70]) },
      // 11: { type: "spikes", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/DungeonTiles.png", [13, 95], [70, 70]) },
      12: { type: "groundReg", floor: this.floorTypes.walkable, sprite: new Sprite("./src/images/DungeonTiles.png", [100, 7], [70, 70]) },
      13: { type: "groundReg2", floor: this.floorTypes.walkable, sprite: new Sprite("./src/images/DungeonTiles.png", [189, 10], [70, 70]) },
      14: { type: "groundReg3", floor: this.floorTypes.walkable, sprite: new Sprite("./src/images/DungeonTiles.png", [370, 12], [70, 70]) },
      15: { type: "groundTop", floor: this.floorTypes.walkable, sprite: new Sprite("./src/images/DungeonTiles.png", [10, 7], [70, 70]) },
      16: { type: "groundL", floor: this.floorTypes.walkable, sprite: new Sprite("./src/images/DungeonTiles.png", [459, 13], [70, 70]) },
      17: { type: "groundR", floor: this.floorTypes.walkable, sprite: new Sprite("./src/images/DungeonTiles.png", [624, 15], [70, 70]) },
      18: { type: "groundLCorner", floor: this.floorTypes.walkable, sprite: new Sprite("./src/images/DungeonTiles.png", [280, 10], [70, 70]) },
      19: { type: "groundRCorner", floor: this.floorTypes.walkable, sprite: new Sprite("./src/images/DungeonTiles.png", [543, 14], [70, 70]) }
    };

    this.directions = {
      up: 0,
      right: 1,
      down: 2,
      left: 3
    };


  }


};



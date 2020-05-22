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
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];  
    
    this.floorTypes = {
      solid: 0,
      walkable: 1
    };

    // this.tileSet = null, tileSetUrl = 

    this.tileTypes = {
      0: { type: "outOfMap", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/dTilesImproved.jpg", [13, 95], [70, 70]) },
      1: { type: "xWall", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/dTilesImproved.jpg", [13, 95], [70, 70]) },
      2: { type: "xWallPillDown", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/dTilesImproved.jpg", [13, 95], [70, 70]) },
      3: { type: "xWallPillUp", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/dTilesImproved.jpg", [13, 95], [70, 70]) },
      4: { type: "xWallDoorFrameR", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/dTilesImproved.jpg", [13, 95], [70, 70]) },
      5: { type: "xWallDoorFrameL", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/dTilesImproved.jpg", [13, 95], [70, 70]) },
      6: { type: "xDoor", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/dTilesImproved.jpg", [13, 95], [70, 70]) },
      7: { type: "xWallDecor", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/dTilesImproved.jpg", [13, 95], [70, 70]) },
      8: { type: "yWall", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/dTilesImproved.jpg", [13, 95], [70, 70]) },
      9: { type: "yDoor", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/dTilesImproved.jpg", [13, 95], [70, 70]) },
      10: { type: "spikes", floor: this.floorTypes.solid, sprite: new Sprite("./src/images/dTilesImproved.jpg", [13, 95], [70, 70]) },
      11: { type: "groundReg", floor: this.floorTypes.walkable, sprite: new Sprite("./src/images/dTilesImproved.jpg", [13, 16], [70, 70]) },
      12: { type: "groundReg2", floor: this.floorTypes.walkable, sprite: new Sprite("./src/images/dTilesImproved.jpg", [13, 16], [70, 70]) },
      13: { type: "groundReg3", floor: this.floorTypes.walkable, sprite: new Sprite("./src/images/dTilesImproved.jpg", [13, 16], [70, 70]) },
      14: { type: "groundTop", floor: this.floorTypes.walkable, sprite: new Sprite("./src/images/dTilesImproved.jpg", [13, 16], [70, 70]) },
      15: { type: "groundL", floor: this.floorTypes.walkable, sprite: new Sprite("./src/images/dTilesImproved.jpg", [13, 16], [70, 70]) },
      16: { type: "groundR", floor: this.floorTypes.walkable, sprite: new Sprite("./src/images/dTilesImproved.jpg", [13, 16], [70, 70]) },
      17: { type: "groundLCorner", floor: this.floorTypes.walkable, sprite: new Sprite("./src/images/dTilesImproved.jpg", [13, 16], [70, 70]) },
      18: { type: "groundRCorner", floor: this.floorTypes.walkable, sprite: new Sprite("./src/images/dTilesImproved.jpg", [13, 16], [70, 70]) }
    };

    this.directions = {
      up: 0,
      right: 1,
      down: 2,
      left: 3
    };


  }


};



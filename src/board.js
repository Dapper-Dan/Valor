import Player from "./player"

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
      0, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];  
    
    this.floorTypes = {
      solid: 0,
      walkable: 1
    };

    this.tileTypes = {
      0: { color: "#000000", type: "wall", floor: this.floorTypes.solid },
      1: { color: "#808080", type: "ground", floor: this.floorTypes.walkable },
      2: { color: "#0000ff", type: "water", floor: this.floorTypes.solid },
      3: { color: "#ffa500", type: "debrisPillar", floor: this.floorTypes.solid },
      4: { color: "#ffffff", type: "bridge", floor: this.floorTypes.walkable }
    };


  }


};



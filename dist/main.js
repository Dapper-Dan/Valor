/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Board; });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sprite */ \"./src/sprite.js\");\n\r\n\r\n\r\nclass Board {\r\n  constructor() {\r\n    this.gameBoard = document.getElementById(\"gameBoard\"); \r\n    this.ctx = this.gameBoard.getContext('2d');\r\n    this.gameBoard.width = 1500;\r\n    this.gameBoard.height = 700;\r\n    this.tileWidth = 70;\r\n    this.tileHeight = 70;\r\n    this.mapWidth = 20;\r\n    this.mapHeight = 10;\r\n    this.gameMap =  [\r\n      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,\r\n      0, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,\r\n      0, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,\r\n      0, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,\r\n      0, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,\r\n      0, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,\r\n      0, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,\r\n      0, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,\r\n      0, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,\r\n      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0\r\n    ];  \r\n    \r\n    this.floorTypes = {\r\n      solid: 0,\r\n      walkable: 1\r\n    };\r\n\r\n    this.tileTypes = {\r\n      0: { color: \"#000000\", type: \"wall\", floor: this.floorTypes.solid, sprite: new _sprite__WEBPACK_IMPORTED_MODULE_1__[\"default\"]([0, 0], [40, 40]) },\r\n      1: { color: \"#808080\", type: \"ground\", floor: this.floorTypes.walkable, sprite: new _sprite__WEBPACK_IMPORTED_MODULE_1__[\"default\"]([40, 40], [40, 40]) },\r\n      2: { color: \"#0000ff\", type: \"water\", floor: this.floorTypes.solid, sprite: new _sprite__WEBPACK_IMPORTED_MODULE_1__[\"default\"]([80, 80], [40, 40]) },\r\n      3: { color: \"#ffa500\", type: \"debrisPillar\", floor: this.floorTypes.solid, sprite: new _sprite__WEBPACK_IMPORTED_MODULE_1__[\"default\"]([120, 120], [40, 40]) },\r\n      4: { color: \"#ffffff\", type: \"bridge\", floor: this.floorTypes.walkable, sprite: new _sprite__WEBPACK_IMPORTED_MODULE_1__[\"default\"]([160, 160], [40, 40]) }\r\n    };\r\n\r\n    this.directions = {\r\n      up: 0,\r\n      right: 1,\r\n      down: 2,\r\n      left: 3\r\n    };\r\n\r\n\r\n  }\r\n\r\n\r\n};\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Game; });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _monster__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./monster */ \"./src/monster.js\");\n/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./board */ \"./src/board.js\");\n/* harmony import */ var _keys__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./keys */ \"./src/keys.js\");\n\r\n\r\n\r\n\r\n\r\nclass Game {\r\n  constructor() {\r\n    this.board = new _board__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\r\n    this.player = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n    this.keys = _keys__WEBPACK_IMPORTED_MODULE_3__[\"keysDown\"];\r\n    this.currentSecond = 0;\r\n    this.frameCount = 0;\r\n    this.framesLastSecond = 0;\r\n    this.lastFrameTime = 0; \r\n    this.drawGame = this.drawGame.bind(this)\r\n  }\r\n\r\n  \r\n  drawGame() {\r\n    let currentFrameTime = Date.now();\r\n    let timeElapsed = currentFrameTime - this.lastFrameTime\r\n\r\n    let sec = Math.floor(Date.now()/1000);\r\n    if (sec !== this.currentSecond) {\r\n      this.currentSecond = sec;\r\n      this.framesLastSecond = this.frameCount; \r\n      this.frameCount = 1;\r\n    } else {\r\n      this.frameCount++;\r\n    }\r\n    \r\n    if (!this.player.handleMove(currentFrameTime)) {\r\n      this.checkValidMove(currentFrameTime)\r\n    }\r\n\r\n    for (let y = 0; y < this.board.mapHeight; y++) {\r\n      for (let x = 0; x < this.board.mapWidth; x++) {\r\n        this.board.ctx.fillStyle = this.board.tileTypes[this.board.gameMap[this.player.toIndex(x, y)]].color;\r\n        this.board.ctx.fillRect(x * this.board.tileWidth, y * this.board.tileHeight, this.board.tileWidth, this.board.tileHeight);\r\n      }\r\n    }\r\n\r\n    this.board.ctx.fillStyle = \"#ff0000\";\r\n    this.board.ctx.fillRect(this.player.mapPos[0], this.player.mapPos[1], this.player.size[0], this. player.size[1]);\r\n\r\n    this.board.ctx.fillStyle = \"#ff0000\";\r\n    this.board.ctx.fillText(`FPS: ${this.framesLastSecond}`, 10, 20);\r\n    \r\n    this.lastFrameTime = currentFrameTime;\r\n    requestAnimationFrame(this.drawGame);\r\n  }\r\n\r\n  checkValidMove(currentFrameTime) {\r\n    if (this.keys[37] && this.player.canMoveLeft()) {\r\n      this.player.moveLeft(currentFrameTime);\r\n    } else if (this.keys[38] && this.player.canMoveUp()) {\r\n      this.player.moveUp(currentFrameTime);\r\n    } else if (this.keys[39] && this.player.canMoveRight()) {\r\n      this.player.moveRight(currentFrameTime);\r\n    } else if (this.keys[40] && this.player.canMoveDown()) {\r\n      this.player.moveDown(currentFrameTime);\r\n    }\r\n  }\r\n\r\n};\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", function () {\r\n    const game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n    requestAnimationFrame(game.drawGame);\r\n\r\n    window.addEventListener(\"keydown\", function(e) {\r\n      if (e.keyCode >= 37 && e.keyCode <= 40) game.keys[e.keyCode] = true;   \r\n    });\r\n\r\n    window.addEventListener(\"keyup\", function(e) {\r\n      if (e.keyCode >= 37 && e.keyCode <= 40) game.keys[e.keyCode] = false;   \r\n    });\r\n  \r\n\r\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/keys.js":
/*!*********************!*\
  !*** ./src/keys.js ***!
  \*********************/
/*! exports provided: keysDown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"keysDown\", function() { return keysDown; });\nconst keysDown = {\r\n  37: false,\r\n  38: false,\r\n  39: false,\r\n  40: false\r\n};\n\n//# sourceURL=webpack:///./src/keys.js?");

/***/ }),

/***/ "./src/monster.js":
/*!************************!*\
  !*** ./src/monster.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Monster; });\nclass Monster {\r\n  constructor() {\r\n    \r\n  }\r\n  \r\n};\n\n//# sourceURL=webpack:///./src/monster.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Player; });\n/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ \"./src/board.js\");\n\r\n\r\nclass Player {\r\n  constructor() {\r\n    this.currentPos = [1, 1];\r\n    this.nextPos = [1, 1];\r\n    this.timeStart = 0;\r\n    this.delayMove = 800;\r\n    this.size = [30, 30];\r\n    this.mapPos = [45, 45];\r\n    this.sampleBoard = new _board__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n    this.direction = this.sampleBoard.directions.up // change to right?\r\n  }\r\n\r\n\r\n  move(x, y) {\r\n    this.currentPos = [x, y];\r\n    this.nextPos = [x, y];\r\n    this.mapPos = [\r\n      (this.sampleBoard.tileWidth * x) + ((this.sampleBoard.tileWidth - this.size[0]) / 2), \r\n      (this.sampleBoard.tileHeight * y) + ((this.sampleBoard.tileHeight - this.size[1]) / 2)\r\n    ];\r\n  }\r\n\r\n  handleMove(currentTime) {\r\n    if (this.currentPos[0] === this.nextPos[0] && this.currentPos[1] === this.nextPos[1]) return false;\r\n\r\n    if ((currentTime - this.timeStart) >= this.delayMove ) {\r\n      this.move(this.nextPos[0], this.nextPos[1]);\r\n    } else {\r\n      this.getMapPos();\r\n      this.checkDirectionAndAdjust(currentTime);\r\n      this.mapPos[0] = Math.round(this.mapPos[0]);\r\n      this.mapPos[1] = Math.round(this.mapPos[1]);\r\n    }\r\n\r\n    return true;\r\n  }\r\n\r\n  getMapPos() {\r\n    this.mapPos[0] = (this.currentPos[0] * this.sampleBoard.tileWidth) + ((this.sampleBoard.tileWidth - this.size[0]) / 2);\r\n    this.mapPos[1] = (this.currentPos[1] * this.sampleBoard.tileHeight) + ((this.sampleBoard.tileHeight - this.size[1]) / 2);\r\n  }\r\n\r\n  checkDirectionAndAdjust(currentTime) {\r\n    if (this.nextPos[0] !== this.currentPos[0]) {\r\n      let pixelDist = (this.sampleBoard.tileWidth / this.delayMove) * (currentTime - this.timeStart);\r\n\r\n      if (this.nextPos[0] < this.currentPos[0]) {\r\n        this.mapPos[0] += (0 - pixelDist);\r\n      } else {\r\n        this.mapPos[0] += (pixelDist);\r\n      }\r\n    } else {\r\n      let pixelDist = (this.sampleBoard.tileHeight / this.delayMove) * (currentTime - this.timeStart);\r\n\r\n      if (this.nextPos[1] < this.currentPos[1]) {\r\n        this.mapPos[1] += (0 - pixelDist);\r\n      } else {\r\n        this.mapPos[1] += (pixelDist);\r\n      }\r\n    }\r\n  }\r\n\r\n  toIndex(x, y) {\r\n    return ((y * this.sampleBoard.mapWidth) + x);\r\n  }\r\n\r\n  isWalkable(x, y) {\r\n    if (x < 0 || x >= this.sampleBoard.mapWidth || y < 0 || y >= this.sampleBoard.mapHeight) return false;\r\n    if (this.sampleBoard.tileTypes[this.sampleBoard.gameMap[this.toIndex(x, y)]].floor !== this.sampleBoard.floorTypes.walkable) return false; \r\n    return true;\r\n  }\r\n\r\n  canMoveUp() {\r\n    return this.isWalkable(this.currentPos[0], this.currentPos[1] - 1);\r\n  }\r\n\r\n  canMoveDown() {\r\n    return this.isWalkable(this.currentPos[0], this.currentPos[1] + 1);\r\n  }\r\n\r\n  canMoveLeft() {\r\n    return this.isWalkable(this.currentPos[0] - 1, this.currentPos[1]);\r\n  }\r\n\r\n  canMoveRight() {\r\n    return this.isWalkable(this.currentPos[0] + 1, this.currentPos[1]);\r\n  }\r\n\r\n  moveUp(currentGameTime) {\r\n    this.nextPos[1] -= 1;\r\n    this.timeStart = currentGameTime;\r\n    this.direction = this.sampleBoard.directions.up;\r\n  }\r\n  \r\n  moveDown(currentGameTime) {\r\n    this.nextPos[1] += 1;\r\n    this.timeStart = currentGameTime;\r\n    this.direction = this.sampleBoard.directions.down;\r\n  }\r\n\r\n  moveLeft(currentGameTime) {\r\n    this.nextPos[0] -= 1;\r\n    this.timeStart = currentGameTime;\r\n    this.direction = this.sampleBoard.directions.left;\r\n  }\r\n\r\n  moveRight(currentGameTime) {\r\n    this.nextPos[0] += 1;\r\n    this.timeStart = currentGameTime;\r\n    this.direction = this.sampleBoard.directions.right;\r\n  }\r\n\r\n};\r\n\r\n\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ }),

/***/ "./src/sprite.js":
/*!***********************!*\
  !*** ./src/sprite.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Sprite; });\n/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ \"./src/board.js\");\n\r\n\r\n\r\nclass Sprite {\r\n  constructor(url, pos, size, speed, dir, frames) {\r\n    // this.url = url;\r\n    this.pos = pos;\r\n    this.size = size;\r\n    // this.speed= speed;\r\n    // this.dir = dir;\r\n    // this.frames = frames;\r\n    // this._index = 0;\r\n  }\r\n\r\n};\n\n//# sourceURL=webpack:///./src/sprite.js?");

/***/ })

/******/ });
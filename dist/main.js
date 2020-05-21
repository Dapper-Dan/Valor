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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Board; });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n\r\n\r\nclass Board {\r\n  constructor() {\r\n    this.gameBoard = document.getElementById(\"gameBoard\"); \r\n    this.ctx = this.gameBoard.getContext('2d');\r\n    this.gameBoard.width = 1500;\r\n    this.gameBoard.height = 700;\r\n    this.tileWidth = 70;\r\n    this.tileHeight = 70;\r\n    this.mapWidth = 20;\r\n    this.mapHeight = 10;\r\n    this.gameMap =  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,\r\n                     0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,\r\n                     0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,\r\n                     0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,\r\n                     0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,\r\n                     0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,\r\n                     0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,\r\n                     0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,\r\n                     0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,\r\n                     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];  \r\n  }\r\n\r\n};\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Game; });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _monster__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./monster */ \"./src/monster.js\");\n/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./board */ \"./src/board.js\");\n/* harmony import */ var _keys__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./keys */ \"./src/keys.js\");\n\r\n\r\n\r\n\r\n\r\nclass Game {\r\n  constructor() {\r\n    this.board = new _board__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\r\n    this.player = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n    this.keys = _keys__WEBPACK_IMPORTED_MODULE_3__[\"keysDown\"];\r\n    this.currentSecond = 0;\r\n    this.frameCount = 0;\r\n    this.framesLastSecond = 0;\r\n    this.lastFrameTime = 0; \r\n    this.drawGame = this.drawGame.bind(this)\r\n  }\r\n\r\n  \r\n  drawGame() {\r\n    let currentFrameTime = Date.now();\r\n    let timeElapsed = currentFrameTime - this.lastFrameTime\r\n\r\n    let sec = Math.floor(Date.now()/1000);\r\n    if (sec !== this.currentSecond) {\r\n      this.currentSecond = sec;\r\n      this.framesLastSecond = this.frameCount; \r\n      this.frameCount = 1;\r\n    } else {\r\n      this.frameCount++;\r\n    }\r\n    \r\n    if (!this.player.handleMove(currentFrameTime)) {\r\n      this.checkValidMove()\r\n      if (this.player.currentPos[0] !== this.player.nextPos[0] || this.player.currentPos[1] !== this.player.nextPos[1]) this.player.timeStart = currentFrameTime;\r\n    }\r\n\r\n\r\n\r\n    for (let y = 0; y < this.board.mapHeight; y++) {\r\n      for (let x = 0; x < this.board.mapWidth; x++) {\r\n        switch(this.board.gameMap[((y * this.board.mapWidth) + x)]) {\r\n          case 0:\r\n            this.board.ctx.fillStyle = \"#999999\";\r\n            break;\r\n          case 1:\r\n            this.board.ctx.fillStyle = \"#12c934\";\r\n        }\r\n\r\n        this.board.ctx.fillRect(x * this.board.tileWidth, y * this.board.tileHeight, this.board.tileWidth, this.board.tileHeight);\r\n      }\r\n    }\r\n\r\n    this.board.ctx.fillStyle = \"#ff0000\";\r\n    this.board.ctx.fillRect(this.player.mapPos[0], this.player.mapPos[1], this.player.size[0], this. player.size[1]);\r\n\r\n    this.board.ctx.fillStyle = \"#ff0000\";\r\n    this.board.ctx.fillText(`FPS: ${this.framesLastSecond}`, 10, 20);\r\n    \r\n    this.lastFrameTime = currentFrameTime;\r\n    requestAnimationFrame(this.drawGame);\r\n  }\r\n\r\n  checkValidMove() {\r\n    if (this.keys[37] && this.player.currentPos[0] > 0 && this.board.gameMap[this.player.toIndex(this.player.currentPos[0] - 1, this.player.currentPos[1])] === 1) {\r\n      this.player.nextPos[0] -= 1;\r\n    } else if (this.keys[38] && this.player.currentPos[1] > 0 && this.board.gameMap[this.player.toIndex(this.player.currentPos[0], this.player.currentPos[1] - 1)]  === 1) {\r\n      this.player.nextPos[1] -= 1;\r\n    } else if (this.keys[39] && this.player.currentPos[0] < (this.board.mapWidth - 1) && this.board.gameMap[this.player.toIndex(this.player.currentPos[0] + 1, this.player.currentPos[1])] === 1) {\r\n      this.player.nextPos[0] += 1;\r\n    } else if (this.keys[40] && this.player.currentPos[1] < (this.board.mapHeight - 1) && this.board.gameMap[this.player.toIndex(this.player.currentPos[0], this.player.currentPos[1] + 1)]  === 1) {\r\n      this.player.nextPos[1] += 1;\r\n    }\r\n  }\r\n\r\n\r\n};\n\n//# sourceURL=webpack:///./src/game.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Player; });\n/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ \"./src/board.js\");\n\r\n\r\nclass Player {\r\n  constructor() {\r\n    this.currentPos = [1, 1];\r\n    this.nextPos = [1, 1];\r\n    this.timeStart = 0;\r\n    this.delayMove = 800;\r\n    this.size = [40, 40];\r\n    this.mapPos = [45, 45];\r\n    this.sampleBoard = new _board__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n  }\r\n\r\n\r\n  move(x, y) {\r\n    this.currentPos = [x, y];\r\n    this.nextPos = [x, y];\r\n    this.mapPos = [\r\n      (this.sampleBoard.tileWidth * x) + ((this.sampleBoard.tileWidth - this.size[0]) / 2), \r\n      (this.sampleBoard.tileHeight * y) + ((this.sampleBoard.tileHeight - this.size[1]) / 2)\r\n    ];\r\n  }\r\n\r\n  handleMove(currentTime) {\r\n    if (this.currentPos[0] === this.nextPos[0] && this.currentPos[1] === this.nextPos[1]) return false;\r\n\r\n    if ((currentTime - this.timeStart) >= this.delayMove ) {\r\n      this.move(this.nextPos[0], this.nextPos[1]);\r\n    } else {\r\n      this.getMapPos();\r\n      this.checkDirectionAndAdjust(currentTime);\r\n      this.mapPos[0] = Math.round(this.mapPos[0]);\r\n      this.mapPos[1] = Math.round(this.mapPos[1]);\r\n    }\r\n\r\n    return true;\r\n  }\r\n\r\n  getMapPos() {\r\n    this.mapPos[0] = (this.currentPos[0] * this.sampleBoard.tileWidth) + ((this.sampleBoard.tileWidth - this.size[0]) / 2);\r\n    this.mapPos[1] = (this.currentPos[1] * this.sampleBoard.tileHeight) + ((this.sampleBoard.tileHeight - this.size[1]) / 2);\r\n  }\r\n\r\n  checkDirectionAndAdjust(currentTime) {\r\n    if (this.nextPos[0] !== this.currentPos[0]) {\r\n      let pixelDist = (this.sampleBoard.tileWidth / this.delayMove) * (currentTime - this.timeStart);\r\n\r\n      if (this.nextPos[0] < this.currentPos[0]) {\r\n        this.mapPos[0] += (0 - pixelDist);\r\n      } else {\r\n        this.mapPos[0] += (pixelDist);\r\n      }\r\n    } else {\r\n      let pixelDist = (this.sampleBoard.tileHeight / this.delayMove) * (currentTime - this.timeStart);\r\n\r\n      if (this.nextPos[1] < this.currentPos[1]) {\r\n        this.mapPos[1] += (0 - pixelDist);\r\n      } else {\r\n        this.mapPos[1] += (pixelDist);\r\n      }\r\n    }\r\n  }\r\n\r\n  toIndex(x, y) {\r\n    return ((y * this.sampleBoard.mapWidth) + x);\r\n  }\r\n\r\n};\r\n\r\n\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ })

/******/ });
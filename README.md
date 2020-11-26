# Valor

A top-down roguelike video game with an old school arcade style. The king and guard have left for vacation. They mistakenly forgot that their best warrior was patrolling the dungeon and locked the door behind them. The future doesn't look good.
You will most likely only survive for a day or two so you might as well take out as many baddies down there as you can and leave your name in histoy! Do you have the valor?

### [Live Game](https://dapper-dan.github.io/Valor/)

![Valor Screen Shot](https://github.com/Dapper-Dan/Valor/blob/master/src/images/Screenshot.png)

## Technology 
- JavaScript
- HTML

## The Rundown
Upon loading into the game, you are greeted with a landing page that contains information about the enemies in the game, a backstory, and instructions on how to play. 

![Valor Menu](https://github.com/Dapper-Dan/Valor/blob/master/src/images/Screenshot2.png)

The goal of the game is simple, explore the dungeon and slay as many enemies as you can before you die. You have unlimited arrows but only one life. The enemies' movements all vary from being on a horizontal track to proximity tracking to full pathfinding. 

![Valor Recording](https://github.com/Dapper-Dan/Valor/blob/master/src/images/valorRecording.gif)

Pathfinding was by far the most difficult mechanic to implement. The following code shows just how complex it is.

```
export default function findPath(world, pathStart, pathEnd) { 
    var worldWidth = 36; 
	var worldHeight = 36; 
    var worldSize =	worldWidth * worldHeight; 
    
    var distanceFunction = ManhattanDistance;
    var findNeighbours = function(){};
    
    function ManhattanDistance(Point, Goal) {
		return Math.abs(Point.x - Goal.x) + Math.abs(Point.y - Goal.y);
    }

    function Neighbours(x, y) {
		var	N = y - 1,
		S = y + 1,
		E = x + 1,
		W = x - 1,
		myN = N > -1 && canWalkHere(x, N),
		myS = S < worldHeight && canWalkHere(x, S),
		myE = E < worldWidth && canWalkHere(E, y),
        myW = W > -1 && canWalkHere(W, y),
        result = [];
		if (myN) result.push({x:x, y:N});
        
		if (myE) result.push({x:E, y:y});
        
		if (myS) result.push({x:x, y:S});
        
		if (myW) result.push({x:W, y:y});
        
		findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
		return result;
	}
    
    function canWalkHere(x, y) {
		return (board.tileTypes[world[x + y * 36]].floor === 1);
    };
    
    function Node(Parent, Point) {
		var newNode = {
			Parent:Parent,
			value:Point.x + (Point.y * worldWidth),
			x:Point.x,
			y:Point.y,
			f:0,
			g:0
		};

		return newNode;
    }
    
    function calculatePath() {
		var	mypathStart = Node(null, {x:pathStart[0], y:pathStart[1]});
		var mypathEnd = Node(null, {x:pathEnd[0], y:pathEnd[1]});
		var AStar = new Array(worldSize);
		var Open = [mypathStart];
		var Closed = [];
		var result = [];
		var myNeighbours;
		var myNode;
		var myPath;
		var length, max, min, i, j;
		
		while(length = Open.length){
			max = worldSize;
			min = -1;
			for (i = 0; i < length; i++) {
				if(Open[i].f < max) {
					max = Open[i].f;
					min = i;
				}
			}
			
			myNode = Open.splice(min, 1)[0];
		
			if (myNode.value === mypathEnd.value) {
				myPath = Closed[Closed.push(myNode) - 1];
				do {
					result.push([myPath.x, myPath.y]);
				}
				while (myPath = myPath.Parent);
			
				AStar = Closed = Open = [];
				
				result.reverse();
			} else {
				myNeighbours = Neighbours(myNode.x, myNode.y);
				for (i = 0, j = myNeighbours.length; i < j; i++) {
					myPath = Node(myNode, myNeighbours[i]);
					if (!AStar[myPath.value]) {
						myPath.g = myNode.g + distanceFunction(myNeighbours[i], myNode);
						myPath.f = myPath.g + distanceFunction(myNeighbours[i], mypathEnd);
						Open.push(myPath);
						AStar[myPath.value] = true;
					}
				}
				Closed.push(myNode);
			}
		} 
		return result;
	}

    return calculatePath();
}

```


var cols = 50;
var rows = 50;

var openSet = [];
var closedSet = [];
var start;
var end;
var path = [];
var w, h;

function RemoveFromArrayFnc(curr, openSet) {
  for (i = openSet.length - 1; i >= 0; i--) {
    if (openSet[i] == curr) {
      openSet.splice(i, 1);
    }
  }
}

function Spot(x, y) {
  this.x = x;
  this.y = y;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbors = [];
  this.previous = undefined;

  this.addNeighbors = function (grid) {
    var x = this.x;
    var y = this.y;

    if (this.x < cols - 1) {
      this.neighbors.push(grid[x + 1][y]);
    }

    if (this.x > 0) {
      this.neighbors.push(grid[x - 1][y]);

    }

    if (this.y < rows - 1) {
      this.neighbors.push(grid[x][y + 1]);

    }

    if (this.y > 0) {
      this.neighbors.push(grid[x][y - 1]);   
    }

  }

  this.show = function (col) {
    fill(col);
    noStroke();
    rect(this.x * w, this.y * h, w, h);
  }

}

var grid = new Array();

function setup() {
  createCanvas(400, 400);

  w = width / cols;
  h = height / rows;

  console.log('A*');

  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  start = grid[0][0];
  end = grid[cols - 1][5];

  openSet.push(start);
  console.log(grid);
}

function heuristic(a, b) {
  
 // var d = dist(a.x, a.y, b.x, b.y);
 var d = abs(a.x -b.x) + abs(a.y +b.y);
  return d;
}


function draw() {
  background(0);

  if (openSet.length >= 0) {
    var lowestIndex = 0;
    for (i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestIndex].f) {
        lowestIndex = i;
      }
    }
    var current = openSet[lowestIndex];
    if (current === end) {
      noLoop();
      console.log("Done!");
    }

    //openSet.remove(current);
    closedSet.push(current);
    RemoveFromArrayFnc(current, openSet);
    
    for (i = 0; i < current.neighbors.length; i++) {
      
      if (!closedSet.includes(current.neighbors[i])) {
        
        var tempG = current.neighbors[i].g = current.g + 1;

        if (openSet.includes(current.neighbors[i])) {
          if (current.neighbors[i].g > tempG) {
            current.neighbors[i].g = tempG;
            
          }
        }
        else {
          current.neighbors[i].g = tempG;
          openSet.push(current.neighbors[i]);
        }
        current.neighbors[i].h = heuristic(current.neighbors[i], end);
        current.neighbors[i].f = current.neighbors[i].g + current.neighbors[i].h
        current.neighbors[i].previous = current;
      }
    }
      //Find the path

  }
  else {
    //no solution
  }
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show(color(255));
    }
  }
  for (var i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0));
  }
  for (var i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255, 0, 0));
  }
  path = [];
  var temp = current;
  path.push(temp);
  path.push(start);
  while(temp.previous)
  {
    path.push(temp);
    temp = temp.previous;
  }
  for (var i = 0; i < path.length; i++) {
    path[i].show(color(0, 0, 255));
  }



}

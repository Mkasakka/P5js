
var cols = 5;
var rows = 5;

var openSet = [];
var closedSet = [];
var start;
var end;

var w,h;

function Spot (x,y)
{
  this.x = x;
  this.y = y;
  this.f = 0;
  this.g = 0;
  this.h = 0;

  this.show =  function(col)
  {
    fill(col);
    noStroke();
    rect(this.x*w, this.y*h,w, h);
  }

}

var grid = new Array();

function setup() {
  createCanvas(400, 400);

  w = width/cols;
  h = height/rows;

  console.log('A*');

  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i,j);
    }
  }

  start = grid[0][0];
  end = grid[cols-1][rows-1];

  openSet.push(start);

  console.log(grid);
}


function draw() {
  background(0);

  if(openSet.length>0)
  {

  }
  else
  {
    //no solution
  }
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show(color(255));
    }
  }

  for (var i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255, 0, 0));
  }
  for (var i = 0; i < openSet.length; i++) {
      openSet[i].show(color(0,255,0));
  }


}

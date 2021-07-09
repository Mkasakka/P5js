
// var xoff2 = 0.5;
var inc = 0.1;
var scl = 20;
var colls, rows;
var zoff=0;
var fr;

var particles = [];
var flowfield ;

function setup() {
  createCanvas(800, 800);
  //pixelDensity(1);
  colls = floor(width/scl);
  rows = floor(height/scl);
  fr = createP('');
  flowfield = new Array(colls*rows);
  background(255);

  for(var i= 0; i<10000; i++ ){
     particles[i] = new Particle();
     
  }
 
}

function draw()
{
 
  var yoff = 0;

  for(var y = 0; y < rows; y++)
  {
    var xoff = 0;
    for(var x = 0; x < colls; x++)
    {
      var index = x+y*colls;
      var angle  = noise(xoff,yoff, zoff)*TWO_PI*4;  
      var v = p5.Vector.fromAngle(angle);
      v.setMag(0.5);
      flowfield[index]=v;
      xoff += inc;
    //   stroke(0,50);
    //   strokeWeight(1);
    //   push();
    //   translate(x*scl,y*scl);
    //   rotate(v.heading());
    //   line(0,0,scl,0);
    //  // fill(r);
    //   //rect(x*scl, y*scl,scl,scl)
    //   pop();
  }
  yoff +=inc;
  zoff += 0.0002;

}
for(var i= 0; i<particles.length; i++ ){
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
    

}
  fr.html(floor(frameRate()));

}






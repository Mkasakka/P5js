
function Particle()
{
    this.pos = createVector(random(width),random(height));
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.maxspeed = 4;
    this.prevPos = this.pos.copy();

    this.follow = function(vectors)
    {
        var x = floor(this.pos.x/scl);
        var y = floor(this.pos.y/scl);
        var index = x+y*colls;
        var force = vectors[index];
        this.applyForce(force);
    }

    this.update = function()
    {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.vel.limit(this.maxspeed);
        this.acc.mult(0);
        this.prevPos
    }

    this.applyForce = function(force)
    {
        this.acc.add(force);
    }

    this.show = function()
    {
        stroke(1,05);
        strokeWeight(1);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y)
        this.prevPos=this.pos;
        //point(this.pos.x, this.pos.y)
    }

    this.edges = function()
    {
        if(this.pos.x>width){
            this.pos.x = 0;
            this.prevPos =this.pos;
           
        } 
        if(this.pos.x<0){
            this.pos.x = width;
            this.prevPos =this.pos;
        } 

        if(this.pos.y>height){
            this.pos.y = 0;
            this.prevPos =this.pos;
        } 
        if(this.pos.y<0){
            this.pos.y = height;
            this.prevPos =this.pos;
        } 
    }


}
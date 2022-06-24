// alinen, 2022

fmod = function (a,b) { return Number((a - (Math.floor(a / b) * b)).toPrecision(8)); };

class Swimmer {

  constructor() {
    this.w = 0;
    this.h = 0;
    this.player = null;
    this.pipes = [];
  }

  setup(p) {
    this.w = p.width;
    this.h = p.height;
    this.player = new Player(p);
    this.pipes = [];
    this.pipes.push(new Pipe(p, p.width * 0.75)); 
    this.stars = [];
    this.stars.push(new Star(p, p.width * 0.85, p.random(p.height))); 
    this.spawn = Math.floor(p.frameCount + p.random(60, 150));
    this.starSpawn = Math.floor(p.frameCount + p.random(150, 250));
  }

  draw(p) {
    p.background("#014663");
    p.noStroke();

    var time = p.millis() / 1000.0;
    p.fill("#01344a");
    p.beginShape();
    p.curveVertex(0, p.height);
    p.curveVertex(0, p.height);
    for (var i = 0; i < p.width; i+=10) {
      var x = i;
      var y = 350 +30* Math.sin(2*p.PI * x / p.width) * Math.cos(i/100+time/8); 
      y = p.height - y;
      p.curveVertex(x, y);
    }
    p.curveVertex(p.width, p.height);
    p.curveVertex(p.width, p.height);
    p.endShape();

    p.fill("#002535");
    p.beginShape();
    for (var i = 0; i < p.width; i+=10) {
      var x = i;
      var y = 150 +40* Math.sin(2*p.PI * x / p.width + 1.5) * Math.cos(i/100+time); 
      y = p.height - y;
      p.curveVertex(x, y);
    }
    p.curveVertex(p.width, p.height);
    p.curveVertex(p.width, p.height);
    p.curveVertex(0, p.height);
    p.curveVertex(0, p.height);
    p.endShape();

    for (var i = this.stars.length - 1; i >= 0; i--) {
      this.stars[i].draw(p);
      this.stars[i].update(p);

      var hit = this.stars[i].hits(p, this.player);
      var offscreen = this.stars[i].offscreen(p);
      
      if (hit || offscreen) {
        this.stars.splice(i,1);
        if (hit) this.player.r = Math.min(128, this.player.r+2);
      }
    }

    for (var i = this.pipes.length - 1; i >= 0; i--) {
      this.pipes[i].draw(p);
      this.pipes[i].update(p);

      if (this.pipes[i].hits(p, this.player)) {
        this.player.r = Math.max(16, this.player.r-2);
      }

      if (this.pipes[i].offscreen(p)) {
        this.pipes.splice(i,1);
      }
    }

    this.player.update(p);
    this.player.draw(p);

    if (p.frameCount == this.spawn) {
      this.spawn = Math.floor(p.frameCount + p.random(175, 250));
      this.pipes.push(new Pipe(p, p.width));
    }

    if (p.frameCount == this.starSpawn) {
      this.starSpawn = Math.floor(p.frameCount + p.random(75, 150));
      this.stars.push(new Star(p, p.width+25, p.random(p.height)));
    }
  }

  mousePressed(p) {
    this.player.up(p);
  }

  mouseReleased(p) {
  }
}

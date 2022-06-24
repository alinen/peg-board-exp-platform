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
    this.spawn = Math.floor(p.frameCount + p.random(60, 150));
  }

  drawStar(p) {
    var angle = p.PI * 2 / 10;
    var r;
    p.stroke(0);
    p.fill("#ff0063");
    p.beginShape();
    for (var i = 0; i <= 12; i++) {
      if (i % 2 == 0) r = 25;
      else r = 15;

      var x = r * Math.cos(i * angle) + 150;
      var y = r * Math.sin(i * angle) + 150;
      p.curveVertex(x, y);
    }
    p.endShape();
  }

  draw(p) {
    p.background("#002535");
    p.noStroke();

    var time = p.millis() / 1000.0;
    p.fill("#003851");
    p.beginShape();
    for (var i = 0; i < p.width; i+=10) {
      var x = i;
      var y = 350 +30* Math.sin(2*p.PI * x / p.width) * Math.cos(i/100); 
      y = p.height - y;
      p.curveVertex(x, y);
    }
    p.curveVertex(p.width, p.height);
    p.curveVertex(p.width, p.height);
    p.curveVertex(0, p.height);
    p.curveVertex(0, p.height);
    p.endShape();

    p.fill("#22646e");
    p.beginShape();
    for (var i = 0; i < p.width; i+=10) {
      var x = i;
      var y = 150 +30* Math.sin(2*p.PI * x / p.width + 1.5) * Math.cos(i/100); 
      y = p.height - y;
      p.curveVertex(x, y);
    }
    p.curveVertex(p.width, p.height);
    p.curveVertex(p.width, p.height);
    p.curveVertex(0, p.height);
    p.curveVertex(0, p.height);
    p.endShape();

    this.drawStar(p);

    for (var i = this.pipes.length - 1; i >= 0; i--) {
      this.pipes[i].draw(p);
      this.pipes[i].update(p);
      this.pipes[i].hits(p, this.player);

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
  }

  mousePressed(p) {
    this.player.up(p);
  }

  mouseReleased(p) {
  }
}

// alinen, 2022

class Star {

  constructor(p, x, y) {
    this.reset(p, x, y);
  }

  reset(p, x, y) {
    this.x = x;
    this.sy = y;
    this.y = y;
    this.r = 25;
    this.speed = 90;
  }

  hits(p, player) {
    var rsqr = player.radius() + this.r;
    rsqr *= rsqr;
    var dsqr = (player.x - this.x) * (player.x - this.x) +
        (player.y - this.y) * (player.y - this.y);

        console.log(rsqr + " " + dsqr);
    if (dsqr <= rsqr) {
      return true;
    }
    return false;
  }


  draw(p) {
    var angle = p.PI * 2 / 10;
    var r;
    p.stroke(0);
    p.fill("#ff0063");
    p.beginShape();
    for (var i = 0; i <= 12; i++) {
      if (i % 2 == 0) r = 25;
      else r = 15;

      var x = r * Math.cos(i * angle) + this.x;
      var y = r * Math.sin(i * angle) + this.y;
      p.curveVertex(x, y);
    }
    p.endShape();
  }

  update(p) {
    this.y = this.sy + Math.sin(p.millis() / 1000.0);
    this.x -= this.speed * p.deltaTime / 1000.0;
  }

  offscreen() {
    return (this.x < -this.w);
  }
}

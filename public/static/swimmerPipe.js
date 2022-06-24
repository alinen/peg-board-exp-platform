// alinen, 2022

class Pipe {

  constructor(p, start) {
    this.reset(p, start);
    this.style = 1;
  }

  reset(p, start) {
    this.spacing = 275;
    this.top = p.random(p.height / 6, (3 / 4) * p.height);
    this.bottom = p.height - (this.top + this.spacing);
    this.x = start;
    this.w = 80;
    this.speed = 100;
  }

  hits(p, player) {
    var r = player.radius();
    if (player.y-r < this.top || player.y+r > p.height - this.bottom) {
      if (player.x+r > this.x && player.x-r < this.x + this.w) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  }

  draw(p) {
    
    if (this.style) {
      this.drawPipe(p);

    } else { // poc 
      p.fill(255);
      if (this.highlight) {
        p.fill(255, 0, 0);
      }
      // position is center bottom
      p.rect(this.x, 0, this.w, this.top);
      p.rect(this.x, p.height - this.bottom, this.w, this.bottom);
    }
  }

  drawPipe(p) {
    p.stroke(0);
    p.fill("#008000");
    if (this.highlight) {
      p.fill(200, 0, 0);
    }
    var lidSize = 50;
    p.rect(this.x+5, 0, this.w-10, this.top); // top
    p.rect(this.x, this.top-lidSize, this.w, lidSize, 5, 5); // top
    p.rect(this.x+5, p.height - this.bottom, this.w-10, this.bottom); //bottom
    p.rect(this.x, p.height - this.bottom, this.w, lidSize, 5, 5); // bottom

    p.noStroke();
    p.fill("#00f000");
    if (this.highlight) {
      p.fill(255, 0, 0);
    }
    p.rect(this.x+10, 0, 15, this.top); // top
    p.rect(this.x+12, this.top-lidSize, 15, lidSize, 5, 5); // top
    p.rect(this.x+10, p.height - this.bottom, 15, this.bottom); //bottom
    p.rect(this.x+12, p.height - this.bottom, 15, lidSize, 5, 5); // bottom

    p.fill("#004000");
    if (this.highlight) {
      p.fill(100, 0, 0);
    }
    p.rect(this.x+this.w-15, 0, 10, this.top-lidSize); // top
    p.rect(this.x+this.w-10, this.top-lidSize, 10, lidSize, 5, 5); // top
    p.rect(this.x+this.w-15, p.height - this.bottom + lidSize, 10, this.bottom); //bottom
    p.rect(this.x+this.w-10, p.height - this.bottom, 10, lidSize, 5, 5); // bottom

    p.stroke(0);
    p.noFill();
    p.rect(this.x, this.top-lidSize, this.w, lidSize, 5, 5); // top
    p.rect(this.x, p.height - this.bottom, this.w, lidSize, 5, 5); // bottom
  }

  update(p) {
    this.x -= this.speed * p.deltaTime / 1000.0;
  }

  offscreen() {
    return (this.x < -this.w);
  }
}

// alinen, 2022

class Pipe {

  constructor(p, start) {
    this.reset(p, start);
  }

  reset(p, start) {
    this.bottom = p.random(25, 75);
    this.x = start;
    this.w = 40;
    this.speed = 120;
  }

  hits(p, player) {
    if (player.y+player.r > p.height - this.bottom) {
      if (player.x+player.r > this.x && player.x-player.r < this.x + this.w) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  }

  draw(p) {
    p.fill(255);
    if (this.highlight) {
      p.fill(255, 0, 0);
    }
    // position is center bottom
    p.rect(this.x, p.height - this.bottom, this.w, this.bottom);
  }

  update(p) {
    this.x -= this.speed * p.deltaTime / 1000.0;
  }

  offscreen() {
    return (this.x < -this.w);
  }
}

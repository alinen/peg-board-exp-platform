// alinen, 2022

class Pipe {

  constructor(p, start) {
    this.reset(p, start);
  }

  reset(p, start) {
    this.spacing = 275;
    this.top = p.random(p.height / 6, (3 / 4) * p.height);
    this.bottom = p.height - (this.top + this.spacing);
    this.x = p.width + start;
    this.w = 80;
    this.speed = 100;
  }

  hits(p, player) {
    if (player.y-player.r < this.top || player.y+player.r > p.height - this.bottom) {
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
    p.rect(this.x, 0, this.w, this.top);
    p.rect(this.x, p.height - this.bottom, this.w, this.bottom);
    console.log(this.x);
  }

  update(p) {
    this.x -= this.speed * p.deltaTime / 1000.0;
  }

  offscreen() {
    return (this.x < -this.w);
  }
}

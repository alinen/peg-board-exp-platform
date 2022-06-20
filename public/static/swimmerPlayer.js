// alinen, 2022

class Player {

  constructor(p) {
    this.y = p.height / 2;
    this.x = 64;
    this.r = 16;

    this.gravity = 100;
    this.lift = -50;
    this.velocity = 0;
  }

  draw(p) {
    p.fill(255);
    p.ellipse(this.x, this.y, this.r*2, this.r*2);
  }

  up(p) {
    this.velocity += this.lift;
  }

  update(p) {
    var dt = p.deltaTime / 1000.0;
    this.velocity += this.gravity * dt;
    this.y += this.velocity * dt;

    if (this.y+this.r > p.height) {
      this.y = p.height - this.r;
      this.velocity = 0;
    }

    if (this.y-this.r < 0) {
      this.y = this.r;
      this.velocity = 0;
    }
  }
}

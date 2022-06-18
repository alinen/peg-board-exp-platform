// alinen, 2022

class Player {

  constructor(p) {
    this.y = p.height / 2;
    this.x = 64;
    this.r = 16;

    this.gravity = 500;
    this.lift = -300;
    this.velocity = 0;
  }

  draw(p) {
    p.fill(255);
    p.ellipse(this.x, this.y, this.r*2, this.r*2);
  }

  up(p) {
    if (this.y >= p.height - this.r - 5) { // 5 is a wiggle-room threshold
      this.velocity = this.lift;
    }
  }

  update(p) {
    var dt = p.deltaTime / 1000.0;
    this.velocity += this.gravity * dt;
    this.y += this.velocity * dt;

    if (this.y+this.r > p.height) {
      this.y = p.height - this.r;
      this.velocity = 0;
    }
  }
}

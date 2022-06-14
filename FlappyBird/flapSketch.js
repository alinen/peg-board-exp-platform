// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&

class FlappyBird {

  constructor() {
    this.w = 0;
    this.h = 0;
    this.bird = null;
    this.pipes = [];
  }

  setup(p) {
    this.w = p.width;
    this.h = p.height;
    this.bird = new flapBird(p);
    this.pipes = [];
    this.pipes.push(new Pipe(p));
  }

  draw(p) {
    p.background(0);

    for (var i = this.pipes.length - 1; i >= 0; i--) {
      this.pipes[i].show(p);
      this.pipes[i].update(p);
      this.pipes[i].hits(p, this.bird);

      if (this.pipes[i].offscreen()) {
        this.pipes.splice(i, 1);
      }
    }

    this.bird.update(p);
    this.bird.show(p);

    if (p.frameCount % 75 == 0) {
      this.pipes.push(new Pipe(p));
    }
  }

  mousePressed(p) {
    this.bird.up(p);
  }

  mouseReleased(p) {
  }
}

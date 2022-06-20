// alinen, 2022

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

  draw(p) {
    p.background(0);

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

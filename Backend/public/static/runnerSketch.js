// alinen, 2022

class Runner {

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
    var numPipes = 20;
    this.pipes = [];
    for(var i = 0; i < numPipes; i++) {
      this.pipes.push(new Pipe(p, i * (80+175))); 
    }
  }

  draw(p) {
    p.background(0);

    for (var i = this.pipes.length - 1; i >= 0; i--) {
      this.pipes[i].draw(p);
      this.pipes[i].update(p);
      this.pipes[i].hits(p, this.player);

      if (this.pipes[i].offscreen(p)) {
        this.pipes[i].reset(p);
      }
    }

    this.player.update(p);
    this.player.draw(p);
  }

  mousePressed(p) {
    this.player.up(p);
  }

  mouseReleased(p) {
  }
}

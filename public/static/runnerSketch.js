// alinen, 2022

fmod = function (a,b) { return Number((a - (Math.floor(a / b) * b)).toPrecision(8)); };

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
    this.pipes = [];
    var start = p.width / 2;
    this.pipes.push(new Pipe(p, start)); 
    this.spawn = Math.floor(p.frameCount + p.random(60, 150));
  }

  draw(p) {
    p.background(0);

    for (var i = this.pipes.length - 1; i >= 0; i--) {
      this.pipes[i].draw(p);
      this.pipes[i].update(p);
      this.pipes[i].hits(p, this.player);

      if (this.pipes[i].offscreen()) {
        this.pipes.splice(i, 1);
      }
    }

    this.player.update(p);
    this.player.draw(p);

    if (p.frameCount == this.spawn) {
      this.spawn = Math.floor(p.frameCount + p.random(75, 155));
      this.pipes.push(new Pipe(p, p.width));
    }
  }

  mousePressed(p) {
    this.player.up(p);
  }

  mouseReleased(p) {
  }
}

// alinen, 2022

class Player {

  constructor(p) {
    this.y = p.height / 2;
    this.x = 85;
    this.r = 16;

    this.gravity = 100;
    this.lift = -50;
    this.velocity = 0;
    this.style = 1;
  }

  radius() {
    return this.r;``
  }

  draw(p) {
    if (this.style == 1) {
      this.drawFish(p);
    } else {
      p.fill(255);
      p.ellipse(this.x, this.y, this.r*2, this.r*2);
    }
  }

  drawEye(p, x, y, r) {
    p.stroke("#ff6600");
    p.fill("#ffffff");
    p.strokeWeight(Math.max(1, this.r/16));
    p.ellipse(x, y, r, r);

    p.noStroke();
    p.fill(0);
    p.ellipse(x+r*0.05, y+r*0.05, r*0.6, r*0.6);

    p.fill(255);
    p.ellipse(x-r*0.05, y+r*0.05, r*0.25, r*0.25);
    p.ellipse(x+r*0.2, y+r*0.05, r*0.15, r*0.15);
  }

  drawFish(p) {
    var time = p.millis() / 1000.0;
    var angle = 0.7*Math.sin(4*time) + 0.11;
    p.stroke(0);
    p.strokeCap(p.SQUARE);

    p.fill("#ff8c3f");
    p.rectMode(p.CENTER);
    p.rect(this.x-this.r-this.r*0.1, this.y, this.r*0.3, this.r*0.75, 20, 20);

    p.push();
    p.translate(this.x-this.r*0.3, this.y+this.r*0.7);
    p.rotate(angle);
    p.rect(0, 0, this.r*0.3, this.r*0.4, 20, 20);
    p.pop();

    p.push();
    p.translate(this.x+this.r*0.3, this.y+this.r*0.7);
    p.rotate(-angle);
    p.rect(0, 0, this.r*0.3, this.r*0.4, 20, 20);
    p.pop();

    p.push();
    p.translate(this.x, this.y-this.r);
    p.rotate(10*Math.abs(Math.sin(time)));
    p.rect(0,0, this.r*0.5, this.r*0.5, 20, 20);
    p.pop();

    p.fill("#ff6600");
    p.stroke("#ff6600");
    p.line(this.x-this.r, this.y, this.x+this.r, this.y);
    //p.ellipse(this.x, this.y, this.r*2, this.r*2);
    p.stroke(0);
    p.bezier(this.x-this.r, this.y, 
             this.x-this.r*0.8, this.y-1.1*this.r, 
             this.x+this.r, this.y-1.7*this.r, 
             this.x+this.r, this.y);

    p.bezier(this.x-this.r, this.y, 
             this.x-this.r*0.8, this.y+1*this.r, 
             this.x+this.r*0.8, this.y+1*this.r, 
             this.x+this.r, this.y);


    this.drawEye(p, this.x + this.r*0.15, this.y-this.r*0.15, this.r*0.8);
    this.drawEye(p, this.x + this.r*0.8, this.y-this.r*0.4, this.r*0.55);
    p.line(this.x);

    p.noFill();
    p.stroke("#000000");
    p.arc(this.x + this.r*0.7, this.y+this.r*0.05, this.r*0.3, this.r*0.3, 0.1, p.PI*0.9);

    p.stroke("#ff8c3f");
    p.arc(this.x - this.r*0.6, this.y+this.r*0.1, this.r*0.3, this.r*0.3, 0.1, p.PI*0.9);
    p.arc(this.x - this.r*0.5, this.y+this.r*0.3, this.r*0.3, this.r*0.3, 0.1, p.PI*0.9);

    p.rectMode(p.CORNER);
  }

  up(p) {
    this.velocity += this.lift;
  }

  update(p) {
    var dt = p.deltaTime / 1000.0;
    this.velocity += this.gravity * dt;
    this.y += this.velocity * dt;

    if (this.y+this.radius() > p.height) {
      this.y = p.height - this.r;
      this.velocity = 0;
    }

    if (this.y-this.radius() < 0) {
      this.y = this.r;
      this.velocity = 0;
    }
  }
}

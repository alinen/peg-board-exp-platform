// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&

function Pipe(p) {
  this.spacing = 175;
  this.top = p.random(p.height / 6, (3 / 4) * p.height);
  this.bottom = p.height - (this.top + this.spacing);
  this.x = p.width;
  this.w = 80;
  this.speed = 6;

  this.highlight = false;

  this.hits = function(p, bird) {
    if (bird.y < this.top || bird.y > p.height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  };

  this.show = function(p) {
    p.fill(255);
    if (this.highlight) {
      p.fill(255, 0, 0);
    }
    p.rect(this.x, 0, this.w, this.top);
    p.rect(this.x, p.height - this.bottom, this.w, this.bottom);
  };

  this.update = function(p) {
    this.x -= this.speed;
  };

  this.offscreen = function() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  };
}

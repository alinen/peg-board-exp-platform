class crossyCar {

  //how to do constructor() in this case?

  constructor(x, y, f) {
    this.mposX = 250;
    this.mposY = 250;
    this.mspeed = random(1,3);
    this.mWidth = 100;
    this.mHeight = 50;
    this.mposX = x;
    this.mposY = y;
    this.c = f;
  }
  x() {
    return this.mposX;
  }

  y() {
    return this.mposY;
  }

  width() {
    return this.mWidth;
  }

  height() {
    return this.mHeight;
  }
    inside(x, y) {
      if (x >= this.mposX && x<= this.mposX+(0.5*this.mWidth) &&
          y >= this.mposY && y<= this.mposY+this.mHeight) {
            return true;
          }
      return false;
  }
/*

   intersects(Animal other) {
      this.x = this.other.x();
      this.y = this.other.y();
      this.w = this.other.width();
      this.h = this.other.height();

      this.topLeftTest = this.inside(this.x, this.y);
      this.topRightTest = this.inside(this.x+this.w,this.y);
      this.bottomLeftTest = this.inside(this.x,this.y+this.h);
      this.bottomRightTest = this.inside(this.x+this.w,this.y+this.h);

      return this.topLeftTest || this.topRightTest ||
              this.bottomLeftTest || this.bottomRightTest;

  }
  */
  update() {
    this.mposX+= this.mspeed;
  }
  draw() {
    stroke(0);
    fill(this.c);
    rect(this.mposX, this.mposY, this.mWidth, this.mHeight);
    fill(0);
    ellipse(this.mposX-30, this.mposY-30, 30,20);
    ellipse(this.mposX-30, this.mposY+30, 30,20);
    ellipse(this.mposX+30, this.mposY-30, 30,20);
    ellipse(this.mposX+30, this.mposY+30, 30,20);
    if(this.mposX-50 > width || this.mposX< 0) {
      this.mspeed = -this.mspeed;
    }
  }
}

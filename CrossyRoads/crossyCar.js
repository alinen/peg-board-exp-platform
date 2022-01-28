class crossyCar {

  //how to do constructor() in this case?

  constructor(x, y, f) {
    this.mposX = 250;
    this.mposY = 250;
    this.mspeed = random(2,3);
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
      float x = other.x();
      float y = other.y();
      float w = other.width();
      float h = other.height();

      boolean topLeftTest = inside(x, y);
      boolean topRightTest = inside(x+w,y);
      boolean bottomLeftTest = inside(x,y+h);
      boolean bottomRightTest = inside(x+w,y+h);

      return topLeftTest || topRightTest ||
              bottomLeftTest || bottomRightTest;

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

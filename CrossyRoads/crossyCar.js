class crossyCar {

  //how to do constructor() in this case?

  constructor(int x, int y, color f) {
    this.mposX = 250;
    float mposY = 250;
    float mspeed = random(2,3);
    float mWidth = 100;
    float mHeight = 50;
    color c;
    mposX = x;
    mposY = y;
    c = f;
  }
   float x() {
    return mposX;
  }

  float y() {
    return mposY;
  }

  float width() {
    return mWidth;
  }

  float height() {
    return mHeight;
  }
    boolean inside(float x, float y) {
      if (x >= mposX && x<= mposX+(0.5*mWidth) &&
          y >= mposY && y<= mposY+mHeight) {
            return true;
          }
      return false;
  }

   boolean intersects(Animal other) {
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
  update() {
    mposX+= mspeed;
  }
  draw() {
    stroke(0);
    fill(c);
    rect(mposX, mposY, mWidth, mHeight);
    fill(0);
    ellipse(mposX-30, mposY-30, 30,20);
    ellipse(mposX-30, mposY+30, 30,20);
    ellipse(mposX+30, mposY-30, 30,20);
    ellipse(mposX+30, mposY+30, 30,20);
    if(mposX-50 > width || mposX< 0) {
      mspeed = -mspeed;
    }
  }

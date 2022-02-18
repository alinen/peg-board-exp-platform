class crossyAnimal {

  constructor(){
  this.xPos = 350;
  this.yPos = 650;
  this.mWidth = 40;
  this.mHeight = 40;
  }
  Animal(x, y) {
    this.xPos = x;
    this.yPos = y;
  }
  x() {
    return this.xPos;
  }

  y() {
    return this.yPos;
  }

  width() {
    return this.mWidth;
  }

  height() {
    return this.mHeight;
  }

  /*
  float moveRight() {
    return this.xPos +=5;
  }

  float moveLeft() {
    return this.xPos -= 5;
  }

  float moveUp() {
    return yPos -= 5;
  }

  float moveDown() {
    return yPos += 5;
  }
  */
  draw() {
    fill(#AA8241);
  triangle(this.xPos-17,this.yPos-22,this.xPos-18,this.yPos-8,this.xPos-5,this.yPos-16);
  triangle(this.xPos+17,this.yPos-22,this.xPos+5,this.yPos-16,this.xPos+18,this.yPos-8);


  ellipse(this.xPos,this.yPos,40,40);

  fill(0);
  ellipse(this.xPos-8,this.yPos-6,6,6);
  ellipse(this.xPos+8,this.yPos-6,6,6);

  fill(255);
  ellipse(this.xPos-7,this.yPos-7,2,2);
  ellipse(this.xPos+9,this.yPos-7,2,2);

  fill(0);
  triangle(this.xPos,this.yPos+1,this.xPos-2,this.yPos+4,this.xPos+2,this.yPos+4);

  fill(#AA8241);
  curve(this.xPos-12,this.yPos,this.xPos-4,this.yPos+8,this.xPos+4,this.yPos+8,this.xPos+12,this.yPos);

  rectMode(CORNER);

  /*
  if (keyPressed) {
     if(key=='a') {
         moveLeft();
     }
     else if(key=='d'){
         moveRight();
     }
     else if(key=='w') {
         moveUp();
     }
     else if(key=='s') {
         moveDown();
     }
  }

  if(this.xPos>width) {
    this.xPos=0;
  }
  else if(this.xPos<0) {
    this.xPos=width;
  }
  if(this.yPos>height) {
    this.yPos=height;
  }
  else if(this.yPos<0) {
    this.yPos=0;
  }
    */
}
}

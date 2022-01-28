class CrossyRoad{

constructor() {
  /*
this.cars = new crossyCar[12];
this.timer1 = new crossyTimer();
this.animal1 = new crossyAnimal(250,650);
this.morecars = false;
this.ocars = false;
*/
this.gameon = true;
this.intersects = false;
this.instructions = true;
this.xCorner = 0;
this.yCorner = 0;
this.carTotal = 12;
this.cars = null;
}



setup(w, h) {
  this.width = w;
  this.height = h;
  //size(600,700);

  this.cars =
  [
    new crossyCar(this.xCorner, this.yCorner + 400, "#293998"),
    new crossyCar(this.xCorner, this.yCorner + 550, "#5DD3D6")
  ];
  /*
  this.cars[2] = new crossyCar(this.xCorner, this.yCorner + 250, "#98295F");
  this.cars[3] = new crossyCar(this.xCorner, this.yCorner + 100, "#512998");
  this.cars[4] = new crossyCar(this.xCorner, this.yCorner + 400, "#98295F");
  this.cars[5] = new crossyCar(this.xCorner, this.yCorner + 550, "#512998");
  this.cars[6] = new crossyCar(this.xCorner, this.yCorner + 250, "#293998");
  this.cars[7] = new crossyCar(this.xCorner, this.yCorner + 100, "#955DD6");
  this.cars[8] = new crossyCar(this.xCorner, this.yCorner + 400, "#512998");
  this.cars[9] = new crossyCar(this.xCorner, this.yCorner + 550, "#98295F");
  this.cars[10] = new crossyCar(this.xCorner, this.yCorner + 250, "#D65DB8");
  this.cars[11] = new crossyCar(this.xCorner, this.yCorner + 100, "#293998");
*/

  //need to comment out for background to load bc loop is incomplete
  /*
  this.cars = new Array(this.carTotal);
  var carColor = ['#293998', '#5DD3D6', '#98295F', '#512998'];
  var carYPos = [400, 550, 250, 100];
  for(var i = 0; i < this.carTotal; i++){
    var offest = carYPos[i % this.carTotal];
    var colors = carColor[i % this.carTotal];
    this.cars[i] = new crossyCar(this.xCorner, this.yCorner + offest, colors); //how to generate random numbers and colors?
  }
*/
}

draw() {
  background(128);
/*
if (animal1.yPos == 0) {
    gameon = false;
  }
  else {
    gameon = true;
  }
  */

  if(this.gameon == true && this.intersects == false) {

    //draw using a formula related to widht and height passed in setup
  rectMode(CENTER);
  fill(100);
  rect(this.xCorner, this.yCorner + 1*this.height/9, this.width*2, this.height/9);
  rect(this.xCorner, this.yCorner + 3*this.height/9, this.width*2, this.height/9);
  rect(this.xCorner, this.yCorner + 5*this.height/9,this.width*2,this.height/9);
  rect(this.xCorner, this.yCorner + 7*this.height/9,this.width*2,this.height/9);
  rect(this.xCorner, this.yCorner + 9*this.height/9,this.width*2,this.height/9);

  stroke("#F4F540"); //cant get them to draw. If I change the first 1 to a 9 I see a diagonal line the makes it seem like i should see a horizontal line if I change it back to a 1
  fill("#F4F540")

  line(this.xCorner, this.yCorner + 1*this.height/9,this.xCorner+this.width,this.yCorner + 1*this.height/9);
  line(this.xCorner, this.yCorner + 7*this.height/9,this.xCorner+this.width,this.yCorner + 7*this.height/9);
  line(this.xCorner, this.yCorner + 11*this.height/9,this.xCorner+this.width,this.yCorner + 11*this.height/9);
  line(this.xCorner, this.yCorner + 15*this.height/9,this.xCorner+this.width,this.yCorner + 15*this.height/9);

  stroke(0);
  fill("#50A53F");
  rect(this.xCorner, this.yCorner, this.width*2,this.height/9); //why is it drawing it as half the size it should be?
  rect(this.xCorner, this.yCorner + 2*this.height/9, this.width*2,this.height/9);
  rect(this.xCorner, this.yCorner + 4*this.height/9, this.width*2, this.height/9);
  rect(this.xCorner, this.yCorner + 6*this.height/9, this.width*2, this.height/9);
  rect(this.xCorner, this.yCorner + 8*this.height/9, this.width*2,this.height/9);


  this.cars[0].update();
  this.cars[1].update();
  /*
  this.cars[2].update();
  this.cars[3].update();
  */
  this.cars[0].draw();
  this.cars[1].draw();
  /*
  this.cars[2].draw();
  this.cars[3].draw();
  */

  rectMode(CENTER);
/*
  if (this.morecars == true) {
    this.cars[4].update();
    this.cars[5].update();
    this.cars[6].update();
    this.cars[7].update();
    this.cars[4].draw();
    this.cars[5].draw();
    this.cars[6].draw();
    this.cars[7].draw();
  }
  if (this.ocars == true) {
    this.cars[8].update();
    this.cars[9].update();
    this.cars[10].update();
    this.cars[11].update();
    this.cars[8].draw();
    this.cars[9].draw();
    this.cars[10].draw();
    this.cars[11].draw();
  }
*/

//change cars to array and intialize using for loops

  //if(instructions == true) {
    //textAlign(CENTER);
    //textSize(35);
    //fill(255);
    //text("Goal: get your animal to the other", 300,300);
  //  text("end of the screen without", 300, 350);
    //text("bumping into any cars", 300, 400);
  //  text("Please wait for the instructions", 300, 450);
  //  text(" to disappear before moving", 300, 500);
  //  text("in order to allow all the cars", 300, 550);
  //  text("to start circling", 300, 600);
//  }

/*
  if (this.timer1.getElapsedTime() > 2.0) {
    this.morecars = true;
  }
  if (this.timer1.getElapsedTime() > 4.0) {
    this.ocars = true;
  }
  */

//  if (timer1.getElapsedTime() >6.0) {
//    instructions = false;
//  }
/*
    this.animal1.draw();

    if(this.cars[0].intersects(animal1) || this.cars[1].intersects(animal1) ||
        this.cars[2].intersects(animal1) || this.cars[3].intersects(animal1) ||
        this.cars[4].intersects(animal1) || this.cars[5].intersects(animal1) ||
        this.cars[6].intersects(animal1) || this.cars[7].intersects(animal1) ||
        this.cars[8].intersects(animal1) || this.cars[9].intersects(animal1) ||
        this.cars[10].intersects(animal1) || this.cars[11].intersects(animal1)) {
      this.intersects = true;
    }
    */
  }


  if (this.gameon==false) {
    background(200);
    textAlign(CENTER);
    textSize(80);
    fill("#48985E");
    text("WINNER!", 300,300);
    drawTextBox("Restart", 300, 500);
    if (mousePressed && insideTextBox("Restart", 300, 500)) {
        this.animal1.yPos = 650;
        this.gameon = true;
    }
  }

  if(this.intersects == true) {
    background(20);
    textAlign(CENTER);
    textSize(72);
    fill(255,0,0);
    text("GAME OVER", 300,300);
    drawTextBox("Restart", 300, 500);
    if (mousePressed && insideTextBox("Restart", 250, 500)) {
        this.animal1.yPos = 650;
        this.intersects = false;
    }
  }
}

  keyPressed(){
       if(key=='a') {
           this.xPos = this.xPos - 5;
       }
       else if(key=='d'){
           this.xPos = this.xPos + 5;
       }
       else if(key=='w') {
           this.yPos = this.yPos + 5;
       }
       else if(key=='s') {
           this.yPos = this.yPos - 5;
       }
  }

};

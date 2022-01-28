// Peg Board Task
// Aline Normoyle, alinen

class PegBoard {

  //added
  var tx = 30;
  var ty = 30;
  var rad = 20;
  var isDrag = false;
  var filled;

  constructor() {
    this.w = 1000.0;
    this.h = 1000.0;
    this.spacing = 100;
    this.pegSize = 50;
    this.rotateRate = 0.05; // radians
    this.half = 0;
    this.numPegs = 0;
    this.selected = {i: 0, j: 0, theta: 0};
  }

  setup(width, height) {
    this.w = width;
    this.h = height;
    this.half = this.spacing * 0.5;
    this.numPegs = floor(this.w / this.spacing);
    this.filled = new Array(this.numPegs);
    for(var i = 0; i < this.filled.length; i++){
      this.filled[i] = new Array(this.numPegs);
    }
  };

  draw() {

    //added
    fill(255);
    rect(0,0,60,60);
    fill(0,0,0);
    ellipse(tx, ty, 2*rad, 2*rad);

    noStroke();
    fill("#fff8dc");
    rectMode(CORNER);
    rect(0, 0, this.w, this.h);
    rect(0,0,500,60);

    //added
    if(isDrag == true) {
      rect(mouseX, mouseY, rad, rad);
    }

    fill("#bc8f8f");
    rectMode(CENTER);
    for (let i = 0; i < this.numPegs; i++) {
      for (let j = 0; j < this.numPegs; j++) {
        let x = this.half + this.spacing * i;
        let y = this.half + this.spacing * j;

        // ellipse(x, y, 10, 10); // circle peg
        if (i == this.selected.i && j == this.selected.j) {
          push();
          translate(x, y);
          rotate(this.selected.theta);
          rect(0, 0, this.pegSize, this.pegSize, 5, 5, 5, 5); // roundRect
          pop();
          this.selected.theta += this.rotateRate;
          if (this.selected.theta >= HALF_PI) {
             this.selected.i = -1;
             this.selected.j = -1;
          }
        }
        else {
          rect(x, y, this.pegSize, this.pegSize, 5, 5, 5, 5); // roundRect
        }
      }
    }

    //added
    for(let a = 0; a < numPegs; a++){
      for(let b = 0; b < numPegs; b++) {

      }
    }
  };

  mouseClicked(x, y) {
    if (this.selected.i != -1) return; // only allow a single click

    let celli = x % this.spacing;
    let cellj = y % this.spacing;
    //console.log("here "+mouseX+" "+mouseY+" "+celli+" "+cellj);

    if (dist(celli, cellj, this.half, this.half) < this.pegSize/2) {
      this.selected.i = floor(x / this.spacing);
      this.selected.j = floor(y / this.spacing);
      this.selected.theta = 0;
    }
  }

  //added
  mousePressed() {
    if(dist(mouseX, mouseY, tx, ty) < rad){
      isDrag = true;
    }
  }

  //added
  mouseReleased() {
    isDrag = false;
    if (dist(celli, cellj, this.half, this.half) < this.pegSize/2) {
      this.selected.i = floor(x / this.spacing);
      this.selected.j = floor(y / this.spacing);
      rect(0, 0, this.pegSize, this.pegSize, 5, 5, 5, 5);
  }
};

/*
copy pallet making from draw program
boolean isDrag = false;
draw(){
if isDrag = true{
draw shape at mouseX, mouseY
}
for (int i (rows)){
for (int j column){
if fill[i][j] {
draw shape
}
}
}
}
mousePressed() {
check if user inside a pallet circle
if yes -> isDrag = true
}

mouseReleased() {
isDrag = false
place drag in a cell - use turn code to identify which cell
}

want empty cells
need to keep track of which cells have smooth
  2D array of booleans
  false = empty
  when one gets clicked goes true

  TO DO:
  draw small markers for empty cells
  draw pallet
  implement drag and drop from pallet
  updated filled array(and draw)
*/

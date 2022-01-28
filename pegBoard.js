// Peg Board Task
// Aline Normoyle, alinen

class PegBoard {

  constructor() {
    this.w = 1000.0;
    this.h = 1000.0;
    this.wantPegs = 15;
    this.spacing = this.w/this.wantPegs;
    this.pegSize = 50;
    this.rotateRate = 0.05; // radians
    this.half = 0;
    this.numPegs = 0;
    this.selected = {i: 0, j: 0, theta: 0};
    //added
    this.tx = 35;
    this.ty = 35;
    this.px = 100;
    this.py = 35;
    this.ix = 165;
    this.iy = 35;
    this.rad = 30;
    this.radi;
    this.isDragt = false;
    this.isDragp = false;
    this.isDragi = false;
    this.pegs;
  }

  setup(width, height) {
    this.w = width;
    this.h = height;
    this.half = this.spacing * 0.5;
    this.numPegs = floor(this.w / this.spacing) + 1;
    this.teal = color(6, 132,193);
    //this.teal2 = color(41,107,139);
    this.black = color(0,0,0);
    this.purple = color(161, 130, 234);
    this.purple2 = color(63,34,134);
    this.pink = color(227, 130, 234);
    this.pink2 = color(122, 35, 129);
    this.currentColor = color(255);
    this.pegs = new Array(this.numPegs);
    for(var i = 0; i < this.pegs.length; i++){
      this.pegs[i] = new Array(this.numPegs);
      for(var j =0; j< this.pegs.length; j++){
        this.pegs[i][j] = new pegCell();
      }
    }
  }

  draw() {

    noStroke();
    fill("#fff8dc");
    rectMode(CORNER);
    rect(0, 0, this.w, this.h);
    rect(0,0,500,60);


    fill("#bc8f8f");
    for (let i = 0; i < this.numPegs; i++) {
      for (let j = 0; j < this.numPegs; j++) {
        let x = this.half + this.spacing * i;
        let y = this.half + this.spacing * j;

        ellipse(x, y, 10,10);
      }
    }

    //added
    for(let i = 0; i < this.numPegs; i++){
      for(let j = 0; j < this.numPegs; j++) {
        if(this.pegs[i][j].filled == true){
          let x = this.half + this.spacing * i;
          let y = this.half + this.spacing * j;
          let u = this.pegs[i][j].clickCount/4.0;
          let coloring = color(255);

          if(this.pegs[i][j].coloring == this.teal){
            coloring = lerpColor(this.teal, this.black, u);
          }
          if(this.pegs[i][j].coloring == this.purple){
            coloring = lerpColor(this.purple, this.black, u);
          }
          if(this.pegs[i][j].coloring == this.pink){
            coloring = lerpColor(this.pink, this.black, u);
          }

          fill(coloring);
          //this.radi = ()(this.pegs[i][j].clickCount *(30-5))/4) + 5

        if(this.pegs[i][j].clickCount == 4){
          this.radi = 10;
          ellipse(x, y, 2*this.radi, 2*this.radi);
          fill(0,0,0);
          textAlign(CENTER);
        //  text(this.pegs[i][j].clickCount, x, y);
        }
        if(this.pegs[i][j].clickCount == 3){
          this.radi = 20;
          ellipse(x, y, 2*this.radi, 2*this.radi);
          fill(0,0,0);
          textAlign(CENTER, CENTER);
        //  text(this.pegs[i][j].clickCount, x, y);
        }
        if(this.pegs[i][j].clickCount == 2){
          this.radi = 25;
          ellipse(x, y, 2*this.radi, 2*this.radi);
          fill(0,0,0);
          textAlign(CENTER);
          //text(this.pegs[i][j].clickCount, x, y);
        }
        if(this.pegs[i][j].clickCount == 1){
          this.radi = 30;
          ellipse(x, y, 2*this.radi, 2*this.radi);
          fill(0,0,0);
          textAlign(CENTER);
          //text(this.pegs[i][j].clickCount, x, y);
        }

          //draw ellipse with certain radius depending on click count
          //rad = clickcount(maxrad-minrad)/4 +minrad
        }
      }
    }
    //added
    rectMode(CORNER);
    fill("#fff8dc");
    rect(0,0,200,60);
    fill(6, 132,193);
    ellipse(this.tx, this.ty, 2*this.rad, 2*this.rad);
    fill(161, 130, 234);
    ellipse(this.px, this.py, 2*this.rad, 2*this.rad);
    fill(227, 130, 234)
    ellipse(this.ix, this.iy, 2*this.rad, 2*this.rad);

    if(this.isDragt == true) {
      fill(6, 132,193);
      ellipse(mouseX, mouseY, 2*this.rad, 2*this.rad);
    }
    if(this.isDragp == true) {
      fill(161, 130, 234);
      ellipse(mouseX, mouseY, 2*this.rad, 2*this.rad);
    }
    if(this.isDragi == true) {
      fill(227, 130, 234);
      ellipse(mouseX, mouseY, 2*this.rad, 2*this.rad);
    }
  };

  mouseClicked(x, y) {
    /*
    if (this.selected.i != -1) return; // only allow a single click

    let celli = x % this.spacing;
    let cellj = y % this.spacing;
    //console.log("here "+mouseX+" "+mouseY+" "+celli+" "+cellj);

    if (dist(celli, cellj, this.half, this.half) < this.pegSize/2) {
      this.selected.i = floor(x / this.spacing);
      this.selected.j = floor(y / this.spacing);
      this.selected.theta = 0;
    }
    this.pegs[i][j].clickCount ++;

    let celli = mouseX % this.spacing;
    let cellj = mouseY % this.spacing;
    let i = floor(mouseX / this.spacing);
    let j = floor(mouseY / this.spacing);

    if (dist(celli, cellj, this.half, this.half) < this.pegSize/2 && this.peg[i][j].clickCount < 4) {
      this.pegs[i][j].clickCount ++;
    }
    */
  }


  //added
  mousePressed() {
    if(dist(mouseX, mouseY, this.tx, this.ty) < this.rad){
      fill(6, 132,193);
      this.isDragt = true;
      this.currentColor = this.teal;
      console.log("clicked" + mouseX + " " + mouseY);
    }
    if(dist(mouseX, mouseY, this.px, this.py) < this.rad){
      this.isDragp = true;
      this.currentColor = this.purple;
      console.log("clicked" + mouseX + " " + mouseY);
    }
    if(dist(mouseX, mouseY, this.ix, this.iy) < this.rad){
      this.isDragi = true;
      this.currentColor = this.pink;
      console.log("clicked" + mouseX + " " + mouseY);
    }
  }

  //added
  mouseReleased() {

    let celli = mouseX % this.spacing;
    let cellj = mouseY % this.spacing;
    let i = floor(mouseX / this.spacing);
    let j = floor(mouseY / this.spacing);

    if (dist(celli, cellj, this.half, this.half) < this.pegSize/2) {
      console.log(celli + " " + cellj + " " + this.numPegs + " " + i + " " + j);
      this.pegs[i][j].filled = true;
      this.pegs[i][j].coloring = this.currentColor;

      if(this.pegs[i][j].clickCount <= 4){
        this.pegs[i][j].clickCount = this.pegs[i][j].clickCount + 1;
      }
      if(this.pegs[i][j].clickCount > 4) {
        this.pegs[i][j].clickCount = 4;
      }
/*
      start color and end color - can blend them

      c = c(start) *1.0 + c(end) *0
      c = c(start)*0.75 + c(end) *0.25
      50/50
      25/75
      0/100

      c(start) * (1-u) + c(end) *(u)

      u = clickCount / 4.0x

      textAlign(CENTER)

      text("clickCount", x, y)
      */
      //if mouse released in cell increase click count as long as click count isnt > max click count
    }

    this.isDragt = false;
    this.isDragb = false;
    this.isDragp = false;
    this.isDragi = false;

}
}

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
  draw small markers for empty cells !
  draw pallet - colors + more buttons - email with code files + clip of it working
  implement drag and drop from pallet
  updated filled array(and draw)

  draw in relation to top CORNER
    when character moves shift the top corner and changes everything else
    use y coordinate to decide if its street or grass
      i.e if y%200 = 0 make grassy
      keep hard numbers and when u draw add (x,y)
*/

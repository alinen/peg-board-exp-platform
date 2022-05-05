// Peg Board Task
// Aline Normoyle (alinen) and Lola Rodriguez (lrodriguez)

class PegBoard {

  constructor() {
    this.w = 0;
    this.h = 0;
    this.wantPegs = 15;
    this.spacing = this.w/this.wantPegs;
    this.pegSize = 50;
    this.half = 0;
    this.numPegs = 0;
    this.logfn = null

    //added
    this.tx = 35;
    this.ty = 35;
    this.px = 100;
    this.py = 35;
    this.ix = 165;
    this.iy = 35;
    this.rad = 0.9*(this.spacing/2);
    this.isDragging = false;
    this.pegs;
  }

  setup(p, logfn) {
    this.logfn = logfn;
    this.w = p.width;
    this.h = p.height;
    this.pegSize = 50;
    this.wantPegs = 15;
    this.spacing = this.w/this.wantPegs;
    this.half = this.spacing * 0.5;
    this.numPegs = p.floor(this.w / this.spacing) + 1;

    //added
    this.rad = 0.95*(this.spacing/2);
    this.tx = this.half;
    this.ty = this.half;
    this.px = this.half*3;
    this.py = this.half;
    this.ix = this.half*5;
    this.iy = this.half;

    this.teal = p.color(6, 132,193);
    //this.teal2 = p.color(41,107,139);
    this.black = p.color(0,0,0);
    this.purple = p.color(161, 130, 234);
    this.purple2 = p.color(63,34,134);
    this.pink = p.color(227, 130, 234);
    this.pink2 = p.color(122, 35, 129);
    this.currentColor = p.color(255);

    this.pegs = new Array(this.numPegs);
    for(var i = 0; i < this.pegs.length; i++){
      this.pegs[i] = new Array(this.numPegs);
      for(var j =0; j< this.pegs.length; j++){
        this.pegs[i][j] = new PegCell(p);
      }
    }
  }

  draw(p) {

    p.noStroke();
    p.fill("#fff8dc");
    p.rectMode(p.CORNER);
    p.rect(0, 0, this.w, this.h);


    p.fill("#bc8f8f");
    for (let i = 0; i < this.numPegs; i++) {
      for (let j = 0; j < this.numPegs; j++) {
        let x = this.half + this.spacing * i;
        let y = this.half + this.spacing * j;

        p.ellipse(x, y, 10,10);
      }
    }

    //added
    for(let i = 0; i < this.numPegs; i++){
      for(let j = 0; j < this.numPegs; j++) {
        if(this.pegs[i][j].filled == true){
          let x = this.half + this.spacing * i;
          let y = this.half + this.spacing * j;
          let u = this.pegs[i][j].clickCount/4.0;
          let coloring = p.color(255);

          if(this.pegs[i][j].coloring == this.teal){
            coloring = p.lerpColor(this.teal, this.black, u);
          }
          if(this.pegs[i][j].coloring == this.purple){
            coloring = p.lerpColor(this.purple, this.black, u);
          }
          if(this.pegs[i][j].coloring == this.pink){
            coloring = p.lerpColor(this.pink, this.black, u);
          }

          p.fill(coloring);

          var factor = (5 - this.pegs[i][j].clickCount)/4;
          var radi = this.rad * factor;
          p.ellipse(x, y, 2*radi, 2*radi);
          p.fill(0,0,0);
          p.textAlign(p.CENTER);
        }
      }
    }
    //added
    p.rectMode(p.CORNER);
    p.fill("#fff8dc");
    p.rect(0,0,this.rad*6,this.rad*2);

    p.fill(this.teal);
    p.ellipse(this.tx, this.ty, 2*this.rad, 2*this.rad);

    p.fill(this.purple);
    p.ellipse(this.px, this.py, 2*this.rad, 2*this.rad);

    p.fill(this.pink);
    p.ellipse(this.ix, this.iy, 2*this.rad, 2*this.rad);

    if(this.isDragging == true) {
      p.fill(this.currentColor);
      p.ellipse(p.mouseX, p.mouseY, 2*this.rad, 2*this.rad);
    }
  };

  //added
  mousePressed(p) {

    if(p.dist(p.mouseX, p.mouseY, this.tx, this.ty) < this.rad){
      this.isDragging = true;
      this.currentColor = this.teal;
      //console.log("clicked" + p.mouseX + " " + p.mouseY);
    }
    if(p.dist(p.mouseX, p.mouseY, this.px, this.py) < this.rad){
      this.isDragging = true;
      this.currentColor = this.purple;
      //console.log("clicked" + p.mouseX + " " + p.mouseY);
    }
    if(p.dist(p.mouseX, p.mouseY, this.ix, this.iy) < this.rad){
      this.isDragging = true;
      this.currentColor = this.pink;
      //console.log("clicked" + p.mouseX + " " + p.mouseY);
    }
  }

  //added
  mouseReleased(p) {

    let celli = p.mouseX % this.spacing;
    let cellj = p.mouseY % this.spacing;
    let i = p.floor(p.mouseX / this.spacing);
    let j = p.floor(p.mouseY / this.spacing);

    if (p.dist(celli, cellj, this.half, this.half) < this.pegSize/2) {
      //console.log(celli + " " + cellj + " " + this.numPegs + " " + i + " " + j);
      if (this.isDragging) {
        this.pegs[i][j].filled = true;
      }
      this.pegs[i][j].coloring = this.currentColor;

      if (this.pegs[i][j].filled) {
        if (this.logfn) {
          this.logfn(p, "PegBoard,pegdrop,"+i+","+j);
        }

        if(this.pegs[i][j].clickCount < 4){
          this.pegs[i][j].clickCount = this.pegs[i][j].clickCount + 1;
        }
        if(this.pegs[i][j].clickCount == 4) {
          if (this.logfn) {
            this.logfn(p, "PegBoard,peglock,"+i+","+j);
          }
        }
      }
    }

    this.isDragging = false;
  }
}


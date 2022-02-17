class crossyTimer {

  constructor() {
    this.mTime = 0;
    this.reset();
  }

  reset() {
    this.mTime = this.millis(); //millis() still a valid function in js? - doesnt seem like it millis() is not defined, this.millis() isnt either
  }

  getElapsedTime() {
    return (this.millis() - this.mTime)/1000.0;
  }
}

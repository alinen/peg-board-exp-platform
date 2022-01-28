class crossyTimer {

  constructor() {
    this.mTime = 0;
    reset();
  }

  reset() {
    this.mTime = millis(); //millis() still a valid function in js?
  }

  getElapsedTime() {
    return (millis() - this.mTime)/1000.0;
  }
}

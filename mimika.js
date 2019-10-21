"use strict";

class Mimika extends Animal {
  
  constructor(x, y) {
    super("mimika.png");

    this._x = x;
    this._y = y;

    this._walking = false;
  }
  
  update() {
    if (this.animationFinished) {
      this._walking = input.walking;
      this._direction = input.direction;
      
      if (this._walking) {
        this.walk(this._direction, 20);
      }
    }

    super.update();
  }
  
}

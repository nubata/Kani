"use strict";

class Kani extends Animal {
  
  constructor(x, y) {
    super("kani.png");
    
    this._x = x;
    this._y = y;

    this._direction = Math.floor(Math.random() * 4);
  }

  update() {
    if (this.animationFinished) {
      if (Math.random() < 0.05) {
        this._direction = Math.floor(Math.random() * 4);
      }
      while (this.walk(this._direction)) {
        this._direction = Math.floor(Math.random() * 4);
      }
    }

    super.update();
  }
  
}

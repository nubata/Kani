"use strict";

class Mimika extends Animal {
  
  constructor(x, y) {
    super("mimika.png");

    this._x = x;
    this._y = y;

    this._walking = false;
  }
  
  update() {
    if (game.scene != SCENE_PLAYING) {
      return;
    }

    if (this.animationFinished) {
      if (this._status == STATUS_ALIVE) {
        this._walking = input.walking;
        this._direction = input.direction;

        if (this._walking) {
          this.walk(this._direction);
        }
      } else if (this._status == STATUS_DYING) {
        this._status = STATUS_DEAD;
      }
    }

    super.update();
  }

  draw() {
    if (game.scene != SCENE_PLAYING) {
      return;
    }
    super.draw();
  }
  
  dieImmediately() {
    this._status = STATUS_DEAD;
  }

  die() {
    if (this._status != STATUS_ALIVE) {
      return;
    }

    const keyframes = [];
    for (let i = 0; i < 4 * 2; i++) {
      keyframes.push([i % 4, 4]);
    }
    for (let i = 0; i < 4 * 2; i++) {
      if (i % 2 == 0) {
        keyframes.push([0, 4]);
      } else {
        keyframes.push([0, -1]);
      }
    }
    for (let i = 0; i < 4; i++) {
      keyframes.push([0, 4]);
    }

    this.animate(keyframes, _DURATION_DYING, 0, 0, false);
    this._status = STATUS_DYING;
  }
  
}

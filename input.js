"use strict";

class Input {
  
  constructor() {
    document.addEventListener("keydown", (event) => this._onKeyDown(event));
    document.addEventListener("keyup", (event) => this._onKeyUp(event));

    this._buttons = [false, false, false, false];

    this._direction = DIRECTION_UP;
    this._walking = false;
  }

  get direction() {
    return this._direction;
  }
  
  get walking() {
    return this._walking;
  }
  
  _update() {
    this._walking = false;

    const directions = [
      DIRECTION_UP,
      DIRECTION_RIGHT,
      DIRECTION_DOWN,
      DIRECTION_LEFT
    ];

    for (const direction of directions) {
      if (this._buttons[direction]) {
        this._direction = direction;
        this._walking = true;
        break;
      }
    }
  }
  
  _onKeyDown(event) {
    switch (event.code) {
      case "ArrowUp":
        this._buttons[DIRECTION_UP] = true;
        break;
      case "ArrowRight":
        this._buttons[DIRECTION_RIGHT] = true;
        break;
      case "ArrowDown":
        this._buttons[DIRECTION_DOWN] = true;
        break;
      case "ArrowLeft":
        this._buttons[DIRECTION_LEFT] = true;
        break;
    }
    this._update();
  }
  
  _onKeyUp(event) {
    switch (event.code) {
      case "ArrowUp":
        this._buttons[DIRECTION_UP] = false;
        break;
      case "ArrowRight":
        this._buttons[DIRECTION_RIGHT] = false;
        break;
      case "ArrowDown":
        this._buttons[DIRECTION_DOWN] = false;
        break;
      case "ArrowLeft":
        this._buttons[DIRECTION_LEFT] = false;
        break;
    }
    this._update();
  }

}


const input = new Input();

"use strict";

const DIRECTION_UP = 0;
const DIRECTION_RIGHT = 1;
const DIRECTION_DOWN = 2;
const DIRECTION_LEFT = 3;

const STATUS_ALIVE = 0;
const STATUS_DYING = 1;
const STATUS_DEAD = 2;

const _DURATION_WALK = 20;
const _DURATION_DYING = 240;

class Animal {

  constructor(url) {
    this._sprite = new Sprite(url, TILE_WIDTH, TILE_HEIGHT);

    this._keyframes = [];
    this._duration = 0;

    this._frame = 0;
    this._loop = false;

    this._direction = DIRECTION_UP;
    this._status = STATUS_ALIVE;

    this._dx = 0;
    this._dy = 0;

    this.animate([[0, this._direction]], 1, 0, 0, false);

    this._x = Math.round(this.width / 2);
    this._y = Math.round(this.height / 2);
  }

  get direction() {
    return this._direction;
  }

  get status() {
    return this._status;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get width() {
    return this._sprite.width;
  }

  get height() {
    return this._sprite.height;
  }

  get irow() {
    return Math.floor(this._y / TILE_HEIGHT - 0.5);
  }

  get icol() {
    return Math.floor(this._x / TILE_WIDTH - 0.5);
  }

  animate(keyframes, duration, dx, dy, loop) {
    this._keyframes = keyframes;
    this._duration = duration;
    this._dx = dx;
    this._dy = dy;
    this._loop = loop;
    this._frame = -1;
  }

  walk(direction) {
    if (this._status != STATUS_ALIVE) {
      return false;
    }

    const keyframes = [];
    for (let i = 0; i < 4; i++) {
      keyframes.push([i, this._direction]);
    }

    let drow = 0;
    let dcol = 0;
    switch (direction) {
      case DIRECTION_UP:
        drow = -1;
        break;
      case DIRECTION_LEFT:
        dcol = -1;
        break;
      case DIRECTION_DOWN:
        drow = 1;
        break;
      case DIRECTION_RIGHT:
        dcol = 1;
        break;
    }

    let canceled = false;

    const irow1 = (this.irow + drow + maze.rows) % maze.rows;
    const icol1 = (this.icol + dcol + maze.cols) % maze.cols;
    const tile = maze.tile(irow1, icol1);

    if (tile == TILE_BLOCK) {
      canceled = true;
    }

    let duration = _DURATION_WALK;
    if (canceled) {
      drow = 0;
      dcol = 0;
      duration = 1;
    }

    const dx = TILE_WIDTH * dcol;
    const dy = TILE_HEIGHT * drow;

    this.animate(keyframes, duration, dx, dy, false);
    return canceled;
  }

  get animationFinished() {
    return this._frame >= this._duration;
  }

  update() {
    this._frame += 1;

    if (this.animationFinished) {
      this._x = Math.round(this._x);
      this._y = Math.round(this._y);
      if (this._loop) {
        this._frame = 0;
      }
    } else {
      this._x += this._dx / this._duration;
      this._y += this._dy / this._duration;
    }

    if (this._x < 0) {
      this._x = this._x + maze.width;
    } else if (this._x >= maze.width) {
      this._x = this._x - maze.width;
    }
    if (this._y < 0) {
      this._y = this._y + maze.height;
    } else if (this._y >= maze.height) {
      this._y = this._y - maze.height;
    }
  }

  draw() {
    let i = Math.floor(this._frame / this._duration * this._keyframes.length);
    if (i >= this._keyframes.length) {
      i = 0;
    }

    const keyframe = this._keyframes[i];

    const h = keyframe[0];
    const v = keyframe[1];
    
    if (h < 0 || v < 0) {
      return;
    }

    const x = Math.round(this._x);
    const y = Math.round(this._y);

    this._sprite.draw(h, v, x, y);
  }

}

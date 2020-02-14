"use strict";

class Riceball extends Animal {
  
  constructor(x, y) {
    super("riceball.png");
    
    this._x = x;
    this._y = y;

    this.disappear();
  }

  update() {
    if (this._status != STATUS_ALIVE || Math.random() < 0.001) {
      this.appear();
    }
    super.update();
  }

  appear() {
    let irow = 0;
    let icol = 0;

    do {
      irow = Math.floor(Math.random() * maze.rows);
      icol = Math.floor(Math.random() * maze.cols);
    } while(maze.tile(irow, icol) == TILE_BLOCK);

    this._x = Math.floor(TILE_WIDTH * (icol + 0.5));
    this._y = Math.floor(TILE_HEIGHT * (irow + 0.5));
    
    this.animate([[0, 0]], 1, 0, 0, true);
    this._status = STATUS_ALIVE;
  }

  disappear() {
    this.animate([[0, 1]], 1, 0, 0, true);
    this._status = STATUS_DEAD;
  }
  
}

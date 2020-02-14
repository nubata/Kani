"use strict";

const TILE_WIDTH = 32;
const TILE_HEIGHT = 32;

const TILE_EMPTY = 0;
const TILE_BLOCK = 1;
const TILE_SPAWNER = 2;
const TILE_START = 3;
const TILE_LAST = Math.max(TILE_EMPTY, TILE_BLOCK, TILE_SPAWNER, TILE_START);

class Maze {

  constructor(rows, cols) {
    this._rows = rows;
    this._cols = cols;

    this._tiles = [];
    for (let irow = 0; irow < this._rows; irow++) {
      const row = [];
      for (let icol = 0; icol < this._cols; icol++) {
        row.push(0);
      }
      this._tiles.push(row);
    }

    this._sprite = new Sprite("tile.png", TILE_WIDTH, TILE_HEIGHT);

    this.loadMap("stage1.json");
  }

  get isReady() {
    return this._ready;
  }

  loadMap(url) {
    this._ready = false;

    const request = new XMLHttpRequest();

    request.addEventListener("load", () => {
      const obj = JSON.parse(request.responseText);
      const data = obj["layers"][0]["data"];

      for (let irow = 0; irow < this._rows; irow++) {
        const row = this._tiles[irow];
        for (let icol = 0; icol < this._cols; icol++) {
          const offset = irow * this._cols + icol;
          let tile = data[offset];
          if (tile > TILE_LAST) {
            tile = TILE_EMPTY;
          }
          row[icol] = tile;
        }
      }

      this._ready = true;
    });

    request.open("GET", url, false);
    request.send();
  }

  get rows() {
    return this._rows;
  }

  get cols() {
    return this._cols;
  }

  get width() {
    return TILE_WIDTH * this._rows;
  }

  get height() {
    return TILE_HEIGHT * this._cols;
  }

  tile(irow, icol) {
    return this._tiles[irow][icol];
  }

  draw() {
    const context = graphics.context;

    for (let irow = 0; irow < this._rows; irow++) {
      const row = this._tiles[irow];
      for (let icol = 0; icol < this._cols; icol++) {
        const tile = row[icol]

        if (tile == TILE_BLOCK) {
            const x = Math.floor(TILE_WIDTH * (icol + 0.5));
            const y = Math.floor(TILE_HEIGHT * (irow + 0.5));

            const h = tile - 1;
            const v = 0;

            this._sprite.draw(h, v, x, y);
        }
      }
    }
  }
  
}


const maze = new Maze(15, 15);

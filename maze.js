"use strict";

const TILE_WIDTH = 32;
const TILE_HEIGHT = 32;

const EMPTY_TILE = 0;
const BLOCK_TILE = 1;
const SPAWNER_TILE = 2;
const START_TILE = 3;

class Maze {
  
  constructor(rows, cols) {
    this._rows = rows;
    this._cols = cols;

    this._tiles = [];
    for (let irow = 0; irow < this._rows; ++irow) {
      const row = [];
      for (let icol = 0; icol < this._cols; ++icol) {
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
          const tile = data[offset];
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

        if (tile != EMPTY_TILE && tile != START_TILE) {
            const x = Math.floor(TILE_WIDTH * (irow + 0.5));
            const y = Math.floor(TILE_HEIGHT * (icol + 0.5));

            const h = tile - 1;
            const v = 0;

            this._sprite.draw(h, v, x, y);
        }
      }
    }
  }
  
}


const maze = new Maze(15, 15);
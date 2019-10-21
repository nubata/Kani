"use strict";

class Game {
  
  constructor() {
    this._objects = [];

    this._ready = false;
    this._pausing = false;

    window.addEventListener("load", () => {
      graphics.setup(maze.width, maze.height);
      this._onTimeout();
    });
  }
  
  _onTimeout() {
    if (imageLoader.isReady && maze.isReady) {
      if (!this._ready) {
        this.setup();
        this._ready = true;
      }

      this.update();
      this.draw();
    }

    setTimeout(() => this._onTimeout(), 1000 / 60);
  }

  setup() {
    this._objects = [];

    let mimika = null;

    for (let irow = 0; irow < maze.rows; ++irow) {
      const x = Math.round(TILE_WIDTH * (irow + 0.5));
      for (let icol = 0; icol < maze.cols; ++icol) {
        const y = Math.round(TILE_HEIGHT * (icol + 0.5));

        const tile = maze.tile(irow, icol);
        if (tile == SPAWNER_TILE) {

          const kani = new Kani(x, y);
          this._objects.push(kani);

        } else if (tile == START_TILE) {
          
          if (mimika === null) {
            mimika = new Mimika(x, y);
            this._objects.push(mimika);
          }

        }
      }
    }
  }
  
  update() {
    for (const object of this._objects) {
      object.update();
    }
  }
  
  draw() {
    const context = graphics.context;

    context.clearRect(0, 0, graphics.width, graphics.height);

    maze.draw();
    
    for (const object of this._objects) {
      object.draw();
    }
    
    if (this._pausing) {
      context.fillStyle = "black";
      context.font = "12px sans-serif";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText("- Pause - ", 
        Math.round(graphics.width / 2), 
        Math.round(graphics.height / 2));
    }
  }
  
}


const game = new Game();

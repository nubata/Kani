"use strict";

const SCENE_LOADING = -1;

const SCENE_TITLE = 0;

const SCENE_PLAYING = 1;

class Game {

  constructor() {

    this._scene = SCENE_LOADING;

    this._enemies = [];
    this._mimika = null;
    this._riceball = null;
    
    this._eatenRiceballs = 0;
    this._survivalTime = 0;
    this._totalScore = 0;

    window.addEventListener("load", () => {
      graphics.setup(maze.width, maze.height);
      this._onTimeout();
    });
    
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case " ":
          if (this._mimika.status == STATUS_DEAD) {
            this.setup();
          }
          break;
        case "t":
          if (this._survivalTime > 0) {
            const currentURL = location.href;
            const tweetText = `ミミカはカニにやられるまで、${this._eatenRiceballs}個のおにぎりを食べて、${Math.floor(this._survivalTime)}秒生き残りました（${this._totalScore}点）`;
            const hashTag = "カニ";
            const twitterURL = `https://twitter.com/share?url=${location.href}&text=${tweetText}`;
            window.open(`${encodeURI(twitterURL)}%20%23${hashTag}`, "_blank");
          }
          break;
      }
    });
  }
  
  get scene() {
    return this._scene;
  }

  _onTimeout() {
    if (imageLoader.isReady && maze.isReady) {
      if (this._scene == SCENE_LOADING) {
        this.setup();
        this._mimika.dieImmediately();
        this._scene = SCENE_TITLE;
      }

      this.update();
      this.draw();
    }

    setTimeout(() => this._onTimeout(), 1000 / 60);
  }

  setup() {
    this._enemies = [];
    
    this._mimika = null;

    for (let irow = 0; irow < maze.rows; ++irow) {
      const y = Math.round(TILE_HEIGHT * (irow + 0.5));
      for (let icol = 0; icol < maze.cols; ++icol) {
      const x = Math.round(TILE_WIDTH * (icol + 0.5));

        const tile = maze.tile(irow, icol);
        if (tile == TILE_SPAWNER) {

          const kani = new Kani(x, y);
          this._enemies.push(kani);

        } else if (tile == TILE_START) {

          if (this._mimika === null) {
            this._mimika = new Mimika(x, y);
          }

        }
      }
    }
    
    this._riceball = new Riceball();
    this._eatenRiceballs = 0;
    
    this._startTime = Date.now();
    this._scene = SCENE_PLAYING;
  }

  update() {
    if (this._mimika.status == STATUS_ALIVE) {
      for (const enemy of this._enemies) {
        if (Math.abs(this._mimika.x - enemy.x) < TILE_WIDTH / 2
            && Math.abs(this._mimika.y - enemy.y) < TILE_HEIGHT / 2) {
          this._mimika.die();
        }
      }

      if (Math.abs(this._mimika.x - this._riceball.x) < TILE_WIDTH / 2
          && Math.abs(this._mimika.y - this._riceball.y) < TILE_HEIGHT / 2) {
        this._riceball.disappear();
        this._eatenRiceballs += 1;
      }
      
      this._survivalTime = (Date.now() - this._startTime) / 1000;
      this._totalScore = this._eatenRiceballs * 10 + Math.floor(this._survivalTime / 10);
    }

    this._riceball.update();
    this._mimika.update();

    for (const enemy of this._enemies) {
      enemy.update();
    }
  }

  draw() {
    const context = graphics.context;

    context.clearRect(0, 0, graphics.width, graphics.height);

    maze.draw();

    this._riceball.draw();
    this._mimika.draw();

    for (const enemy of this._enemies) {
      enemy.draw();
    }

    if (this._mimika.status == STATUS_DEAD) {
      if (this._survivalTime == 0) {
        this._drawMessage("スペースでスタート");
      } else {
        this._drawMessage("スペースでスタート・Tで得点をツイート");
      }
   }
    
    this._drawScoreBoard();
  }

  _drawScoreBoard() {
    let eatenRiceballs = 0;
    let survivalTime = 0;
    let totalScore = 0;

    if (this._scene == SCENE_PLAYING) {
      eatenRiceballs = this._eatenRiceballs;
      survivalTime = Math.floor(this._survivalTime);
      totalScore = this._totalScore;
    }

    const riceballField = document.getElementById("riceball");
    riceballField.innerHTML = eatenRiceballs.toFixed(0);

    const timeField = document.getElementById("time");
    timeField.innerHTML = survivalTime.toFixed(0);

    const scoreField = document.getElementById("score");
    scoreField.innerHTML = totalScore.toFixed(0);
  }

  _drawMessage(message) {
    const context = graphics.context;

    const x = Math.round(TILE_WIDTH * 1.5);
    const height = Math.round(TILE_HEIGHT * 1.5);
    const y = Math.round(graphics.height / 2 - height / 2);
    const width = Math.round(graphics.width - x * 2);

    context.fillStyle = "white";
    context.fillRect(x, y, width, height);
    context.strokeStyle = "black";
    context.strokeRect(x, y, width, height);

    context.fillStyle = "black";
    context.font = "20px sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(message,
      Math.round(graphics.width / 2),
      Math.round(graphics.height / 2));
  }

}


const game = new Game();

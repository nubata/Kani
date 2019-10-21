"use strict";

class Graphics {
  
  constructor() {
    this._canvas = null;
    this._context = null;
  }

  setup(width, height) {
    this._canvas = document.getElementById("canvas");
    this._canvas.width = width;
    this._canvas.height = height;

    this._context = this._canvas.getContext("2d");
  }
  
  get context() {
    return this._context;
  }

  get width() {
    return this._canvas.width;
  }

  get height() {
    return this._canvas.height;
  }
  
}


const graphics = new Graphics();

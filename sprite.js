"use strict";

class Sprite {
  
  constructor(url, width, height) {
    this._image = imageLoader.loadImage(url);
    
    this._width = width;
    this._height = height;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }
  
  draw(h, v, x, y) {
    const context = graphics.context;
    
    const sx = h * this._width;
    const sy = v * this._height;
    const sw = this._width;
    const sh = this._height;
    
    const dx = Math.round(x - this._height / 2);
    const dy = Math.round(y - this._width / 2);
    const dw = this._width;
    const dh = this._height;
    
    context.drawImage(this._image, sx, sy, sw, sh, dx,  dy, dw, dh);
  }
  
}

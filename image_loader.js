"use strict";

class ImageLoader {
  
  constructor() {
    this._images = new Map();
    this._loadingImages = new Map();
  }
  
  get isReady() {
    return this._loadingImages.size == 0;
  }
  
  loadImage(url) {
    let image = this._images[url];
    if (!image) {
      image = new Image();
      image.src = url;

      this._loadingImages[url] = image;
      image.onload = () => {
        this._loadingImages.delete(url);
      }
    }
    return image;
  }
  
}


const imageLoader = new ImageLoader();

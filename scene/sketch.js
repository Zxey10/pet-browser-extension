let img;
let x, y;
let w, h;
let playerSize = 32;
let dir;
let xspeed = 1.5;
let spriteSheet;
let spriteWidth = 48;
let spriteHeight = 48;
let numSprites = 16;
let currentSprite = 0;
let spritesPerRow = 4;
let isMirrored = false;
let bottomOffset = 10;
let lastSpriteChange = 0; 
let spriteChangeDelay = 30;
let idle1;
let idle2;

function preload() {
  spriteSheet = loadImage('http://127.0.0.1:5500/scene/assets/character.png');
  idle1 = loadImage('http://127.0.0.1:5500/scene/assets/cat/idle1.png');
  idle2 = loadImage('http://127.0.0.1:5500/scene/assets/cat/idle2.png');
}

function setup() {
  w = windowWidth;
  h = windowHeight / 5;
  createCanvas(w, h);
  x = 20;
  y = 100;
  dir = -1;
}

function draw() {
  background(220);

  let sx = (currentSprite % spritesPerRow) * spriteWidth;
  let sy = Math.floor(currentSprite / spritesPerRow) * spriteHeight;

  if (x + playerSize >= w || x <= 0) {
    dir *= -1;
    toggleMirror()
  }
  if (frameCount - lastSpriteChange >= spriteChangeDelay) {
    changeSpriteAction(); 
    lastSpriteChange = frameCount; 
  }
  x += dir * xspeed;

  image(idle1, 10, 10 ,60, 60)
  image(idle2, 100, 10 ,60, 60)


  if (isMirrored) {
    scale(-1, 1);
    image(spriteSheet, -x - spriteWidth , h - playerSize - bottomOffset, spriteWidth, spriteHeight, sx, sy, spriteWidth, spriteHeight);
  } else {
    image(spriteSheet, x, h - playerSize - bottomOffset, spriteWidth, spriteHeight, sx, sy, spriteWidth, spriteHeight);
  }
}


function changeSpriteAction() {
  currentSprite = (currentSprite + 1) % numSprites;
}

function toggleMirror() {
  isMirrored = !isMirrored;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  w = windowWidth
  h = windowHeight
}


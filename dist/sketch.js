let img;
let x, y;
let w, h;
let playerSize = 32;
let dir;
let xspeed = 3;
let spriteSheet;
let spriteWidth = 48;
let spriteHeight = 48;
let numSprites = 16;
let currentSprite = 0;
let spritesPerRow = 4;
let bottomOffset = 10;
let isMirrored = false;
let lastSpriteChange = 0; 
let spriteChangeDelay = 30;

function preload() {
  spriteSheet = loadImage('http://127.0.0.1:5500/scene/assets/character.png');
}

function setup() {
  w = windowWidth
  h = windowHeight
  createCanvas(w, h);
  let c = createCanvas(w, h)
  c.style('zIndex', '99999999999')
  c.style('bottom', '0')
  // c.style('width', '100%')
  c.style('right', '0')
  c.style('position', 'fixed')
  c.style('pointer-events', 'none')
  x = 20
  dir = -1;
}

function draw() {
  clear()

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
}
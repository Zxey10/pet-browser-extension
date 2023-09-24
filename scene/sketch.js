let img;
let x, y;
let w, h;
let playerSize = 32;
let dir;
let xspeed = 1.2;
let spriteSheet;
let spriteWidth = 50;
let spriteHeight = 50;
let numSprites = 16;
let currentSprite = 0;
let spritesPerRow = 4;
let isMirrored = false;
let bottomOffset = 10;
let lastSpriteChange = 0;
let spriteChangeDelay = 7;
let idle1;
let idle2;

const WALK = "WALK"
const JUMP = "JUMP"
const DEAD = "DEAD"

let states = [WALK, JUMP, DEAD]

let STATE = "WALK"
let currentSpriteImage;

const walkImages = {}
const walkImagesLength = 10
let currentWalkImage;
let currentWalkKey = 1;

const deadImages = {}
const deadImagesLength = 10
let currentDeadImage;
let currentDeadKey = 1;

const jumpImages = {}
const jumpImagesLength = 8
let currentJumpImage;
let currentJumpKey = 1;


//TODO ADD MORE ACTIONS
//TODO HOST THE SPRITES

function preload() {
  spriteSheet = loadImage('http://127.0.0.1:5500/scene/assets/character.png');
  idle1 = loadImage('http://127.0.0.1:5500/scene/assets/cat/idle1.png');
  idle2 = loadImage('http://127.0.0.1:5500/scene/assets/cat/idle2.png');
  for (let i = 1; i <= walkImagesLength; i++) {
    walkImages[i] = loadImage(`assets/cat/w${i}.png`);
    deadImages[i] = loadImage(`assets/cat/dead${i}.png`);
    if (i <= jumpImagesLength) {
      jumpImages[i] = loadImage(`assets/cat/j${i}.png`);
    }
  }
  currentWalkImage = walkImages[1]
  currentSpriteImage = walkImages[1]
  currentDeadImage = deadImages[1]
  currentJumpImage = jumpImages[1]
}

function setup() {
  w = windowWidth;
  h = windowHeight / 3;
  let c = createCanvas(w, h);
  c.mouseClicked(onClickCanvas);
  x = 20;
  y = 100;
  dir = 1;
}

function draw() {
  background(220);

  let sx = (currentSprite % spritesPerRow) * spriteWidth;
  let sy = Math.floor(currentSprite / spritesPerRow) * spriteHeight;

  if (x + spriteHeight >= w || x <= 0) {
    dir *= -1;
    toggleMirror()
  }
  if (frameCount - lastSpriteChange >= spriteChangeDelay) {
    // changeSpriteAction(); 
    console.log(STATE)
    switch (STATE) {
      case WALK:
        changeWalkingImage()
        break;
      case JUMP:
        changeJumpImage()
        break;
      case DEAD:
        changeDeadImage()
        break;
    }
    lastSpriteChange = frameCount;
  }
  x += dir * xspeed;


  if (isMirrored) {
    scale(-1, 1);
    image(currentSpriteImage, -x - spriteWidth, h - spriteHeight - bottomOffset, spriteWidth, spriteHeight, spriteWidth, spriteHeight);
  } else {
    image(currentSpriteImage, x, h - spriteHeight - bottomOffset, spriteWidth, spriteHeight, spriteWidth, spriteHeight);
  }

}


function changeSpriteAction() {
  currentSprite = (currentSprite + 1) % numSprites;
}

function doRandomAction() {
  let randomState = Math.floor(Math.random() * states.length)
  STATE = states[randomState]
}

function resetState(){
  bottomOffset = 10
  STATE = WALK
}

function changeWalkingImage() {
  if (currentWalkKey >= walkImagesLength) {
    currentWalkKey = 1
  }
  currentWalkKey++
  currentWalkImage = walkImages[currentWalkKey]
  currentSpriteImage = currentWalkImage
}

function changeDeadImage() {
  xspeed = 0
  if (currentDeadKey >= deadImagesLength) {
    currentDeadKey = 1
    STATE = WALK
    x = spriteWidth
    xspeed = 1.3
    return
  }
  currentDeadKey++
  currentDeadImage = deadImages[currentDeadKey]
  currentSpriteImage = currentDeadImage
}

function changeJumpImage() {
  bottomOffset += 5
  if(currentJumpKey >= jumpImagesLength /2 ){
    bottomOffset -= 5
  }
  if (currentJumpKey >= jumpImagesLength) {
    currentJumpKey = 1
    resetState()
  }
  currentJumpKey++
  currentJumpImage = jumpImages[currentJumpKey]
  currentSpriteImage = currentJumpImage
}


function toggleMirror() {
  isMirrored = !isMirrored;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  w = windowWidth
  h = windowHeight
}


function onClickCanvas() {
  console.log("Clicked")
  doRandomAction()
}

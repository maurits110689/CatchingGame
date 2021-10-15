function preload() {
  soundFormats('m4a', 'mp3', 'ogg')
  classroom = loadSound('classroom.mp3')
  classboard = loadImage('classboard.jpg')
  bg = loadImage('classroom.jpg')
  garbagecan = loadImage('garbagecan.png')
  paperprop = loadImage('paperprop.png')
}

function setup() {
  createCanvas(600, 400)
  soundFormats('m4a', 'mp3', 'ogg')
  sound = loadSound('can.mp3')
  bgsound = loadSound('schoolbellsound.mp3')
  player = new Garbagecan()
}

var score = 0
var speed = 3
var y = -20
var x =  100
var screen = 0
var highscore = 0
paperprops = []

class Paperprop {
  constructor(x, y, w, h) {
    this.x = random(width)
    this.y = 0
    this.w = 40
    this.h = 40
    if (score > 5) {
			this.vy = 7;
		}
		if (score > 15) {
			this.vy = 9;
		}
		else {
			this.vy = 5;
		}
  }
  draw() {
    image(paperprop, this.x, this.y, this.w, this.h)
    this.y += this.vy
  }

  checkCollision() {
    if (player.y < this.y-20) {
      if (player.x + player.w > this.x && player.x < this.x + this.w) {
        score += 1
        sound.play()
          if (score > highscore) {
            highscore = score
          }
        let idx = paperprops.indexOf(this)
        paperprops.splice(idx,1)
      }
    }
    if (this.y > height) {
      screen = 2
      bgsound.amp(0.4)
      bgsound.play()
      classroom.stop()
    }
  }
}

class Garbagecan {
  constructor() {
    this.x = 0
    this.y = height - 50
    this.w = 100
    this.h = 70
  }
  draw() {
    rectMode(CENTER)
    this.x = mouseX-35
    image(garbagecan,this.x, this.y, this.w, this.h)
  }
}

function draw() {
  background(0)
  if (screen == 0) {
    startScreen()
  } else if (screen == 1) {
    gameOn()
  } else if (screen == 2) {
    endScreen()
  }
}

function startScreen() {
  background(classboard)
  fill(255)
  textFont('Georgia')
  textSize(18)
  textAlign(CENTER)
  text('Welcome to the Cathing Game,', width / 2, height / 5 + 45)
  textSize(12)
  text('move your mouse to catch the paper balls flying around the classroom!', width / 2, height / 4 + 45)
  textSize(13)
  text('Click to start.....', width / 2, height / 4 + 65)
  reset()
}

function gameOn() {
  background(bg)
  text(LEFT)
  fill(255)
  if (highscore < 10 || score >= 10) {
    text("Score = " + score, 37, 20)
  }
  else {
    text("Score = " + score, 34, 20)
  }
  text("Highscore = " + highscore, 50, 40)
  player.draw()
  if (frameCount % 100 == 0) {
    paperprops.push(new Paperprop())
  }

  if (frameCount % 100 == 50) {
    paperprops.push(new Paperprop())
  }

  paperprops.forEach((b) => {
    b.draw()
    b.checkCollision()
  })

  this.y += speed
}

function endScreen() {
  background(classboard)
  fill(255)
  textFont('Georgia')
  textSize(18)
  textAlign(CENTER)
  text('GAME OVER', width / 2, height / 4 + 20)
  text("Score = " + score, width / 2, height / 4 + 40)
  text('Click if you want play again!', width / 2, height / 4 + 60)
}

function mousePressed() {
  if (screen == 0) {
    screen = 1
    classroom.amp(1)
    classroom.play()
  }
  else if (screen == 2) {
    paperprops = []
    screen = 0
  }
}

function reset() {
  score = 0
	speed = 3
	y = -20
}

function pickRandom(){
	x= random(20,width-20)
}
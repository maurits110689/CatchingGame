function preload(){
  soundFormats('m4a', 'mp3', 'ogg')
  classroom = loadSound('classroom.mp3')
}

function setup() {
  createCanvas(600, 400)
  paperprop = loadImage('paperprop.png')
  garbagecan = loadImage('garbagecan.png')
  classboard = loadImage('classboard.jpg')
  bg = loadImage('classroom.jpg')
  soundFormats('m4a', 'mp3', 'ogg')
  sound = loadSound('can.mp3')
  bgsound = loadSound('schoolbellsound.mp3')
}

var score = 0
var speed = 3
var y = -20
var x = 100
var screen = 0
var highscore = 0

function startScreen(){
	  background(classboard)
    fill(255)
    textFont('Georgia')
    textSize(18)
		textAlign(CENTER)
		text('Welcome to the Cathing Game,', width / 2, height / 5 + 45)
    textSize(12)
    text('move your mouse to catch the paper balls flying around the classroom!', width / 2, height / 4 + 45)
    textSize(13)
    text('Click to start.....', width / 2, height / 4 + 65);
		reset();
}

function GameOn(){
  background(bg)
  text(LEFT)
  if(highscore < 10 || score >= 10){
    text("Score = " + score,37,20)
  }
  else{
    text("Score = " + score,34,20)
  }
  text("Highscore = " + highscore,50,40)
  fill(255)
  image(paperprop,x,y,40,40)
  rectMode(CENTER)
  image(garbagecan,mouseX-35,height-50,100,70)
  y+= speed;
  if(y > height){
  	screen = 2
    let volume = map(mouseX, 0, width, 0, 1)
    volume = constrain(volume, 0, 1)
    bgsound.amp(0.4)
    bgsound.play()
    classroom.stop()
	 }
  if(y > height-10 & x > mouseX-20 & x < mouseX+20){
  	y=-20
    speed+=0.25
    score+= 1
    sound.play()
    if (score > highscore)
      highscore = score
    }
	if(y==-20){
  	pickRandom()
  }
}

function pickRandom(){
	x= random(20,width-20)
}

function reset(){
	  score = 0
  	speed = 3
  	y = -10
}

function draw() {
	if(screen == 0){
    startScreen()
  }
  else if(screen == 1){
  	GameOn()
  }
  else if(screen == 2){
  	endScreen()
  }	
}

function endScreen(){
  	background(classboard)
		fill(255)
    textFont('Georgia')
    textSize(18)
    textAlign(CENTER)
		text('GAME OVER', width / 2, height / 4 + 20)
  	text("Score = " + score, width / 2, height / 4 + 40)
		text('Click if you want play again!', width / 2, height / 4 + 60)
}

function mousePressed(){
	if(screen == 0){
  	screen = 1
    classroom.amp(1);
    classroom.play()
  }
  else if(screen == 2){
    screen = 0
  }
}
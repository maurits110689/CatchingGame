function setup() {
  createCanvas(600, 400);
  paperprop = loadImage('paperprop.png')
  garbagecan = loadImage('garbagecan.png')
  bg = loadImage('classroom.jpg')
}

var score = 0
var speed = 3
var y = -10
var x = 100
var screen = 0
var highscore = 0


function startScreen(){
	  background(100, 100, 100)
    fill(255)
    textFont('Georgia');
    textSize(18)
		textAlign(CENTER);
		text('Welcome to the Cathing Game,', width / 2, height / 3 + 45)
    text('move your mouse to catch the balls flying around the screen!', width / 2, height / 2 + 4)
    textSize(15)
    text('click to start.....', width / 2, height / 2 + 28);
		reset();
}

function GameOn(){
  background(bg)
  text("Score = " + score,40,20)
  text("Highscore = " + highscore,55,40)
  text(CENTER)
  fill(255)
  image(paperprop,x,y,40,40)
  rectMode(CENTER)
  image(garbagecan,mouseX,height-50,100,70)
  y+= speed;
  if(y > height){
  	screen = 2
	 }
  if(y > height-10 & x > mouseX-40 & x < mouseX+40){
  	y=-20
    speed+=0.25
    score+= 1
    if (score > highscore)
      highscore = score;
  }
	if(y==-20){
  	pickRandom();
  }
}

function pickRandom(){
	x= random(20,width-20)
}

function reset(){
	  score = 0;
  	speed = 3;
  	y = -10;
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
  	background(100, 100, 100)
		fill(255)
    textFont('Georgia');
    textSize(18)
    textAlign(CENTER)
		text('GAME OVER', width / 2, height / 2)
  	text("Score = " + score, width / 2, height / 2 + 20)
		text('Click if you want play again!', width / 2, height / 2 + 40);
}

function mousePressed(){
	if(screen == 0){
  	screen = 1
  }
  else if(screen == 2){
  	screen = 0
  }
}
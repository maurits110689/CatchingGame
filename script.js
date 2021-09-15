function setup() {
  createCanvas(600, 400);
}

var score = 0
var speed = 3
var y = 0
var x = 0
var screen = 0

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

function draw() {
	if(screen == 0){
    startScreen()
  }else if(screen == 1){
  	game()
  }else if(screen==2){
  	endScreen()
  }	
}
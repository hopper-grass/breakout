//Script to simulate a basic breakout-style game

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//Ball
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;

//Paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;

//User Input
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){
	if(e.key == "Right" || e.key == "ArrowRight") {
		rightPressed = true;
	} else if(e.key == "Left" || e.key == "ArrowLeft") {
		leftPressed = true;
	}
}

function keyUpHandler(e){
	if(e.key == "Right" || e.key == "ArrowRight") {
		rightPressed = false;
	} else if(e.key == "Left" || e.key == "ArrowLeft") {
		leftPressed = false;
	}
}

function drawBall(){
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#D8BFD8";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "gray";
	ctx.fill();
	ctx.closePath();
}

function draw(){
	//Clear out the frame
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawBall();
	drawPaddle();

	//Ball Collision detection
	var addX = x + dx;
	var addY = y + dy;

	if(addX > canvas.width - ballRadius || addX < ballRadius) {
    	dx = -dx;
	}

	if(addY > canvas.height - ballRadius || addY < ballRadius) {
    	dy = -dy;
	}

	//Paddle Collision detection
	if(rightPressed) {
		paddleX += 7;
		if(paddleX + paddleWidth > canvas.width) { paddleX = canvas.width - paddleWidth; }
	} else if(leftPressed) {
		paddleX -= 7;
		if (paddleX < 0) { paddleX = 0; }
	}

	//Update locations
	x += dx;
	y += dy;
}

setInterval(draw, 10); //call draw every 10 milliseconds

//Simple script to simulate a basic breakout-style game

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height-30;

//Adjust these to change ball speed
var dx = 2;
var dy = -2;

var ballRadius = 10;

function drawBall(){
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#D8BFD8";
	ctx.fill();
	ctx.closePath();
}

function draw(){
	//Clear out the frame
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawBall();

	//Update locations
	x += dx;
	y += dy;

	//Collision detection
	var addX = x + dx;
	var addY = y + dy;

	if(addX > canvas.width-ballRadius || addX < ballRadius) {
    	dx = -dx;
	}

	if(addY > canvas.height-ballRadius || addY < ballRadius) {
    	dy = -dy;
	}	
}

setInterval(draw, 10); //call draw every 10 milliseconds

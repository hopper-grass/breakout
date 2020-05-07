//Simple script to simulate a basic breakout-style game

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height-30;

var dx = 2;
var dy = -2;

function drawBall(){
	ctx.beginPath();
	ctx.arc(x, y, 10, 0, Math.PI*2);
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
}

setInterval(draw, 10); //call draw every 10 milliseconds

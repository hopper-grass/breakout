//Script to simulate a basic breakout-style game

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var score = 0;

//Ball
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var ballColor = "#FFA69E";

//Paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;

//Bricks
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for(var c = 0; c < brickColumnCount; ++c) {
	bricks[c] = [];
	for(var r = 0; r < brickRowCount; ++r) {
		bricks[c][r] = { x: 0, y: 0, status: 1 };
	}
}

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
	ctx.fillStyle = ballColor;
	ctx.fill();
	ctx.closePath();
}

function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#A28497";
	ctx.fill();
	ctx.closePath();
}

function drawBricks(){
	for(var c = 0; c < brickColumnCount; ++c) {
		for(var r = 0; r < brickRowCount; ++r) {
			if(bricks[c][r].status == 1) {
				var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
				var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;

				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;

				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = pickColor(r);
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#A28497";
    ctx.fillText("Score: " + score, 8, 20);
}

function pickColor(r){
	var ret = "";
	switch(r){
		case 0:
			ret = "#61A0AF";
			break;
		case 1:
			ret = "#96C9DC";
			break;
		case 2:
			ret = "#7CDEDC";
			break;
		default:
			ret = "#61A0AF";
	}
	return ret;
}

function collisionDetection() {
    for(var c = 0; c < brickColumnCount; ++c) {
        for(var r = 0; r < brickRowCount; ++r) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;

					changeBallColor(1);
					score = score + 100;

					if(score == brickRowCount * brickColumnCount * 100) {
                        alert("CONGRATULATIONS! Your score was " + score + ".");
                        document.location.reload();
                        clearInterval(interval); // Needed for Chrome to end game
                    }
                }
            }
        }
    }
}

function changeBallColor(num){
	if(num == 0) {
		ballColor = "#FFA69E";
	} else if(num == 1) {
		ballColor = "#E4572E";
	}
}

function draw(){
	//Clear out the frame
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawBall();
	drawPaddle();
	drawBricks();
	collisionDetection();
	drawScore();

	//Ball Collision detection
	var addX = x + dx;
	var addY = y + dy;

	if(addX > canvas.width - ballRadius || addX < ballRadius) {
    	dx = -dx;
	}

	if(addY < ballRadius) {
    	dy = -dy;
	} else if(addY > canvas.height - ballRadius) {
		if(x > paddleX && x < paddleX + paddleWidth){
			dy = -dy;
			changeBallColor(0);
		} else {
			alert("GAME OVER");
			document.location.reload();
			clearInterval(interval);
		}
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

var interval = setInterval(draw, 10); //call draw every 10 milliseconds

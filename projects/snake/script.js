// DOM stuff
const gameboard = document.getElementById("gameboard");
const buttons = document.querySelectorAll("#controls button");
const start = document.getElementById("start");
const pause = document.getElementById("pause");
const scoreboard = document.getElementById("score");
const highscore = document.getElementById("high");

// Constants for board
const rows = 10;
const cols = 10;
const fieldWidth = gameboard.clientWidth / cols;
const fieldHeight = gameboard.clientHeight / rows;
const ctx = gameboard.getContext('2d');
// Variables


let food = {
    x: 0,
    y: 0,
    color: "",
}

let game = {
    intervall: "", // just needed to pause the game
    isRunning: false, // no na
    score: 0
} 

let snake = {
    headX: Math.floor(Math.random()*cols),
    headY:  Math.floor(Math.random()*rows),
    tail: [],
    direction: "down", // directen in which the snake is moving
    speed: 800 // in ms
}

// Functions
function initBoard() {
    snake.tail = [];
    snake.headX= Math.floor(Math.random()*cols);
    snake.headY=   Math.floor(Math.random()*rows);
    snake.speed = 800;

    if (!localStorage.getItem("score")) {
        
        localStorage.setItem("score", JSON.stringify({name: "nobody", score: 0}))
    }
    let saved = JSON.parse(localStorage.getItem("score"));
    updateHighScore(saved.name, saved.score);

    updateScore(-game.score)
    spawnFood();
    drawBoard();

}

function updateHighScore(name, score) {
    highscore.innerHTML = `High score: ${score} points by ${name}.`
}

function spawnFood() {
    let hue = Math.round(Math.random()*360);
    food.color = `hsl(${hue}, 100%, 50%)`;
    food.x = Math.floor(Math.random()*cols);
    food.y = Math.floor(Math.random()*rows);

    if (snake.tail.some(foodInSnake) ) {
        spawnFood();
    } 
}

function foodInSnake(element, index, array) {
    return element.equals([food.x, food.y]);
}

function drawBoard() {
    ctx.clearRect (0, 0, gameboard.clientWidth, gameboard.clientHeight);

    //place food
    ctx.fillStyle = food.color;
    let centerX = fieldWidth*food.x + fieldWidth / 2;
    let centerY = fieldHeight*food.y + fieldHeight / 2;
    let radius = fieldWidth/2-3;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fill();
    let foodIcon = "🍉";
    ctx.font = "30px Arial";
    ctx.fillText(foodIcon, centerX-(ctx.measureText(foodIcon).width/2), centerY+10)
    
    //place snake tail
    for (var snakePart = 0; snakePart < snake.tail.length; snakePart++) {
        ctx.fillStyle = "darkgreen"
        ctx.fillRect(fieldWidth*snake.tail[snakePart][0],fieldHeight*snake.tail[snakePart][1],fieldWidth,fieldHeight)
    }   

    //place snake head
    ctx.fillStyle = "green";
    ctx.fillRect(fieldWidth*snake.headX,fieldHeight*snake.headY,fieldWidth,fieldHeight);

    ctx.fillStyle = "white";
    let snakeEyes = "👁 👁";
    ctx.font = "30px Arial";
    ctx.fillText(snakeEyes, fieldWidth*snake.headX+7, fieldHeight*snake.headY+40)
}

function gameLoop() {
    game.intervall = setInterval(turn, snake.speed);
}

function turn() {
    moveSnake();
    eat();
    drawBoard();

}

function moveSnake() {
    snake.tail.push([snake.headX,snake.headY]);
    switch(snake.direction) {
        case "up":
            if (snake.headY === 0) {
                snake.headY = rows;
            }
            snake.headY-=1;
            break;
        case "down":
            if (snake.headY === rows-1) {
                snake.headY = -1;
            }
            snake.headY+=1;
            break;
        case "left":
            if (snake.headX === 0) {
                snake.headX = cols;
            }
            snake.headX-=1;
            break;
        case "right":
            if (snake.headX === cols-1) {
                snake.headX = -1;
            }
            snake.headX+=1;
            break;
    }

    let lastTailPlace = snake.tail.shift();
}

function eat() {
    if (snake.headX == food.x && snake.headY == food.y) {
        increaseScore();
        spawnFood();
        updateSnakeLength();

    }
    else {
        for (var snakePart = 0; snakePart < snake.tail.length; snakePart++) {
            if (snake.headX == snake.tail[snakePart][0] && snake.headY == snake.tail[snakePart][1]) {
                gameOver();
            }
        }   

    }
}

function updateSnakeLength() {
    snake.tail.push([snake.headX, snake.headY]);
}

function updateScore(amount) {
    game.score+=amount;
    scoreboard.innerHTML = game.score;
}
function increaseScore() {
    updateScore(1)
    increaseGameSpeed();
}

function gameOver() {
    saveScore();
    initBoard();
    pauseGame();
    drawBoard();
    alert("Game over! Start again?")
    startGame();
}

function increaseGameSpeed() {
    snake.speed = Math.round(800/(game.score));
    pauseGame();
    startGame();

}

function startGame() {
    if (!game.isRunning) {
        gameLoop();
        game.isRunning = true
    }
}
function pauseGame() {
    if (game.isRunning) {
        clearInterval(game.intervall)
        game.isRunning = false;
    }
}

function handleKeyPress(e) {
    if (e.keyCode === 87 || e.keyCode === 38) {
        snake.direction = "up";
    } else if (e.keyCode === 65 || e.keyCode === 37) {
        snake.direction = "left";
    } else if (e.keyCode === 68 || e.keyCode === 39) {
        snake.direction = "right";
    } else if (e.keyCode === 83 || e.keyCode === 40) {
        snake.direction = "down";
    } else if (e.keyCode === 32) {
        game.isRunning ? pauseGame() : startGame();
    }
}

function saveScore() {
    const currentScore = game.score;
    let saved = JSON.parse(localStorage.getItem("score"));
    if (currentScore > saved.score) {
        console.log(currentScore, saved.score)
        const name = prompt("New High Score! What's your name?");
        
        saved = {
            "name": name,
            "score": currentScore
        }
        localStorage.setItem("score", JSON.stringify(saved));
        updateHighScore(name, currentScore);
    }
}

//Event Listeners
start.addEventListener("click", startGame);
pause.addEventListener("click", pauseGame);
buttons.forEach(button => button.addEventListener("click", (e) => snake.direction = e.target.dataset.direction ));


window.addEventListener("keydown", handleKeyPress);
// Go
initBoard();
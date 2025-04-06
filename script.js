let score = 0;

// Function to move the square randomly
function moveSquare() {
    let gameContainer = document.getElementById("game-container");
    let square = document.getElementById("square");

    let maxX = gameContainer.clientWidth - square.clientWidth;
    let maxY = gameContainer.clientHeight - square.clientHeight;

    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);

    square.style.left = randomX + "px";
    square.style.top = randomY + "px";
}

// Function to increase score
document.getElementById("square").addEventListener("click", function() {
    score++;
    document.getElementById("score").innerText = score;
    moveSquare();
});

// Move the square every second
setInterval(moveSquare, 1000);
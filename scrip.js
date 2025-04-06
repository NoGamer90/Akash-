const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const tileSize = 20;
const tileCount = canvas.width / tileSize;
let score = 0;

// Initial snake setup
let snake = [{ x: 10, y: 10 }];
let food = {
  x: Math.floor(Math.random() * tileCount),
  y: Math.floor(Math.random() * tileCount)
};

// Initial direction: moving to the right
let dx = 1;
let dy = 0;

// Direction buffer to prevent reversing directly
let nextDx = dx;
let nextDy = dy;

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp' && dy === 0) {
    nextDx = 0; nextDy = -1;
  } else if (e.key === 'ArrowDown' && dy === 0) {
    nextDx = 0; nextDy = 1;
  } else if (e.key === 'ArrowLeft' && dx === 0) {
    nextDx = -1; nextDy = 0;
  } else if (e.key === 'ArrowRight' && dx === 0) {
    nextDx = 1; nextDy = 0;
  }
});
setInterval(updateGame, 150);

// Add mobile controller support
document.getElementById('upBtn').addEventListener('click', () => {
  if (dy === 0) {
    nextDx = 0; nextDy = -1;
  }
});

document.getElementById('downBtn').addEventListener('click', () => {
  if (dy === 0) {
    nextDx = 0; nextDy = 1;
  }
});

document.getElementById('leftBtn').addEventListener('click', () => {
  if (dx === 0) {
    nextDx = -1; nextDy = 0;
  }
});

document.getElementById('rightBtn').addEventListener('click', () => {
  if (dx === 0) {
    nextDx = 1; nextDy = 0;
  }
});

function drawTile(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
}

function drawFood() {
  ctx.shadowColor = 'lime';
  ctx.shadowBlur = 10;
  drawTile(food.x, food.y, 'lime');
  ctx.shadowBlur = 0;
}

function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    const shade = 100 + i * 10;
    const gray = Math.min(shade, 200); // limit shade
    const color = `rgb(${gray}, ${gray}, ${gray})`;
    drawTile(snake[i].x, snake[i].y, color);
  }
}

function updateGame() {
  dx = nextDx;
  dy = nextDy;

  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  if (
    head.x < 0 || head.x >= tileCount ||
    head.y < 0 || head.y >= tileCount ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    alert('Game Over! Your score: ' + score);
    document.location.reload();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById('score').innerText = 'Score: ' + score;
    food = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };
  } else {
    snake.pop();
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFood();
  drawSnake();
}

// Game loop: updates every 150ms
setInterval(updateGame, 150);
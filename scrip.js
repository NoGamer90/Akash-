document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('game-board');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('score');
    const finalScoreElement = document.getElementById('final-score');
    const gameOverScreen = document.querySelector('.game-over');
    const replayBtn = document.getElementById('replay-btn');
    
    // Game settings
    const gridSize = 20;
    const tileCount = 20;
    const initialSpeed = 7;
    
    // Set canvas size
    canvas.width = gridSize * tileCount;
    canvas.height = gridSize * tileCount;
    
    // Game variables
    let snake = [];
    let food = {};
    let direction = 'right';
    let nextDirection = 'right';
    let score = 0;
    let gameSpeed = initialSpeed;
    let gameLoop;
    let lastRenderTime = 0;
    
    // Initialize game
    function initGame() {
        // Create initial snake
        snake = [
            {x: 10, y: 10},
            {x: 9, y: 10},
            {x: 8, y: 10}
        ];
        
        // Create first food
        createFood();
        
        // Reset game state
        direction = 'right';
        nextDirection = 'right';
        score = 0;
        gameSpeed = initialSpeed;
        scoreElement.textContent = score;
        
        // Hide game over screen
        gameOverScreen.style.display = 'none';
    }
    
    // Create food at random position
    function createFood() {
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
        
        // Make sure food doesn't appear on snake
        for (let segment of snake) {
            if (segment.x === food.x && segment.y === food.y) {
                return createFood();
            }
        }
    }
    
    // Main game loop
    function gameUpdate(currentTime) {
        if (!lastRenderTime) {
            lastRenderTime = currentTime;
        }
        
        const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
        if (secondsSinceLastRender < 1 / gameSpeed) {
            requestAnimationFrame(gameUpdate);
            return;
        }
        lastRenderTime = currentTime;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw food with neon green color and shadow
        ctx.shadowColor = 'rgba(57, 255, 20, 0.7)';
        ctx.shadowBlur = 10;
        ctx.fillStyle = '#39ff14';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
        ctx.shadowBlur = 0;
        
        // Draw snake with different shades of gray and black borders
        for (let i = 0; i < snake.length; i++) {
            // Calculate shade of gray (darker for tail)
            const shade = 200 - (i * 10);
            ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade})`;
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            
            ctx.beginPath();
            ctx.rect(
                snake[i].x * gridSize, 
                snake[i].y * gridSize, 
                gridSize, 
                gridSize
            );
            ctx.fill();
            ctx.stroke();
        }
        
        // Move snake
        const head = {x: snake[0].x, y: snake[0].y};
        
        // Apply next direction
        direction = nextDirection;
        
        // Update head position based on direction
        switch (direction) {
            case 'up':
                head.y--;
                break;
            case 'down':
                head.y++;
                break;
            case 'left':
                head.x--;
                break;
            case 'right':
                head.x++;
                break;
        }
        
        // Check for collision with walls
        if (
            head.x < 0 || 
            head.x >= tileCount || 
            head.y < 0 || 
            head.y >= tileCount
        ) {
            gameOver();
            return;
        }
        
        // Check for collision with self
        for (let i = 0; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                gameOver();
                return;
            }
        }
        
        // Add new head
        snake.unshift(head);
        
        // Check if snake ate food
        if (head.x === food.x && head.y === food.y) {
            // Increase score
            score++;
            scoreElement.textContent = score;
            
            // Increase speed slightly
            gameSpeed += 0.5;
            
            // Create new food
            createFood();
        } else {
            // Remove tail if no food was eaten
            snake.pop();
        }
        
        requestAnimationFrame(gameUpdate);
    }
    
    // Game over function
    function gameOver() {
        cancelAnimationFrame(gameLoop);
        finalScoreElement.textContent = score;
        gameOverScreen.style.display = 'flex';
    }
    
    // Handle keyboard input
    function handleKeyPress(e) {
        // Prevent default behavior for arrow keys
        if ([37, 38, 39, 40].includes(e.keyCode)) {
            e.preventDefault();
        }
        
        // Change direction based on key press
        switch (e.keyCode) {
            case 37: // Left arrow
                if (direction !== 'right') nextDirection = 'left';
                break;
            case 38: // Up arrow
                if (direction !== 'down') nextDirection = 'up';
                break;
            case 39: // Right arrow
                if (direction !== 'left') nextDirection = 'right';
                break;
            case 40: // Down arrow
                if (direction !== 'up') nextDirection = 'down';
                break;
        }
    }
    
    // Event listeners
    document.addEventListener('keydown', handleKeyPress);
    replayBtn.addEventListener('click', () => {
        initGame();
        gameLoop = requestAnimationFrame(gameUpdate);
    });
    
    // Start the game
    initGame();
    gameLoop = requestAnimationFrame(gameUpdate);
});
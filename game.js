// Get the canvas element
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Define the player
const player = {
  x: canvasWidth / 2,
  y: canvasHeight - 20,
  width: 20,
  height: 20,
  speed: 5
};

// Define the enemies
const enemies = [];
const enemySpeed = 2;

// Main game loop
function update() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  // Draw the player
  ctx.fillStyle = 'blue';
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Update and draw the enemies
  enemies.forEach((enemy, index) => {
    enemy.y += enemySpeed;
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, enemy.radius, 0, 2 * Math.PI);
    ctx.fill();

    // Remove the enemy if it's off the screen
    if (enemy.y > canvasHeight) {
      enemies.splice(index, 1);
    }
  });

  // Add new enemies
  if (Math.random() < 0.1) {
    const enemy = {
      x: Math.random() * (canvasWidth - 20),
      y: 0,
      radius: 10
    };
    enemies.push(enemy);
  }

  // Handle player movement
  if (keysPressed['ArrowLeft']) {
    player.x -= player.speed;
  }
  if (keysPressed['ArrowRight']) {
    player.x += player.speed;
  }
   if (keysPressed['ArrowUp']) {
    player.y -= player.speed;
  }
    if (keysPressed['ArrowDown']) {
      player.y += player.speed;
    }


  // Keep the player within the canvas
  player.x = Math.max(0, Math.min(player.x, canvasWidth - player.width));

  // Check for collisions
  enemies.forEach(enemy => {
    const distanceX = Math.abs(player.x + player.width / 2 - enemy.x);
    const distanceY = Math.abs(player.y + player.height / 2 - enemy.y);
    if (distanceX < player.width / 2 + enemy.radius && distanceY < player.height / 2 + enemy.radius) {
      alert('Game Over!');
      window.location.reload();
    }
  });

  requestAnimationFrame(update);
}

// Handle keyboard input
const keysPressed = {};
document.addEventListener('keydown', event => {
  keysPressed[event.key] = true;
});
document.addEventListener('keyup', event => {
  keysPressed[event.key] = false;
});

// Start the game
update();

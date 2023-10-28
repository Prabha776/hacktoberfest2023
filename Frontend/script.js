// Create a Paper.js project for a simple game

const canvas = document.getElementById("myCanvas");
canvas.width = 600;
canvas.height = 480;
paper.setup(canvas);

// Define game variables
let score = 0;
let lives = 3;
let gameover = false;

// Create the player
const player = new paper.Path.Rectangle({
  point: [paper.view.center.x - 20, paper.view.size.height - 40],
  size: [40, 40],
  fillColor: "red",
});

// Create the enemies
const blueEnemy = new paper.Path.Rectangle({
  point: [paper.view.center.x - 20, 20],
  size: [40, 40],
  fillColor: "blue",
});

const greenEnemy = new paper.Path.Rectangle({
  point: [paper.view.center.x - 20, 20],
  size: [40, 40],
  fillColor: "green",
});

// Add a key handler to move the player left and right
paper.view.onKeyDown = function(event) {
  if (event.key === "left") {
    if (player.bounds.left > 0) {
      player.position.x -= 12;
    }
  } else if (event.key === "right") {
    if (player.bounds.right < paper.view.size.width) {
      player.position.x += 12;
    }
  }
};

// Function to detect collisions between the player and the enemies
function detectCollisions() {
  if (player.intersects(blueEnemy) || player.intersects(greenEnemy)) {
    lives--;
    if (lives === 0) {
      gameover = true;
      const reloadButton = document.createElement("button");
      reloadButton.id = "reload-button";
      reloadButton.innerText = "Play Again";
      reloadButton.addEventListener("click", function() {
        location.reload();
      });
      document.body.appendChild(reloadButton);
    } else {
      blueEnemy.position.y = 1;
      greenEnemy.position.y = 1;
    }
  }
}

// Function to update the game variables and redraw the screen
function update() {
  if (!gameover) {
    blueEnemy.position.y += 4;
    if (blueEnemy.position.y > paper.view.size.height) {
      score++;
      blueEnemy.position.x =
        Math.random() * (paper.view.size.width - blueEnemy.bounds.width);
      blueEnemy.position.y = 1;
    }

    greenEnemy.position.y += 3;
    if (greenEnemy.position.y > paper.view.size.height) {
      score++;
      greenEnemy.position.x =
        Math.random() * (paper.view.size.width - greenEnemy.bounds.width);
      greenEnemy.position.y = 1;
    }
    detectCollisions();
  }

  // Clear the canvas
  paper.project.activeLayer.removeChildren();

  // Draw the player
  paper.project.activeLayer.addChild(player);

  // Draw the enemies
  paper.project.activeLayer.addChild(blueEnemy);
  paper.project.activeLayer.addChild(greenEnemy);

  // Show the score and lives
  const scoreText = new paper.PointText({
    point: [10, 30],
    content: "Score: " + score,
    fillColor: "#450a0a",
    fontSize: 16,
  });

  const livesText = new paper.PointText({
    point: [10, 60],
    content: "Lives: " + lives,
    fillColor: "#450a0a",
    fontSize: 16,
  });

  // Add the text to the canvas
  paper.project.activeLayer.addChild(scoreText);
  paper.project.activeLayer.addChild(livesText);
}

// Use Paper.js to animate the game
paper.view.onFrame = function(event) {
  update();
};

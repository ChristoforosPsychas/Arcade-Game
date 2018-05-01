// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    // There are also the coordinates and the speed of each enemy. I use a function getRandomInt
    // from MDN which generates some int numbers between a min and a max.
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = getRandomInt(150,400);
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt; // The position of each enemy is calculated from its given speed multiplied by the dt parameter
    if (this.x > 505) {        // I check here when the bug leaves the canvas. If a bug leaves the canvas, i relocate it outside of the canvas
      this.x = -100;           // for it to enter again smoothly.
    }

    //Collision detection. If the absolute distance between the player and the bug on the x and on the y axis is less than a number,
    //which i found by experimenting, return the player to his initial position.
    if (Math.abs(this.x - player.x) < 82 && Math.abs(this.y - player.y) < 70) { 
      player.x = 200;
      player.y = 400;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Same as the Enemy function, but here i dont have a speed property, i have a score property for the player.
var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.score = 0;
}

// If the player reaches the water, return him to his initial position and increment the score by 1.
Player.prototype.update = function() {
  if (this.y < 50) {
    this.x = 200;
    this.y = 400;
    this.score += 1;
// If the score reaches the value 5, i stop the bugs from moving and show the modal.
    if (this.score === 5) {
      allEnemies.forEach(function(enemy) {
        enemy.speed = 0;
      });
      modalAppears();
    }
  }

}
// Same as the enemy render function
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// My handleInput function which takes a key parameter and i check the values each time.
// For instance, when i press the up arrow key, i decrease the current y value by the number 83 in order for the player to move
// one block up.
Player.prototype.handleInput = function(key) {
  switch (key) {
    case 'left':
            this.x -= 101;
            break;
    case 'up':
            this.y -= 83;
            break;
    case 'right':
            this.x += 101;
            break;
    case 'down':
            this.y += 83;
            break;
    default:
            break;

  }
// Here i stop the player from moving outside of the canvas.
  if (this.y > 400) {
    this.y -= 83;
  } else if (this.x < -101) {
    this.x += 101;
  } else if (this.x > 500) {
    this.x -= 101;
  }

}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy(350,140);
var enemy2 = new Enemy(150,60);
var enemy3 = new Enemy(250,225);
var enemy4 = new Enemy(150,60);
var enemy5 = new Enemy(150,140);

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];


// Place the player object in a variable called player
var player = new Player(200,400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var modal = document.querySelector('.modal');
var resetButton = document.querySelector('.modal-reset-button');

// This listens for click presses when the modal have already appeared and it calls the modalDisappears function to close it.
resetButton.addEventListener('click', modalDisappears);

// Function to show the modal
function modalAppears() {
  modal.style.display = 'block';
}

// Function to close the modal and reset page
function modalDisappears () {
  modal.style.display = 'none';
  location.reload();
}

// Function that returns a random integer between a min and a max (from MDN)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

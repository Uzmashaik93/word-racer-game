const lanes = [178, 291, 404, 519];
let raceOn = true;

//player class

class Player {
  constructor() {
    this.width = 40;
    this.height = 60;
    this.positionX = lanes[Math.floor(Math.random() * lanes.length)];
    this.positionY = 10;
    this.bonusSound = new Audio("./assets/sounds/bonus-sound.mp3"); // Preload sound once
    this.gameOverSound = new Audio("./assets/sounds/car-crash.mp3");
    this.raceSound = new Audio("./assets/sounds/car-sound-effect-126709.mp3");
    this.winnerSound = new Audio("./assets/sounds/winner-sound.wav");
    this.powerUpSound = new Audio("./assets/sounds/power-up.mp3");

    this.playerElement = document.getElementById("player");

    this.updateUi();
  }

  updateUi() {
    this.playerElement.style.width = this.width + "px";
    this.playerElement.style.height = this.height + "px";
    this.playerElement.style.left = this.positionX + "px";
    this.playerElement.style.bottom = this.positionY + "px";
  }

  moveRight() {
    if (this.positionX <= lanes[lanes.length - 1]) {
      this.positionX = this.positionX + 20;
      this.playerElement.style.left = this.positionX + "px";
    }
  }
  moveLeft() {
    if (this.positionX >= lanes[0]) {
      this.positionX = this.positionX - 20;
      this.playerElement.style.left = this.positionX + "px";
    }
  }

  gameOver() {
    this.gameContainer = document.getElementById("game-container");
    this.gameOverScreen = document.getElementById("gameover-screen");
    this.gameOverScreen.style.display = "flex";
    this.bonusSound.pause();
  }

  gameWinner() {
    this.successContainer = document.getElementById("success-container");
    this.successScreen = document.getElementById("success-screen");
    this.successScreen.style.display = "flex";
  }

  playRaceSound() {
    this.raceSound.loop = true;
    if (this.raceSound.paused) {
      this.raceSound.play();
    } else {
      this.raceSound.pause();
    }
  }

  pauseRaceSound() {
    this.raceSound.pause();
  }

  playBonusSound() {
    this.bonusSound.play(); // Play sound when needed
  }

  playPowerUpSound() {
    this.powerUpSound.play();
  }

  playGameOverSound() {
    this.gameOverSound.play();
  }

  playWinnerSound() {
    this.winnerSound.play();
  }
}

//class for car obstacle creation

class ObstacleCar {
  constructor() {
    this.width = 30;
    this.height = 60;
    this.positionX = lanes[Math.floor(Math.random() * lanes.length)];
    this.positionY = 950;
    this.obstacleElementCreation();
  }

  obstacleElementCreation() {
    this.obstacleElement = document.createElement("img");
    this.obstacleElement.setAttribute(
      "src",
      "./assets/images/obstacle-cars.png"
    );
    this.obstacleElement.className = "obstacle";
    this.obstacleElement.style.width = this.width + "px";
    this.obstacleElement.style.height = this.height + "px";
    this.obstacleElement.style.left = this.positionX + "px";
    this.obstacleElement.style.bottom = this.positionY + "px";
    const parentEle = document.getElementById("race-track");
    parentEle.appendChild(this.obstacleElement);
  }

  moveDown() {
    this.positionY--;
    this.obstacleElement.style.bottom = this.positionY + "px";
  }

  removeObstacle() {
    this.obstacleElement.remove();
    obstacleCarsArray = obstacleCarsArray.filter((car) => car !== this); // Remove from array
  }
}

//character class

class Character {
  constructor(character) {
    this.width = 36;
    this.height = 47;
    this.positionX = lanes[Math.floor(Math.random() * lanes.length)];
    this.positionY = 950;
    this.currentCharacter = character;
    this.isActive = true; //using this we tell forEach to stop moveDown() the current instance character
    this.characterElementCreation();
  }

  characterElementCreation() {
    this.characterElement = document.createElement("div");
    this.characterElement.className = "alphabets glow";
    this.characterElement.innerHTML = `<p>${this.currentCharacter}</p>`;
    this.characterElement.style.width = this.width + "px";
    this.characterElement.style.height = this.height + "px";
    this.characterElement.style.left = this.positionX + "px";
    this.characterElement.style.bottom = this.positionY + "px";
    const parentEle = document.getElementById("race-track");
    parentEle.appendChild(this.characterElement);
  }
  moveDown() {
    this.positionY--;
    this.characterElement.style.bottom = this.positionY + "px";

    if (this.positionY < 0) {
      this.removeCharacter();
    }
  }
  removeCharacter() {
    this.characterElement.remove();
    charactersArray = charactersArray.filter((char) => char !== this); // Remove from array
  }

  hideLetterElement() {
    this.characterElement.style.display = "none";
  }
}

class PowerUp {
  constructor() {
    this.width = 30;
    this.height = 60;
    this.positionX = lanes[Math.floor(Math.random() * lanes.length)];
    this.positionY = 950;
    this.powerUpElementCreation();
  }

  powerUpElementCreation() {
    this.powerUpElement = document.createElement("img");
    this.powerUpElement.setAttribute("src", "./assets/images/power-up.png");
    this.powerUpElement.className = "powerUp";
    this.powerUpElement.style.width = this.width + "px";
    this.powerUpElement.style.height = this.height + "px";
    this.powerUpElement.style.left = this.positionX + "px";
    this.powerUpElement.style.bottom = this.positionY + "px";
    const parentEle = document.getElementById("race-track");
    parentEle.appendChild(this.powerUpElement);
  }

  moveDown() {
    this.positionY--;
    this.powerUpElement.style.bottom = this.positionY + "px";
  }

  removePowerUpElement() {
    this.powerUpElement.remove();
    powerUpElement = powerUpElement.filter((car) => car !== this); // Remove from array
  }
}
//player instance creation

const player = new Player();

//declaring an empty array for cars
let obstacleCarsArray = [];

//declaring an empty array for power ups
let powerUpArray = [];

//declaring an empty array for letter
let charactersArray = [];
let currentWordIndex = 0;
let isActive = false;

//initializing word array
const wordsArray = [
  "APPLE",
  "WATER",
  "CHAIR",
  "LIGHT",
  "CLOUD",
  "DANCE",
  "MOUSE",
  "FRAME",
  "ARROW",
  "HOUSE",
];
const currentWord = wordsArray[Math.floor(Math.random() * wordsArray.length)]; //random word picking from the word array

//generate items
const itemCreationInterval = setInterval(() => {
  const random = Math.round(Math.random() * 10) / 10;

  if (random < 0.5) {
    const newObstacle = new ObstacleCar();
    obstacleCarsArray.push(newObstacle);
  } else if (random > 0.7) {
    if (!isActive) {
      const letterInstance = new Character(currentWord[currentWordIndex]); //generate characters
      charactersArray.push(letterInstance);
      isActive = true;
    }
  } else if (random === 0.6) {
    const powerUp = new PowerUp();
    powerUpArray.push(powerUp);
  }

  // Remove items off-screen
  charactersArray.forEach((characterInstance) => {
    if (characterInstance.positionY < 0) {
      characterInstance.removeCharacter();
    }
  });

  obstacleCarsArray.forEach((carInstance) => {
    if (carInstance.positionY < 0) {
      carInstance.removeObstacle();
    }
  });
}, 2000);

powerUpArray.forEach((powerInstance) => {
  if (powerInstance.positionY < 0) {
    powerInstance.removeCharacter();
  }
});

//collision detection function

function checkCollision(obj1, obj2) {
  return (
    obj1.positionX < obj2.positionX + obj2.width &&
    obj1.positionX + obj1.width > obj2.positionX &&
    obj1.positionY < obj2.positionY + obj2.height &&
    obj1.positionY + obj1.height > obj2.positionY
  );
}

const itemMovingInterval = setInterval(() => {
  if (!raceOn) return;

  // Move obstacle cars
  obstacleCarsArray.forEach((carInstance) => {
    carInstance.moveDown();
    if (checkCollision(player, carInstance)) {
      raceOn = false;
      player.playGameOverSound();
      player.pauseRaceSound();
      player.gameOver();
      document.getElementById("board").style.animation = "none";
      carInstance.obstacleElement.remove();
      clearInterval(itemCreationInterval);
    }
  });

  //Move power ups
  powerUpArray.forEach((powerUpInstance) => {
    powerUpInstance.moveDown();
    if (checkCollision(player, powerUpInstance)) {
      player.playPowerUpSound();
      powerUpSpeed();
      powerUpInstance.powerUpElement.remove();
    }
  });

  // Move letters
  charactersArray.forEach((characterInstance) => {
    if (!characterInstance.isActive) {
      characterInstance.hideLetterElement();
      return;
    }

    characterInstance.moveDown();

    if (checkCollision(player, characterInstance)) {
      if (isActive) {
        currentWordIndex++;
        player.playBonusSound();

        if (currentWordIndex === currentWord.length) {
          raceOn = false;
          player.playWinnerSound();
          player.pauseRaceSound();
          player.gameWinner();
          document.getElementById("board").style.animation = "none";
          characterInstance.characterElement.remove();
          clearInterval(itemCreationInterval);
        }

        isActive = false;
      }

      characterInstance.hideLetterElement();

      wordDisplayEle.innerHTML = `
        <h2>Pick all the letters</h2>
        <h2>of the word:</h2>
        <p>
          <span class="highlighted glow">${currentWord.substring(
            0,
            currentWordIndex
          )}</span>
          ${currentWord.substring(currentWordIndex)}
        </p>
      `;
    } else if (characterInstance.positionY < 0) {
      // Reset flag if the player misses the letter
      isActive = characterInstance.isActive = false;
    }
  });
}, 10); // Adjusted interval for better performance (~60fps)

//updating UI to display the current word
const textToDisplay = `
  <h2>Pick all the letters</h2>
  <h2>of the word:</h2>
  <p>${currentWord}</p>
`;

const wordDisplayEle = document.getElementById("word-display-container");
wordDisplayEle.innerHTML = textToDisplay;

//key press event for player

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowLeft") {
    player.moveLeft();
  }
  if (e.code === "ArrowRight") {
    player.moveRight();
  }
});

const restartBtnElement = document.getElementById("restart-button");
const playAgainButtonElement = document.getElementById("play-again");
const restartButtons = [restartBtnElement, playAgainButtonElement];
restartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    location.reload();
  });
});

const homeButtonElements = [
  document.getElementById("home-from-success"),
  document.getElementById("home-from-failure"),
];
homeButtonElements.forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = "./index.html";
  });
});
const musicElement = document.getElementById("play-music");
musicElement.addEventListener("click", () => {
  player.playRaceSound();
});

function powerUpSpeed() {
  document.getElementById("board").style.animation =
    "loopingRoad 100s linear infinite";

  setTimeout(() => {
    document.getElementById("board").style.animation =
      "loopingRoad 200s linear infinite";
  }, 5000);
}

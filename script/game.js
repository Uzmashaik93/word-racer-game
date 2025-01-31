import Player from "./player.js";
import ObstacleCar from "./obstacleCar.js";
import Character from "./character.js";
import PowerUp from "./powerUp.js";

let raceOn = true;

//player instance creation

const player = new Player();

// Declaring arrays for cars, power-ups, and characters
let obstacleCarsArray = [];
let powerUpArray = [];
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
  "GUITARS",
  "ADVENTURE",
  "PLANETS",
  "JOURNEY",
  "FOREST",
  "EARTH",
  "SPACE",
  "ROCKET",
  "HOTWHEELS",
  "FERRARI",
  "MCLAREN",
  // "A",
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

// Restart and play again functionality

const restartBtnElement = document.getElementById("restart-button");
const playAgainButtonElement = document.getElementById("play-again");
const restartButtons = [restartBtnElement, playAgainButtonElement];
restartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    location.reload();
  });
});

// Home button functionality

const homeButtonElements = [
  document.getElementById("home-from-success"),
  document.getElementById("home-from-failure"),
];
homeButtonElements.forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = "./index.html";
  });
});

// Music button functionality

document.addEventListener("keypress", (e) => {
  if (e.code === "KeyM") {
    player.playRaceSound();
  }
});

// Function to speed up the road animation during power-up

function powerUpSpeed() {
  document.getElementById("board").style.animation =
    "loopingRoad 100s linear infinite";

  setTimeout(() => {
    document.getElementById("board").style.animation =
      "loopingRoad 180s linear infinite";
  }, 10000);
}

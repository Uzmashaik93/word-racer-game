const lanes = [178, 291, 404, 519];
let raceOn = true;

//player class

class Player {
  constructor() {
    this.width = 40;
    this.height = 60;
    this.positionX = lanes[Math.floor(Math.random() * lanes.length)];
    this.positionY = 10;

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
      this.positionX = this.positionX + 5;
      this.playerElement.style.left = this.positionX + "px";
    }
  }
  moveLeft() {
    if (this.positionX >= lanes[0]) {
      this.positionX = this.positionX - 5;
      this.playerElement.style.left = this.positionX + "px";
    }
  }

  gameOver() {
    this.gameContainer = document.getElementById("game-container");
    this.gameOverScreen = document.getElementById("gameover-screen");
    this.gameOverScreen.style.display = "flex";
  }

  gameWinner() {
    this.successContainer = document.getElementById("success-container");
    this.successScreen = document.getElementById("success-screen");
    this.successScreen.style.display = "flex";
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
  }

  hideLetterElement() {
    this.characterElement.style.display = "none";
  }
}

//player instance creation

const player = new Player();

//declaring an empty array for cars
let obstacleCarsArray = [];

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
  const random = Math.round(Math.random() * 10) / 10; //randome number creation

  //condition to generate cars
  if (random <= 0.8) {
    const newObstacle = new ObstacleCar();
    obstacleCarsArray.push(newObstacle);
  } else {
    if (!isActive) {
      const letterInstance = new Character(currentWord[currentWordIndex]); //generate characters
      charactersArray.push(letterInstance);
      isActive = true;
    }
  }
}, 2000);

//move down items
const itemMovingInterval = setInterval(() => {
  //looping through cars array and calling move down methond
  obstacleCarsArray.forEach((carInstance) => {
    if (!raceOn) {
      return;
    }
    carInstance.moveDown();
    if (
      player.positionX < carInstance.positionX + carInstance.width &&
      player.positionX + player.width > carInstance.positionX &&
      player.positionY < carInstance.positionY + carInstance.height &&
      player.positionY + player.height > carInstance.positionY
    ) {
      raceOn = false;
      player.gameOver();
      const boardElement = document.getElementById("board");
      boardElement.style.animation = "none";
      carInstance.obstacleElement.remove();
      clearInterval(itemCreationInterval);
    }
  });

  //looping through characters array and calling move down methond

  charactersArray.forEach((characterInstance) => {
    //to hide the character which got missed by the player

    if (!characterInstance.isActive) {
      characterInstance.hideLetterElement();
      return;
    }
    characterInstance.moveDown();
    if (
      player.positionX <
        characterInstance.positionX + characterInstance.width &&
      player.positionX + player.width > characterInstance.positionX &&
      player.positionY <
        characterInstance.positionY + characterInstance.height &&
      player.positionY + player.height > characterInstance.positionY
    ) {
      if (isActive) {
        currentWordIndex++;
        if (currentWordIndex === currentWord.length) {
          raceOn = false;

          //TODO: success screen goes here
          player.gameWinner();
          const boardElement = document.getElementById("board");
          boardElement.style.animation = "none";
          characterInstance.characterElement.remove();
          clearInterval(itemCreationInterval);
        }
        isActive = false;
      }

      characterInstance.hideLetterElement(); //hides the character

      const formattedWord = `
          <span class="highlighted glow">${currentWord.substring(
            0,
            currentWordIndex
          )}
          </span>
          ${currentWord.substring(currentWordIndex)}
        `;

      wordDisplayEle.innerHTML = `
        <h2>Pick all the letters of the word : </h2>
        <p>${formattedWord}</p>
      `;
    } else {
      // this code will reset the flag to start creating the next character when player misses it
      if (characterInstance.positionY < 0) {
        isActive = false;
        characterInstance.isActive = false;
      }
    }
  });
}, 1);

//updating UI to display the current word
const textToDisplay = `<h2>Pick all the letters of the word : </h2>
<p>${currentWord}</p>`;
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
restartBtnElement.addEventListener("click", () => {
  location.reload();
});

const quitButtonElement = document.getElementById("quit");
quitButtonElement.addEventListener("click", () => {
  window.close();
});

const playAgainButtonElement = document.getElementById("play-again");
playAgainButtonElement.addEventListener("click", () => {
  location.reload();
});

const homeButtonElement = document.getElementById("home");
homeButtonElement.addEventListener("click", () => {
  window.location.href = "./index.html";
});

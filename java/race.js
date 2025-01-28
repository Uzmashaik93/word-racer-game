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
}

//class for car obstacle creation

class ObstacleCar {
  constructor() {
    this.width = 30;
    this.height = 60;
    this.positionX = lanes[Math.floor(Math.random() * lanes.length)];
    this.positionY = 800;
    this.obstacleElementCreation();
  }

  obstacleElementCreation() {
    this.obstacleElement = document.createElement("img");
    this.obstacleElement.setAttribute(
      "src",
      "../assets/images/obstacle-cars.png"
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

  gameOver() {
    this.gameContainer = document.getElementById("game-container");
    this.gameOverScreen = document.getElementById("gameover-screen");
    this.gameOverScreen.style.display = "flex";
    this.obstacleElement.remove();
  }
}

//character class

class Character {
  constructor(character) {
    this.width = 36;
    this.height = 47;
    this.positionX = lanes[Math.floor(Math.random() * lanes.length)];
    this.positionY = 800;
    this.currentCharacter = character;
    this.characterElementCreation();
  }

  characterElementCreation() {
    this.characterElement = document.createElement("div");
    this.characterElement.className = "alphabets";
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
let isActive = true;

//initializing word array
const wordsArray = ["APPLE", "CAT", "DOG"];
const currentWord = wordsArray[Math.floor(Math.random() * wordsArray.length)]; //random word picking from the word array

//generate items
const itemCreationInterval = setInterval(() => {
  const random = Math.round(Math.random() * 10) / 10; //randome number creation

  //condition to generate cars
  if (random <= 0.5) {
    const newObstacle = new ObstacleCar();
    obstacleCarsArray.push(newObstacle);
  } else {
    if (isActive) {
      const letterInstance = new Character(currentWord[currentWordIndex]); //generate characters
      charactersArray.push(letterInstance);
      isActive = false;
    }
  }
}, 2000);

//move down items
const itemMovingInterval = setInterval(() => {
  //looping through cars array and calling move down methond
  obstacleCarsArray.forEach((carInstance) => {
    carInstance.moveDown();
    if (
      player.positionX < carInstance.positionX + carInstance.width &&
      player.positionX + player.width > carInstance.positionX &&
      player.positionY < carInstance.positionY + carInstance.height &&
      player.positionY + player.height > carInstance.positionY
    ) {
      raceOn = false;
      carInstance.gameOver();
      const boardElement = document.getElementById("board");
      boardElement.style.animation = "none";
      clearInterval(itemCreationInterval);
    }
  });

  //looping through characters array and calling move down methond
  charactersArray.forEach((characterInstance) => {
    characterInstance.moveDown();
    if (
      player.positionX <
        characterInstance.positionX + characterInstance.width &&
      player.positionX + player.width > characterInstance.positionX &&
      player.positionY <
        characterInstance.positionY + characterInstance.height &&
      player.positionY + player.height > characterInstance.positionY
    ) {
      if (!isActive) {
        currentWordIndex++;
        if (currentWordIndex === currentWord.length) {
          alert("success");
        }
        isActive = true;
      }
      characterInstance.hideLetterElement(); //hides the characters
      currentWord[currentWordIndex];

      const formattedWord = `
          <span class="highlighted">${currentWord.substring(
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

const quitBtnElement = document.getElementById("quit");
quitBtnElement.addEventListener("click", () => {
  window.close();
});

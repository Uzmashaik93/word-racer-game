const lanes = [178, 291, 404, 519];

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

class ObstacleCars {
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
}

class Alphabets {
  constructor(alphabet) {
    this.width = 36;
    this.height = 47;
    this.positionX = lanes[Math.floor(Math.random() * lanes.length)];
    this.positionY = 800;
    this.currentAlphabet = alphabet;
    this.alphabetsElementCreation();
  }

  alphabetsElementCreation() {
    this.alphabetObstacle = document.createElement("div");
    this.alphabetObstacle.className = "alphabets";
    this.alphabetObstacle.innerHTML = `<p>${this.currentAlphabet}</p>`;
    this.alphabetObstacle.style.width = this.width + "px";
    this.alphabetObstacle.style.height = this.height + "px";
    this.alphabetObstacle.style.left = this.positionX + "px";
    this.alphabetObstacle.style.left = this.positionY + "px";
    const parentEle = document.getElementById("race-track");
    parentEle.appendChild(this.alphabetObstacle);
  }
  moveDown() {
    this.positionY--;
    this.alphabetObstacle.style.bottom = this.positionY + "px";
  }
}

const player = new Player();
const obstacleArray = [];
// const alphabetInstance = new Alphabets();

const wordsArray = ["APPLE", "CAT", "DOG"];
const currentWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
const alphabetArray = [];

setInterval(() => {
  const alphabetInstance = new Alphabets(currentWord[0]);
  alphabetArray.push(alphabetInstance);
}, 4000);

setInterval(() => {
  alphabetArray.forEach((alphabetInstance) => {
    alphabetInstance.moveDown();
    console.log(alphabetInstance);
  });
}, 20);

setInterval(() => {
  const newObstacle = new ObstacleCars();
  obstacleArray.push(newObstacle);
}, 4000);

setInterval(() => {
  obstacleArray.forEach((obstacleInstance) => {
    obstacleInstance.moveDown();
    if (
      player.positionX < obstacleInstance.positionX + obstacleInstance.width &&
      player.positionX + player.width > obstacleInstance.positionX &&
      player.positionY < obstacleInstance.positionY + obstacleInstance.height &&
      player.positionY + player.height > obstacleInstance.positionY
    ) {
      // Collision detected!
      console.log("game over...");
      //   location.href = "gameover.html";
    }
  });
}, 20);

document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowLeft") {
    player.moveLeft();
  }
  if (e.code === "ArrowRight") {
    player.moveRight();
  }
});

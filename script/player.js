const lanes = [178, 291, 404, 519];
export default class Player {
  constructor() {
    this.width = 40;
    this.height = 60;
    this.positionX = lanes[Math.floor(Math.random() * lanes.length)];
    this.positionY = 10;
    this.bonusSound = new Audio("./assets/sounds/bonus-sound.mp3");
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
    this.bonusSound.play();
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

const lanes = [178, 291, 404, 519];
let powerUpArray = [];
export default class PowerUp {
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
    powerUpElement = powerUpElement.filter((car) => car !== this);
  }
}

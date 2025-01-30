const lanes = [178, 291, 404, 519];
let obstacleCarsArray = [];
export default class ObstacleCar {
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
    obstacleCarsArray = obstacleCarsArray.filter((car) => car !== this);
  }
}

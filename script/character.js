const lanes = [178, 291, 404, 519];
let charactersArray = [];

export default class Character {
  constructor(character) {
    this.width = 36;
    this.height = 47;
    this.positionX = lanes[Math.floor(Math.random() * lanes.length)];
    this.positionY = 950;
    this.currentCharacter = character;
    this.isActive = true;
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
    charactersArray = charactersArray.filter((char) => char !== this);
  }

  hideLetterElement() {
    this.characterElement.style.display = "none";
  }
}

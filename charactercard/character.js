"use strict";

const character = {
  name: "Snortleblat",
  class: "Swamp Beast Diplomat",
  level: 5,
  health: 100,
  image: "https://andejuli.github.io/wdd131/character_card/snortleblat.webp",
  description: "A peaceful swamp dweller with a gift for settling disputes.",
  attacked() {
    this.health = Math.max(0, this.health - 20);
    if (this.health === 0) {
      document.getElementById("status").textContent = `${this.name} has died.`;
    }
  },
  levelUp() {
    this.level += 1;
  }
};

document.getElementById("heading").textContent = "Character Card";
document.getElementById("subtitle").textContent = character.class;
document.getElementById("description").textContent = character.description;
const portrait = document.getElementById("character-image");
portrait.src = character.image;
portrait.alt = `${character.name}, the ${character.class}`;

function renderCharacter() {
  for (const property of ["name", "class", "level", "health"]) {
    document.getElementById(property).textContent = character[property];
  }
}

document.getElementById("attacked").addEventListener("click", () => {
  character.attacked();
  renderCharacter();
});

document.getElementById("level-up").addEventListener("click", () => {
  character.levelUp();
  renderCharacter();
});

renderCharacter();

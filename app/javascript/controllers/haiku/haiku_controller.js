import { Controller } from "@hotwired/stimulus";

export default class HaikuController extends Controller {
  static targets = ["input", "pills", "button"];

  connect() {
    this.words = [];
  }

  addWord(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const word = this.inputTarget.value.trim();

      if (word && this.words.length < 3 && !this.words.includes(word)) {
        this.words.push(word);
        this.inputTarget.value = "";
        this.renderPills();

        if (this.words.length === 3) {
          this.inputTarget.classList.add("hidden");
          this.buttonTarget.classList.remove("hidden");
        }
      }
    }
  }

  removeWord(event) {
    const wordToRemove = event.target.dataset.word;
    this.words = this.words.filter(w => w !== wordToRemove);
    this.renderPills();

    if (this.words.length < 3) {
      this.inputTarget.classList.remove("hidden");
      this.buttonTarget.classList.add("hidden");
    }
  }

  renderPills() {
    this.pillsTarget.innerHTML = "";

    this.words.forEach(word => {
      const pill = document.createElement("span");
      pill.className = "pill";

      pill.textContent = word;

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "×";
      removeBtn.className = "remove-pill";
      removeBtn.dataset.action = "click->haiku--haiku#removeWord";
      removeBtn.dataset.word = word;

      pill.appendChild(removeBtn);

      this.pillsTarget.appendChild(pill);
    });
  }

  generateHaiku() {
    // Haiku generation logic here
    console.log("Generating haiku with words:", this.words);
  }
}

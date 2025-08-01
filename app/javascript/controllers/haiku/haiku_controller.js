import { Controller } from "@hotwired/stimulus";

export default class HaikuController extends Controller {
  static targets = ["button", "error", "input", "pills"];

  connect() {
    this.words = [];
  }

  addWord(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const word = this.inputTarget.value.trim();

      if (word && word.length > 2 && this.words.length < 3 && !this.words.includes(word)) {
        this.words.push(word);
        this.inputTarget.value = "";
        this.renderPills();

        if (this.words.length === 3) {
          this.inputTarget.classList.add("opacity-0", "pointer-events-none", "transition-opacity", "duration-300", "ease-in-out");
          this.inputTarget.classList.remove("opacity-100");
          this.buttonTarget.classList.remove("hidden");
        }
      } else if (this.words.includes(word)) {
        this.showError("You already picked that one.");
      } else if (word.length <= 2) {
        this.showError("Words must be at least three letters.");
      }
    }
  }

  clearError() {
    clearTimeout(this.errorTimeout);
    this.errorTarget.classList.add("opacity-0");
    this.errorTarget.classList.remove("opacity-100");
    this.errorTarget.textContent = "";
  }

  generateHaiku() {
    // Haiku generation logic here
    console.log("Generating haiku with words:", this.words);
  }

  removeWord(event) {
    const wordToRemove = event.target.dataset.word;
    this.words = this.words.filter(w => w !== wordToRemove);
    this.renderPills();

    if (this.words.length < 3) {
      this.inputTarget.classList.remove("opacity-0", "pointer-events-none");
      this.inputTarget.classList.add("opacity-100", "transition-opacity", "duration-300", "ease-in-out");
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

  showError(message) {
    this.errorTarget.textContent = message;

    this.errorTarget.classList.remove("opacity-0", "duration-[3000ms]");
    this.errorTarget.classList.add("opacity-100", "transition-opacity", "duration-500", "ease-in-out");

    clearTimeout(this.errorTimeout);

    this.errorTimeout = setTimeout(() => {
      this.errorTarget.classList.remove("duration-500");
      this.errorTarget.classList.add("duration-[3000ms]");

      this.errorTarget.classList.remove("opacity-100");
      this.errorTarget.classList.add("opacity-0");

      setTimeout(() => {
        this.errorTarget.textContent = "";

        this.errorTarget.classList.remove("duration-[3000ms]");
        this.errorTarget.classList.add("duration-500");
      }, 3000); // duration matches fade out
    }, 1000); // visible duration
  }
}

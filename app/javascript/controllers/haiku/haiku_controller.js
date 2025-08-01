import { Controller } from "@hotwired/stimulus";

export default class HaikuController extends Controller {
  static targets = ["againButton", "button", "error", "haiku", "input", "pills"];

  connect() {
    this.words = [];
  }

  async typeHaiku(text) {
    this.haikuTarget.textContent = ""; // clear previous

    for (let i = 0; i < text.length; i++) {
      this.haikuTarget.textContent += text[i];
      await this.sleep(40); // 40ms per character
    }

    // Wait a sec...
    await new Promise(r => setTimeout(r, 1000));

    // Show again button after printing the haiku
    this.againButtonTarget.classList.remove("opacity-0", "pointer-events-none", "transition-ease");
    this.againButtonTarget.classList.add("opacity-100");

    await this.sleep(3000); // Wait for the fade in before replacing the hover transition

    this.againButtonTarget.classList.add("transition-ease");
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

  async generateHaiku() {
    const title = this.words.join(" ");

    // Hide the submit button and pills
    this.buttonTarget.classList.add("hidden");
    this.pillsTarget.innerHTML = "";

    try {
      const response = await fetch("/haikus/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "X-CSRF-Token": document.querySelector("[name='csrf-token']").content
        },
        body: JSON.stringify({ words: this.words })
      });

      if (!response.ok) throw new Error("Failed to generate haiku.");

      const data = await response.json();
      const fullHaiku = `${title}\n\n${data.haiku}`;
      this.typeHaiku(fullHaiku);
    } catch (err) {
      this.showError("Something went wrong. Try again.");
      console.error(err);
    }
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

  async reset() {
    // Clear everything
    this.haikuTarget.textContent = "";
    this.pillsTarget.innerHTML = "";
    this.words = [];

    // Show the input field again
    this.inputTarget.classList.remove("opacity-0", "pointer-events-none");
    this.inputTarget.classList.add("opacity-100", "transition-opacity", "duration-300", "ease-in-out");

    // Reset the again? button
    this.againButtonTarget.classList.add("hidden")
    await this.sleep(3000) // Wait to alter transition effects
    this.againButtonTarget.classList.add("opacity-0", "pointer-events-none", "transition-opacity", "duration-500", "ease-in-out");
    this.againButtonTarget.classList.remove("opacity-100", "hidden", "transition-ease");
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

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

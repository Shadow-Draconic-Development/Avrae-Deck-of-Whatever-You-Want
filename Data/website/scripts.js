document.addEventListener("DOMContentLoaded", () => {
  const decksContainer = document.getElementById("decksContainer");
  const jsonOutput = document.getElementById("jsonOutput");
  const addDeckButton = document.getElementById("addDeck");
  const copyToClipboardButton = document.getElementById("copyToClipboard");
  const toggleThemeButton = document.getElementById("toggleTheme");

  // Function to apply dark mode
  const applyDarkMode = (isDark) => {
    document.body.classList.toggle("dark-mode", isDark);
    toggleThemeButton.textContent = isDark ? "Switch to Light Mode" : "Switch to Dark Mode";
  };

  // Check system preferences for dark mode
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
  applyDarkMode(prefersDarkMode.matches);

  // Listen for changes in system preferences
  prefersDarkMode.addEventListener("change", (event) => {
    applyDarkMode(event.matches);
  });

  // Toggle dark mode manually
  toggleThemeButton.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    toggleThemeButton.textContent = isDark ? "Switch to Light Mode" : "Switch to Dark Mode";
  });

  const generateJSON = () => {
    const magicItems = {};
    decksContainer.querySelectorAll(".deck").forEach((deckEl) => {
      const magicItemName = deckEl.querySelector(".magic-item-name").value;
      if (!magicItemName) return;

      const magicItem = {
        perm: [],
        temp: [],
        decks: {},
      };

      // Populate Permanent Cards
      deckEl.querySelectorAll(".perm-card").forEach((cardEl) => {
        const name = cardEl.querySelector(".card-name").value;
        if (name) magicItem.perm.push(name);
      });

      // Populate Temporary Cards
      deckEl.querySelectorAll(".temp-card").forEach((cardEl) => {
        const name = cardEl.querySelector(".card-name").value;
        if (name) magicItem.temp.push(name);
      });

      // Populate Decks with Numbered Keys
      let deckNumber = 1;
      deckEl.querySelectorAll(".deck-section").forEach((deckSection) => {
        const weight = deckSection.querySelector(".deck-weight").value;
        const cards = [];
        deckSection.querySelectorAll(".deck-card").forEach((cardInput) => {
          if (cardInput.value) cards.push(cardInput.value);
        });

        if (weight && cards.length > 0) {
          magicItem.decks[deckNumber.toString()] = {
            weight: parseInt(weight, 10),
            deck: cards,
          };
          deckNumber++;
        }
      });

      magicItems[magicItemName] = magicItem;
    });

    // Wrap JSON in single quotes
    jsonOutput.value = `'${JSON.stringify(magicItems)}'`;
  };

  const copyToClipboard = () => {
    jsonOutput.select();
    document.execCommand("copy");
    alert("JSON copied to clipboard!");
  };

  copyToClipboardButton.addEventListener("click", copyToClipboard);

  const createFieldSet = (title, className) => {
    const fieldset = document.createElement("fieldset");
    fieldset.className = className;
    const legend = document.createElement("legend");
    legend.textContent = title;
    fieldset.appendChild(legend);
    return fieldset;
  };

  const addCardToSection = (container, cardType) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = `${cardType}-card`;
    cardDiv.innerHTML = `
      <input type="text" class="card-name" placeholder="Card Name">
      <button type="button" class="remove-card">Remove</button>
    `;
    cardDiv.querySelector(".remove-card").addEventListener("click", () => {
      cardDiv.remove();
      generateJSON();
    });
    container.appendChild(cardDiv);
  };

  const addDeckCard = (cardContainer) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "deck-card-container";
    cardDiv.innerHTML = `
      <input type="text" class="deck-card" placeholder="Card Name">
      <button type="button" class="remove-deck-card">Remove Card</button>
    `;
    cardDiv.querySelector(".remove-deck-card").addEventListener("click", () => {
      cardDiv.remove();
      generateJSON();
    });
    cardContainer.appendChild(cardDiv);
  };

  const addDeckSection = (container) => {
    const deckSection = document.createElement("div");
    deckSection.className = "deck-section";
    deckSection.innerHTML = `
      <input type="number" class="deck-weight" placeholder="Weight">
      <button type="button" class="add-deck-card">Add Card</button>
      <button type="button" class="remove-deck">Remove Deck</button>
    `;

    const cardContainer = document.createElement("div");
    cardContainer.className = "card-container";
    deckSection.appendChild(cardContainer);

    deckSection.querySelector(".add-deck-card").addEventListener("click", () => {
      addDeckCard(cardContainer);
      generateJSON();
    });

    deckSection.querySelector(".remove-deck").addEventListener("click", () => {
      deckSection.remove();
      generateJSON();
    });

    container.appendChild(deckSection);
  };

  const addDeck = () => {
    const deckDiv = document.createElement("div");
    deckDiv.className = "deck";
    deckDiv.innerHTML = `
      <input type="text" class="magic-item-name" placeholder="Magic Item Name">
    `;

    // Permanent Cards Fieldset
    const permFieldset = createFieldSet("Permanent Cards", "perm-section");
    const addPermCardButton = document.createElement("button");
    addPermCardButton.type = "button";
    addPermCardButton.textContent = "Add Card";
    addPermCardButton.addEventListener("click", () =>
      addCardToSection(permFieldset, "perm")
    );
    permFieldset.appendChild(addPermCardButton);
    deckDiv.appendChild(permFieldset);

    // Temporary Cards Fieldset
    const tempFieldset = createFieldSet("Temporary Cards", "temp-section");
    const addTempCardButton = document.createElement("button");
    addTempCardButton.type = "button";
    addTempCardButton.textContent = "Add Card";
    addTempCardButton.addEventListener("click", () =>
      addCardToSection(tempFieldset, "temp")
    );
    tempFieldset.appendChild(addTempCardButton);
    deckDiv.appendChild(tempFieldset);

    // Decks Fieldset
    const decksFieldset = createFieldSet("Decks", "decks-section");
    const addDeckButton = document.createElement("button");
    addDeckButton.type = "button";
    addDeckButton.textContent = "Add Deck";
    addDeckButton.addEventListener("click", () =>
      addDeckSection(decksFieldset)
    );
    decksFieldset.appendChild(addDeckButton);
    deckDiv.appendChild(decksFieldset);

    const removeDeckButton = document.createElement("button");
    removeDeckButton.type = "button";
    removeDeckButton.textContent = "Remove Magic Item";
    removeDeckButton.addEventListener("click", () => {
      deckDiv.remove();
      generateJSON();
    });
    deckDiv.appendChild(removeDeckButton);

    decksContainer.appendChild(deckDiv);
    generateJSON();
  };

  addDeckButton.addEventListener("click", addDeck);

  // Generate JSON when inputs change
  decksContainer.addEventListener("input", generateJSON);
});

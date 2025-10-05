const symbols = ["⚽", "🧤", "🥅", "🎯"];
let cards = [...symbols, ...symbols]; 
let flippedCards = [];
let matchedPairs = 0;

// Shuffle cards
cards.sort(() => 0.5 - Math.random());

const board = document.getElementById("cardBoard");

// Create card elements
cards.forEach((symbol, index) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.symbol = symbol;
  card.dataset.index = index;
  card.textContent = ""; // hidden at start

  card.addEventListener("click", flipCard);

  board.appendChild(card);
});

// Flip card function
function flipCard() {
  if (this.classList.contains("flipped") || flippedCards.length === 2) return;

  this.classList.add("flipped");
  this.textContent = this.dataset.symbol;
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

// Check if two flipped cards match
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.symbol === card2.dataset.symbol) {
    matchedPairs++;
    flippedCards = [];
    if (matchedPairs === symbols.length) {
      document.getElementById("status").textContent = "🎉 You matched all pairs!";
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1.textContent = "";
      card2.textContent = "";
      flippedCards = [];
    }, 1000);
  }
}

"use strict;"

const cards = document.getElementsByClassName("memory-card");

let onlyFirstCardFlipped = false; // true if the 1st card is flipped and the 2nd is not
let boardReady = false; // Indicates that the board is ready for the next move
let firstCard, secondCard; // Will contain the content of the first and the second card flipped

// Make sure to start the game once the page is loaded
document.addEventListener("DOMContentLoaded", startGame);

function flipCard() {
 console.log("flippingCard", this);

  if (boardReady || this === firstCard) {
    console.log("flipCard: boardReady", boardReady);
    return;
  }
  this.classList.add("flipped");

  if (!onlyFirstCardFlipped) {
      // first click
      onlyFirstCardFlipped = true;
      firstCard = this;
      return;
  }
  
  // second click
  onlyFirstCardFlipped = false;
  secondCard = this;

  checkForMatch();
}  

function checkForMatch() {
    if (firstCard.children[0].innerHTML === secondCard.children[0].innerHTML) {
      freezeCards();
    } else {
      flipCardsBack();
    }
}

function freezeCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    boardReady = false;
    resetBoard();
}

function flipCardsBack() {
  boardReady = true;
    // wait a little (1.5s) before flipping cards back
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        boardReady = false;
      }, 1500);
}

function resetBoard() {
  onlyFirstCardFlipped = false;
  boardReady = false;
  firstCard = null; 
  secondCard = null;
}

function shuffle() {
  
  for (let cardIndex = 0; cardIndex < cards.length; cardIndex++) {
    let randomPosition = Math.floor(Math.random() * 12);
    cards[cardIndex].style.order = randomPosition;
  }
}

function startGame() {

  // Add event listeners for all cards.
  for (let cardIndex=0; cardIndex < cards.length; cardIndex++) {
    cards[cardIndex].addEventListener("click", flipCard);
  }

  resetBoard();
  shuffle();
}

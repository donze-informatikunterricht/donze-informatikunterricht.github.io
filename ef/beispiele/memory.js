const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

let points 

function flipCard() {
  if (lockBoard || this === firstCard) {
    return;
  }
  //this.classList.toggle("flip");
  this.classList.add("flip");


  if (!hasFlippedCard) {
      // first click
      hasFlippedCard = true;
      firstCard = this;
      return;
  }
  
  // second click
  hasFlippedCard = false;
  secondCard = this;

  checkForMatch();
}  

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    if (isMatch) {
      disableCards();
    } else {
      unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    lockBoard = false;
    resetBoard();
}

function unflipCards() {
  lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        lockBoard = false;
      }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach(card => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  });
}

cards.forEach(card => card.addEventListener("click", flipCard));

document.addEventListener("DOMContentLoaded", startGame);

function startGame() {
  resetBoard();
  shuffle();
}

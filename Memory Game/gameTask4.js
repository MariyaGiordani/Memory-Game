var cards = document.getElementsByClassName("card");
var firstCard = null, secondCard = null;

function randomizeArray(oldArr) {
    var output = [];
    var arr = [...oldArr];
    while (arr.length) {
        output.push(arr.splice(randomNumber(arr.length), 1)[0]);
    }
    return output;
};

var randomizedCards = randomizeArray(cards);

function randomNumber(max) {
    return Math.floor(Math.random() * max)
}

function flip() {
    console.log(this, this.dataset.card);
    if (firstCard == null) {
        firstCard = this;
    } else {
        if (this == firstCard) {
            return
        }
        secondCard = this;
    }
    this.classList.toggle('card--flip');

    disable();
}

function unflip() {
    firstCard.classList.toggle('card--flip');
    secondCard.classList.toggle('card--flip');
    clearSelectedCards();
}

function disable() {
    if (firstCard != null && secondCard != null) {
        if (firstCard.dataset.card === secondCard.dataset.card) {
            firstCard.removeEventListener("click", flip);
            secondCard.removeEventListener("click", flip);
            clearSelectedCards();
        } else {
            setTimeout(unflip, 1000);
        }
    }
}
function clearSelectedCards() {
    firstCard = null;
    secondCard = null;
}

var memoryGame = document.getElementById("memory-game");
memoryGame.innerHTML = "";

for (var i = 0; i < randomizedCards.length; i++) {
    memoryGame.appendChild(randomizedCards[i]);
    randomizedCards[i].addEventListener('click', flip);
}

// for (var i = 0; i < cards.length; i++) {
//     cards[i].addEventListener('click', flip);
//     cards[i].style.order = randomNumber(cards.length);
// }
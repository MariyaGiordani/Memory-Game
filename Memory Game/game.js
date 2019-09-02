var cards = document.getElementsByClassName("card");
var memoryGame = document.getElementById("memory-game");

var cardsMock = [
    {
        name: "Chess",
        dataPath: "img/chess.png"
    },
    {
        name: "Production",
        dataPath: "img/production.png"
    },
    {
        name: "Idea",
        dataPath: "img/idea.png"
    },
    {
        name: "Project",
        dataPath: "img/project.png"
    },
    {
        name: "Aproach",
        dataPath: "img/approach.png"
    },
    {
        name: "Fish",
        dataPath: "img/fish.png"
    },
    {
        name: "Arrow",
        dataPath: "img/arrow.png"
    },
    {
        name: "Content",
        dataPath: "img/content.png"
    },
    {
        name: "Cost",
        dataPath: "img/cost.png"
    },
    {
        name: "Debt",
        dataPath: "img/debt.png"
    },
    {
        name: "Feedback",
        dataPath: "img/feedback.png"
    },
    {
        name: "Plan",
        dataPath: "img/plan.png"
    },
    {
        name: "Product",
        dataPath: "img/product.png"
    },
    {
        name: "Report",
        dataPath: "img/report.png"
    },
    {
        name: "Teamwork",
        dataPath: "img/teamwork.png"
    }
]

const playerWhoWin = getByClass("js-winner-name");
const gameOver = getByClass("js-winner-game-over");

const easyGameButton = getByClass("js-level-easy");
easyGameButton.addEventListener('click', chooseLevel);

const regularGameButton = getByClass("js-level-regular");
regularGameButton.addEventListener('click', chooseLevel);

const hardGameButton = getByClass("js-level-hard");
hardGameButton.addEventListener('click', chooseLevel);

const newGameButton = getByClass("header-game__new");
newGameButton.addEventListener('click', gameInitializer);

var pairsCards;
var firstCard, secondCard;
var activePlayer;
var totalScore;
var hasCards;
var player1, player2;

function getByClass(className) {
    return document.getElementsByClassName(className)[0];
}

function randomizeArray(oldArr) {
    var output = [];
    var arr = [...oldArr];
    while (arr.length) {
        output.push(arr.splice(randomNumber(arr.length), 1)[0]);
    }
    return output;
};

function randomNumber(max) {
    return Math.floor(Math.random() * max)
}

function flip() {
    console.log(this, this.dataset.card);
    if (hasCards) return;

    if (firstCard == null) {
        firstCard = this;
    } else {
        if (this == firstCard) {
            return
        }
        secondCard = this;
        hasCards = true;
    }
    this.classList.toggle('card--flip');

    const currentPlayer = (activePlayer == 1) ? player1 : player2;
    checkForMatch(currentPlayer);
}

function displayActivePlayer() {
    setTimeout(function () {
        player1.infoCard.classList.toggle("header-player--active");
        player2.infoCard.classList.toggle("header-player--active");
    }, 1000)
}

function unflip() {
    firstCard.classList.toggle('card--flip');
    secondCard.classList.toggle('card--flip');
    clearSelectedCards();
}

function checkForMatch(player) {
    if (firstCard == null || secondCard == null) {
        return
    }

    player.rounds++;

    var isCorrect = firstCard.dataset.card === secondCard.dataset.card;

    if (isCorrect) {
        removeClick();
        player.score++;
        totalScore++;
        clearSelectedCards();
    } else {
        setTimeout(unflip, 1000);
        nextPlayer();
    }
    setScore(player);

    if (totalScore == pairsCards) {
        winner(player1, player2);
    }
}

function removeClick() {
    firstCard.removeEventListener("click", flip);
    secondCard.removeEventListener("click", flip);
}

function setScore(player) {
    player.infoCard.getElementsByClassName("header-player__score")[0].innerHTML = "Score: " + player.score;
    player.infoCard.getElementsByClassName("header-player__round")[0].innerHTML = "Round: " + player.rounds;
}

function clearSelectedCards() {
    firstCard = null;
    secondCard = null;
    hasCards = false;
}

function nextPlayer() {
    activePlayer = (activePlayer == 1) ? 2 : 1;
    displayActivePlayer();
}

function hidePlayer(player){
    if(player) {
        return addHide(player);
    }

    addHide(player1.infoCard);
    addHide(player2.infoCard);
}

function removeHide(player){
    return player.classList.remove("hide");
}

function addHide(objectToHide){
    return objectToHide.classList.toggle("hide");
}

function winner(player1, player2) {
    if (player1.score > player2.score) {
        playerWhoWin.innerHTML = "Winner Player 1";
    } else if (player1.score < player2.score) {
        playerWhoWin.innerHTML = "Winner Player 2";
    } else {
        playerWhoWin.innerHTML = "Draw";
    }
    gameOver.innerHTML = "Game Over";
    // newGameButton.classList.toggle("header-game__new--active");
}

function generateCards(pairs, cardsMock) {
    pairs = (pairs > cardsMock.length) ? cardsMock.length : pairs;

    let listOfCards = [];
    for (var i = 0; i < pairs; i++) {
        let generatedCard = createSingleCard(cardsMock[i]);
        let clonedCard = generatedCard.cloneNode(true);

        generatedCard.addEventListener('click', flip);
        clonedCard.addEventListener('click', flip);

        listOfCards.push(generatedCard);
        listOfCards.push(clonedCard);
    }
    return listOfCards
}

function createSingleCard(card) {
    var cardElement = document.createElement("div");
    cardElement.className = 'card';
    cardElement.dataset.card = card.name;

    var cardFront = document.createElement("img");
    cardFront.src = "img/goal.png";
    cardFront.className = "card__photo card__front";
    cardElement.appendChild(cardFront);

    var cardBack = document.createElement("img");
    cardBack.src = card.dataPath;
    cardBack.className = "card__photo card__back";
    cardElement.appendChild(cardBack);

    return cardElement
}

function createPlayer(name, infoCardReference) {
    var player = {
        name: name,
        infoCard: getByClass(infoCardReference),
        score: 0,
        rounds: 0
    }
    return player;
}

function resetGame() {
    memoryGame.innerHTML = "";
    memoryGame.classList.remove("memory-game--hard");
    playerWhoWin.innerHTML = "";
    gameOver.innerHTML = "";
    activePlayer = 1;
    firstCard = null;
    secondCard = null;
    totalScore = 0;
    hasCards = false;
    pairsCards = 0;
    player1 = createPlayer("Player1", "js-player-1");
    player2 = createPlayer("Player2", "js-player-2");
    setScore(player1);
    setScore(player2);
}

function chooseLevel() {
    if (this === easyGameButton) {
        pairsCards = 6;
        addHide(regularGameButton);
        addHide(hardGameButton);
    } else if (this === regularGameButton) {
        pairsCards = 10;
        addHide(easyGameButton);
        addHide(hardGameButton);
    } else {
        pairsCards = 15;
        memoryGame.classList.add("memory-game--hard");
        addHide(easyGameButton);
        addHide(regularGameButton);
    }
    startGame(pairsCards);
}

function startGame(pairsCards){
    let listOfCards = generateCards(pairsCards, cardsMock);
    listOfCards = randomizeArray(listOfCards);

    listOfCards.forEach(function (card) {
        memoryGame.appendChild(card);
    })
    removeHide(player1.infoCard);
    removeHide(player2.infoCard);
    player1.infoCard.classList.add("header-player--active");
    player2.infoCard.classList.remove("header-player--active");
    newGameButton.classList.remove("hide");
}

function gameInitializer() {
    resetGame();
    generateCards(pairsCards, cardsMock);
    addHide(newGameButton);
    removeHide(easyGameButton);
    removeHide(regularGameButton);
    removeHide(hardGameButton);
    hidePlayer();
}

gameInitializer()
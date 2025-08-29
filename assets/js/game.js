//Global variables
let deck = [];
const deckGroups = ['H', 'S', 'C', 'D'];
const specialCards = ['A', 'Q', 'K', 'J'];
let playerPointsAcum = 0;
let pcPointsAcum = 0;


//HTML Elements
const btnNewGame = document.querySelector('#btnNewGame');
const btnAskForCard = document.querySelector('#btnAskForCard');
const btnStop = document.querySelector('#btnStop');
const playerScore = document.querySelector('#playerScore');
const playerCards = document.querySelector('#playerCards');
const pcScore = document.querySelector('#pcScore');
const pcCards = document.querySelector('#pcCards');


//Fill deck
const fillAndShuffleDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (const group of deckGroups) {
      deck.push(i + group);
    }
  }

  for (const specialCard of specialCards) {
    for (const group of deckGroups) {
      deck.push(specialCard + group);
    }
  }

  deck = _.shuffle(deck);
  return deck
};

//Pick card
const pickCard = () => {
  return deck.pop();
}

//Assign value (points) to each card
const assignValues = (card) => {
  let cardTaken = card.substring(0, (card.length - 1));
  let points;

  if (specialCards.includes(cardTaken)) {
    (cardTaken === 'A') ? points = 11 : points = 10;
  } else {
    cardTaken = (cardTaken * 1);
    points = cardTaken;
  }

  // console.log(`
  //   Carta tomada: ${card}
  //   Puntos: ${points}
  //   `);

  return points;
};


//IA logic (PC-Turn)
const pcTurn = (playerPoints) => {

  while (pcPointsAcum < 17) {
    let card = pickCard();
    let cardPoints = assignValues(card);

    pcPointsAcum = (pcPointsAcum + cardPoints);

    pcScore.textContent = `${pcPointsAcum}`;

    let imgCard = document.createElement('img');
    imgCard.src = `assets/cards/${card}.png`;
    imgCard.className = `card`;


    pcCards.append(imgCard);


    if (playerPoints > 21) {
      break;
    }
  }

  setTimeout(() => {
    determineWinner();
  }, 500);
};

//Determine the winner
const determineWinner = () => {
  if (playerPointsAcum > 21) {
    alert('¡Perdiste! Te pasaste de 21.');
  } else if (pcPointsAcum > 21) {
    alert('¡Ganaste! La PC se pasó de 21.');
  } else if (playerPointsAcum > pcPointsAcum) {
    alert('¡Ganaste! Tu puntaje es mayor.');
  } else if (pcPointsAcum > playerPointsAcum) {
    alert('¡Perdiste! La PC tiene un puntaje mayor.');
  } else {
    alert('Empate');
  }
};



//Events
//Ask for a card
btnAskForCard.addEventListener('click', (event) => {
  let card = pickCard();
  let cardPoints = assignValues(card);

  playerPointsAcum = (playerPointsAcum + cardPoints);

  playerScore.textContent = `${playerPointsAcum}`;


  let imgCard = document.createElement('img');
  imgCard.src = `assets/cards/${card}.png`;
  imgCard.className = `card`;


  playerCards.append(imgCard);


  if (playerPointsAcum > 21) {
    btnAskForCard.disabled = 'true';
    btnStop.disabled = 'true';
    pcTurn(playerPointsAcum);
  } else if (playerPointsAcum === 21) {
    btnAskForCard.disabled = 'true';
    btnStop.disabled = 'true';
    pcTurn(playerPointsAcum);
  }
})

//Stop button
btnStop.addEventListener('click', (event) => {
  btnAskForCard.disabled = 'true';
  btnStop.disabled = 'true';
  pcTurn(playerPointsAcum);
})

//New-game button
btnNewGame.addEventListener('click', (event) => {
  deck = [];
  fillAndShuffleDeck();
  playerPointsAcum = 0;
  pcPointsAcum = 0;
  pcScore.textContent = `0`;
  playerScore.textContent = `0`;
  btnStop.removeAttribute('disabled');
  btnAskForCard.removeAttribute('disabled');
  playerCards.innerHTML = ``;
  pcCards.innerHTML = ``;

})









const main = async () => {
  try {
    fillAndShuffleDeck();

  } catch (error) {

  }
};
main();













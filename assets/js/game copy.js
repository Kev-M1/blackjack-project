let deck = [];
let deckGroups = ['H', 'D', 'S', 'C'];
let specialCards = ['Q', 'K', 'J', 'A'];
let userPointsAcum = 0;
let pcPointsAcum = 0;

//HTML Elements
const btnNewGame = document.querySelector('#btnNewGame');
const btnAskForCard = document.querySelector('#btnAskForCard');
const btnStop = document.querySelector('#btnStop');
const playerScore = document.querySelector('#playerScore');
const pcScore = document.querySelector('#pcScore');
const playerCards = document.querySelector('#player-cards');
const pcCards = document.querySelector('#pcCards');


// Fill deck function
const fillDeck = () => {

  for (let i = 2; i <= 10; i++) {
    for (const group of deckGroups) {
      deck.push(i + group);
    }
  }

  for (const card of specialCards) {
    for (const group of deckGroups) {
      deck.push(card + group);
    }
  }

  deck = _.shuffle(deck);
  return deck;
};


// Pick card function
const pickCard = () => {
  return deck.pop();
};


// Assign values to elements
const assignValues = (card) => {
  let value = card.substring(0, (card.length - 1));
  let points = 0;

  if (isNaN(value)) {
    (value === 'A') ? points = 11 : points = 10;
  } else {
    value = (value * 1);
    points = value;
  }

  // console.log(`
  //   Carta tomada: ${card}
  //   Valor/Caracter que determina su valor: ${value}
  //   Puntaje: ${points}
  //   `);
  return points;
};



//PcTurn
const pcTurn = (minimumPoints) => {

  while ((pcPointsAcum < minimumPoints)) {
    const card = pickCard();
    const cardPoints = assignValues(card);
    pcPointsAcum = (pcPointsAcum + cardPoints);
    pcScore.textContent = `Puntaje: (${pcPointsAcum})`;

    const htmlCard = document.createElement('img');
    htmlCard.src = `assets/cards/${card}.png`;
    htmlCard.className = 'card';
    pcCards.append(htmlCard);

    if (minimumPoints > 21) {
      break;
    }
  }

  determineWinner(minimumPoints, pcPointsAcum);
};


//DetermineWinner
const determineWinner = (userPoints, pcPoints) => {

  if (userPoints > 21) {
    alert('Perdiste (te pasaste de 21)');
  } else if (pcPoints > 21) {
    alert('¡Ganaste! (la PC se pasó de 21)');
  }

  else if (userPoints > pcPoints) {
    alert('¡Ganaste! (tu puntaje es mayor)');
  } else if (userPoints < pcPoints) {
    alert('Perdiste (la PC tiene un puntaje mayor)');
  }

  else {
    alert('Empate');
  }
};


// Events
//UserPickCard
btnAskForCard.addEventListener('click', (event) => {
  const card = pickCard();
  const cardPoints = assignValues(card);
  userPointsAcum = (userPointsAcum + cardPoints);
  playerScore.textContent = `Puntaje: (${userPointsAcum})`;

  const htmlCard = document.createElement('img');
  htmlCard.src = `assets/cards/${card}.png`;
  htmlCard.className = 'card';
  playerCards.append(htmlCard);

  if (userPointsAcum > 21) {
    btnAskForCard.setAttribute('disabled', 'true');
    btnStop.setAttribute('disabled', 'true');
    pcTurn(userPointsAcum);
  } else if (userPointsAcum === 21) {
    pcTurn(userPointsAcum);
  }
  // return cardPoints;
});

//StopEvent
btnStop.addEventListener('click', () => {
  btnAskForCard.setAttribute('disabled', 'true');
  btnStop.setAttribute('disabled', 'true')

  pcTurn(userPointsAcum);
});


//NewGame
btnNewGame.addEventListener('click', (event) => {
  fillDeck();
  userPointsAcum = 0;
  pcPointsAcum = 0;
  playerCards.innerHTML = ``;
  pcCards.innerHTML = ``;
  btnAskForCard.removeAttribute('disabled');
  btnStop.removeAttribute('disabled');
  pcScore.innerHTML = `Puntaje: (0)`;
  playerScore.innerHTML = `Puntaje: (0)`;
})



let main = async () => {
  try {
    fillDeck();

    console.log(deck);
  } catch (error) {

  }
}
main();


























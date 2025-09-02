const blackjackModule = (() => {
  'use strict';


  /*=============================================
  =         Global stuff of the module          =
  =============================================*/
  let deck = [],
    deckGroups = ['H', 'D', 'S', 'C'], //13 Card per group
    specialCards = ['A', 'K', 'Q', 'J'],
    pointsAccumOfAllPlayers = [];


  //HTML ELEMENTS
  const btnNewGame = document.querySelector("#btnNewGame"),
    btnAskForCard = document.querySelector("#btnAskForCard"),
    btnStop = document.querySelector('#btnStop'),
    scoreTags = document.querySelectorAll('.score'),
    cardsDivs = document.querySelectorAll('.cards-div');
  /*=====  End of global stuff  ======*/

  //function for initialize accumulators
  //This function initializes an accumulator within the array for each player that is going to play
  const initializeAccumulators = (numberOfPlayers = 2) => {
    pointsAccumOfAllPlayers = [];
    for (let i = 0; i < numberOfPlayers; i++) {
      pointsAccumOfAllPlayers.push(0);
    }
    return pointsAccumOfAllPlayers;
  };

  //function for fill deck with cards
  const createCardsAndFillDeck = () => {

    for (let i = 2; i <= 10; i++) {
      for (const group of deckGroups) {
        deck.push(i + group);
      }
    };

    for (const specialCard of specialCards) {
      for (const group of deckGroups) {
        deck.push(specialCard + group);
      }
    };

    return _.shuffle(deck);
  };

  //function for pick each card from deck
  const pickCard = () => {
    return deck.pop();
  };

  //function for assign points to each card 
  const assignsPointsToCard = (card) => {
    let cardValue = card.substring(0, (card.length - 1));
    let points;

    if (specialCards.includes(cardValue)) {
      (cardValue === 'A') ? points = 11 : points = 10;
    } else {
      cardValue = (cardValue * 1);
      points = cardValue;
    }

    console.log({ card }, { cardValue }, { points });

    return points;
  };

  //function for accumulate points of each player
  const accumulatePoints = (accumIndex, cardPoints, scoreIndex) => {
    pointsAccumOfAllPlayers[accumIndex] = (pointsAccumOfAllPlayers[accumIndex] + cardPoints);
    //render info
    scoreTags[scoreIndex].textContent = `${pointsAccumOfAllPlayers[accumIndex]}`;
  }

  //function for render cards img of each player
  const renderCardsImg = (cardsDivsIndex, card) => {
    cardsDivs[cardsDivsIndex].innerHTML += `<img class="card" src="assets/cards/${card}.png" alt="card">`;
  };

  //function for disabled buttons
  const disableButtons = () => {
    btnAskForCard.disabled = true;
    btnStop.disabled = true;
  };

  const enableButtons = () => {
    btnAskForCard.disabled = false;
    btnStop.disabled = false;
  }

  //IA LOGIC (PC TURN)
  const pcTurn = (playerPoints) => {
    while (pointsAccumOfAllPlayers[pointsAccumOfAllPlayers.length - 1] < 17) {
      let card = pickCard();
      let cardPoints = assignsPointsToCard(card);
      accumulatePoints((pointsAccumOfAllPlayers.length - 1), cardPoints, (scoreTags.length - 1));
      renderCardsImg((cardsDivs.length - 1), card);
    }

    determineWinner();
  };

  //function for determine the winner
  const determineWinner = () => {
    let totalPointsPlayer, totalPointsPc;
    [totalPointsPlayer, totalPointsPc] = pointsAccumOfAllPlayers;

    if (totalPointsPlayer > 21) {
      alert(`
      Pierdes!! Te pasaste de 21, gana la PC
      Puntaje jugador: ${totalPointsPlayer}
      Puntaje PC: ${totalPointsPc}
      `);
    } else if (totalPointsPc > 21) {
      alert(`
      Ganaste!! el PC se paso de 21
      Puntaje jugador: ${totalPointsPlayer}
      Puntaje PC: ${totalPointsPc}`);
    } else if (totalPointsPlayer > totalPointsPc) {
      alert(`
      Ganaste!!
      Puntaje jugador: ${totalPointsPlayer}
      Puntaje PC: ${totalPointsPc}`);
    } else if (totalPointsPc > totalPointsPlayer) {
      alert(`
      Perdiste!!
      Puntaje jugador: ${totalPointsPlayer}
      Puntaje PC: ${totalPointsPc}`);
    } else {
      alert(`
      Empate!!
      Puntaje jugador: ${totalPointsPlayer}
      Puntaje PC: ${totalPointsPc}`);
    }
  };

  //function for restart html values 
  const restartHTMLValues = () => {
    scoreTags.forEach(tag => {
      tag.innerHTML = ``;
    });

    cardsDivs.forEach(tag => {
      tag.innerHTML = ``;
    });
  };

  /*=============================================
  =            EVENTS            =
  =============================================*/
  //Button ask for a card
  btnAskForCard.addEventListener('click', (event) => {
    let card = pickCard();
    let cardPoints = assignsPointsToCard(card);
    accumulatePoints(0, cardPoints, 0);
    renderCardsImg(0, card);

    if (pointsAccumOfAllPlayers[0] > 21) {
      disableButtons();
      pcTurn(pointsAccumOfAllPlayers[0]);
    }
  })

  //Button stop gamme
  btnStop.addEventListener('click', (event) => {
    disableButtons();
    pcTurn();
  })

  //button New game
  btnNewGame.addEventListener('click', (event) => {
    startGame();
  });

  /*=====  End of EVENTS  ======*/


  const startGame = () => {
    enableButtons();
    deck = createCardsAndFillDeck();
    pointsAccumOfAllPlayers = initializeAccumulators();
    restartHTMLValues();
  };
  startGame();
})();
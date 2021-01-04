'use strict';

// selecting elements
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
let currentScore, activePlayer, playing, scores;

initialValues();

// Initial scores
function initialValues() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  playing = true;
  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.remove('player--active');
  player1.classList.remove('player--active');
  player0.classList.add('player--active');
  document.getElementById('name--0').textContent = 'Player 1';
  document.getElementById('name--1').textContent = 'Player 2';
}

// Switch active player
const switchActivePlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
  diceEl.classList.add('hidden');
};

// New Player button
btnNew.addEventListener('click', initialValues);

// Roll dice button
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate dice
    let dice = Math.trunc(Math.random() * 6) + 1;
    // Based on dice value show the dice image
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // If 1 is not rolled, add dice to current score
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    }
    // If 1 is rolled -- make current score to 0, Switch player
    else {
      switchActivePlayer();
    }
  }
});

// Hold button
btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to player score and display it
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // If player score = 100, Winner and stop game
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceEl.classList.add('hidden');
      document.getElementById(`name--${activePlayer}`).textContent =
        'WINNER!🥳 ';
    }
    // If not, switchActivePlayer()
    else {
      switchActivePlayer();
    }
  }
   // Restart - New Game
  btnNew.addEventListener('click', init);
});

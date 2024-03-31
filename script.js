'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let currentEl0 = document.getElementById('current--0');
let currentEl1 = document.getElementById('current--1');
//
let player0 = document.querySelector('.player--0');
let player1 = document.querySelector('.player--1');
//
score0El.textContent = 0;
score1El.textContent = 0;

let playing = true;
// console.log(typeof playing);

diceEl.classList.add('hidden');
let totalScore = [0, 0];
let currentScore = 0;
let activePlayer = 0;
//-----Activating the rolling dice function

btnRoll.addEventListener('click', function () {
  if (playing) {
    diceEl.classList.remove('hidden');
    let dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0.classList.toggle('player--active');
      player1.classList.toggle('player--active');
    }

    console.log(dice);
  }
});

//------Activating the Hold button------------//

btnHold.addEventListener('click', function () {
  if (playing) {
    currentEl0.textContent = 0;
    currentEl1.textContent = 0;
    if (activePlayer === 0) {
      totalScore[activePlayer] += currentScore;
      score0El.textContent = totalScore[activePlayer];
      currentScore = 0;
      if (totalScore[activePlayer] < 20) {
        player1.classList.add('player--active');
        player0.classList.remove('player--active');
        activePlayer = activePlayer === 0 ? 1 : 0;
      } else {
        player0.classList.add('player--winner');
        diceEl.classList.add('hidden');
        playing = false;
      }
    } else if (activePlayer === 1) {
      totalScore[activePlayer] += currentScore;
      score1El.textContent = totalScore[activePlayer];
      currentScore = 0;
      if (totalScore[activePlayer] < 20) {
        player0.classList.add('player--active');
        player1.classList.remove('player--active');
        activePlayer = activePlayer === 0 ? 1 : 0;
      } else {
        player1.classList.add('player--winner');
        diceEl.classList.add('hidden');
        playing = false;
      }
    }
  }
});

//--------Adding new button functionalitly------------//

btnNew.addEventListener('click', function () {
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  totalScore = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  currentEl0.textContent = 0;
  currentEl1.textContent = 0;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player1.classList.remove('player--winner');
  player0.classList.remove('player--winner');
});

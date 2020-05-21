import React, { useState, useRef } from 'react';

const getRandomNumber = () => Math.floor(Math.random() * 10) + 1;
const guessCountMessageMapping = { 1: 'first', 2: 'second', 3: 'last' };

const GuessNumber = () => {
  const [number, setNumber] = useState(null);
  const [userMessage, setUserMessage] = useState('');
  const randomNumberRef = useRef(getRandomNumber());
  const countRef = useRef(0);

  const onGuessClick = () => {
    const randomNumber = randomNumberRef.current;
    countRef.current += 1;
    let newUserMessage = `Your ${
      guessCountMessageMapping[countRef.current]
    } guess is: ${number}.`;
    const numberDifference = Math.abs(number - randomNumber);
    if (numberDifference === 0) {
      newUserMessage = `${newUserMessage} It's Right! You have won the game`;
    } else if (numberDifference === 1) {
      newUserMessage = `${newUserMessage} (hot)`;
    } else if (numberDifference === 2) {
      newUserMessage = `${newUserMessage} (warm)`;
    } else if (numberDifference >= 3) {
      newUserMessage = `${newUserMessage} (cold)`;
    }
    if (countRef.current === 3 && numberDifference) {
      newUserMessage = `${newUserMessage} You have lost the game.`;
    }
    setUserMessage(newUserMessage);
  };

  return (
    <div>
      <h1>Guess Number Game</h1>
      <br />
      <br />
      <p>I am thinking a number from 1 to 10</p>
      <p>You must guess what it is in three tries</p>
      <section>
        <div>Enter a name</div>
        <div>
          <input
            type="number"
            min="1"
            max="10"
            value={number}
            onChange={(event) => setNumber(event.target.value)}
          />
        </div>
        <div>
          <button
            type="button"
            onClick={onGuessClick}
            disabled={countRef.current === 3}
          >
            Guess It
          </button>
        </div>
        <div>Random Number {randomNumberRef.current}</div>
        <div>{userMessage}</div>
      </section>
    </div>
  );
};

export default GuessNumber;

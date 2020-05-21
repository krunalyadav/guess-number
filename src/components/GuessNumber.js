import React from 'react';

// function to get the random number
const getRandomNumber = () => Math.floor(Math.random() * 10) + 1;

// mapping object between user's guess count against text
const guessCountMessageMapping = { 1: 'first', 2: 'second', 3: 'last' };

class GuessNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      message: '',
    };
    this.count = 0;
    this.randomNumber = getRandomNumber();
  }

  onGuessClick = () => {
    const { number } = this.state;
    this.count += 1;
    let message = `Your ${
      guessCountMessageMapping[this.count]
    } guess is: ${number}.`;
    // logic to show the message to user
    const numberDifference = Math.abs(number - this.randomNumber);
    if (numberDifference === 0) {
      message = `${message} It's Right! You have won the game`;
    } else if (numberDifference === 1) {
      message = `${message} (hot)`;
    } else if (numberDifference === 2) {
      message = `${message} (warm)`;
    } else if (numberDifference >= 3) {
      message = `${message} (cold)`;
    }

    if (this.count === 3 && numberDifference) {
      message = `${message} You have lost the game.`;
    }
    this.setState({ message });
  };

  onNumberChange = (event) => {
    let newNumber = event.target.value;
    // checking if value is not in given range then replacing it with empty string
    if (newNumber > 10 || newNumber < 1) {
      newNumber = '';
    }
    this.setState({ number: newNumber });
  };

  render() {
    const { number, message } = this.state;
    return (
      <div>
        <h1>Guess Number Game</h1>
        <br />
        <br />
        <p>I am thinking a number from 1 to 10</p>
        <p>You must guess what it is in three tries</p>
        <section>
          <label htmlFor="number">Enter a Guess</label>
          <div>
            <input
              type="number"
              min="1"
              max="10"
              value={number}
              width="100px"
              onChange={this.onNumberChange}
              id="number"
            />
          </div>
          <div>
            <button
              type="button"
              onClick={this.onGuessClick}
              disabled={this.count === 3 || message.includes('won')}
            >
              Guess It
            </button>
          </div>
          <div role="message">{message}</div>
        </section>
      </div>
    );
  }
}

export default GuessNumber;

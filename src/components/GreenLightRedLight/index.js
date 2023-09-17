
import { Component } from 'react';

import './index.css'

class GreenLightRedLight extends Component {
    
    state = {
        isGreen: false,
        clicks: 0,
        timeLeft: this.props.gameDuration,
        gameStarted: false,
        gameEnded: false,
    }
    
  
    startGame = () => {
        const {gameStarted,gameEnded} = this.state
      if (!gameStarted && !gameEnded) {
        this.setState({
          gameStarted: true,
          clicks: 0,
          timeLeft: this.props.gameDuration,
        });
  
        this.intervalId = setInterval(this.toggleColor, this.randomInterval());
      }
    };


   //toggling the color
    toggleColor = () => {
        const {timeLeft} = this.state
      this.setState((prevState) => ({
        isGreen: !prevState.isGreen,
        timeLeft: prevState.timeLeft - 1,
      }));
  
      if (timeLeft <= 0) {
        this.endGame(false);
      }
    };
  
    endGame = (isWin) => {
      clearInterval(this.intervalId);
      this.setState({
        gameStarted: false,
        gameEnded: true,
      });
  
      if (isWin) {
        alert('You win!');
      } else {
        alert('Game Over!');
      }
    };
  
    handleBoxClick = () => {
        const {isGreen,clicks} = this.state
      if (isGreen) {
        this.setState(
          (prevState) => ({
            clicks: prevState.clicks + 1,
          }),
          () => {
            if (clicks >= this.props.targetClicks - 1) {
              this.endGame(true);
            }
          }
        );
      } else {
        this.endGame(false);
      }
    };
  
    randomInterval = () => {
      // Generates a random interval between 1s and 2s (1000ms and 2000ms)
      return Math.floor(Math.random() * 2000);
    };
  
    render() {
      const { gameStarted, isGreen, clicks, timeLeft, gameEnded } = this.state;
      const {userName,userEmail,userMobileNumber,userDifficultyLevel} = this.props.userDetails
      return (
        <div className='container'>
            <div>
                <p className='user-name'>{userName}</p>
                <p className='user-email'>{userEmail}</p>
                <p className='user-mobileno'>{userMobileNumber}</p>
                <p className='user-difficulty-level'>{userDifficultyLevel}</p>
                
            </div>
            <div className={`box ${isGreen ? 'green' : 'red'}`} 
                onClick={gameStarted && !gameEnded ? this.handleBoxClick : null}>
            </div>
          <div>
            {gameStarted ? (
              <p>Time Left: {timeLeft} seconds</p>
            ) : (
              <button className='start-button' onClick={this.startGame}>Start Game</button>
            )}
          </div>
          {gameEnded && (
            <p className='result-text'>{clicks >= this.props.targetClicks ? 'Congrats! You win!' : 'Sorry, Game Over!'}</p>
          )}
          <p className='clicks'>Clicks on <span style={{color:'green'}}>Green</span>: <span className='clicks-count'>{clicks}</span></p>
        </div>
      );
    }
  }

  export default GreenLightRedLight

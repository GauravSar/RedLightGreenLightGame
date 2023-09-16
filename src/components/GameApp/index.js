import { Component } from 'react';
import './index.css'

import GreenLightRedLight from '../GreenLightRedLight'


class GameApp extends Component {
  
  state ={
    name: '',
      email: '',
      mobileNumber: '',
      difficultyLevel: 'Easy',
      gameStarted : false,
      userDetails:[]
  }


  handleInputName = (event) =>{
    this.setState({name: event.target.value})
  }

  handleInputEmail = (event) =>{
    this.setState({email: event.target.value})
  }

  handleInputMobileNo = (event) =>{
    this.setState({mobileNumber: event.target.value})
  }

  handleInputLevel = (event) =>{
    this.setState({difficultyLevel: event.target.value})
  }

  handleStartGame = () => {
    const {name,email,mobileNumber,difficultyLevel} = this.state
    // Validate user registration data and start the game
    if (name && email && mobileNumber) {
      let targetClicks, gameDuration;

      switch (difficultyLevel) {
        case 'Medium':
          targetClicks = 15;
          gameDuration = 40;
          break;
        case 'Hard':
          targetClicks = 25;
          gameDuration = 40;
          break;
        default:
          targetClicks = 10;
          gameDuration = 40;
      }

      this.setState({
        gameStarted: true,
        targetClicks: targetClicks,
        gameDuration: gameDuration,
      });
    } else {
      alert('Please provide all user registration details.');
    }
  };

  //Submitting the form
  onSubmitForm = (event) =>{
    event.preventDefault()
    const {name,email,mobileNumber,difficultyLevel} = this.state
    const newUser = {
      userName : name,
      userEmail: email,
      userMobileNumber : mobileNumber,
      userDifficultyLevel: difficultyLevel
    }

    this.setState({userDetails : newUser})
  }

  render() {
    const {name,email,mobileNumber,difficultyLevel,gameStarted,userDetails} = this.state
    return (
      <div className='main-comtainer'>
        {!gameStarted ? (
          <div className='game-app-comtainer'>
            <h1 className='app-heading'>Green Light Red Light Game</h1>
            <form className='form' onSubmit={this.onSubmitForm}>
            <div className='inputfields'>
              <label className='name'>Name </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={this.handleInputName}
                className='name-input'
              />
            </div>
            <div className='inputfields'> 
              <label className='email'>Email </label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={this.handleInputEmail}
                className='email-input'
              />
            </div>
            <div className='inputfields'>
              <label className='mobileno'>Mobile Number </label>
              <input
                type="text"
                name="mobileNumber"
                value={mobileNumber}
                onChange={this.handleInputMobileNo}
                className='mobileno-input'
              />
            </div>
            <div className='levels-container'>
              <label className='label'>Difficulty Level </label>
              <select
                name="difficultyLevel"
                value={difficultyLevel}
                onChange={this.handleInputLevel}
                className='levels'
              >
                <option className='option' value="Easy">Easy</option>
                <option className='option' value="Medium">Medium</option>
                <option className='option' value="Hard">Hard</option>
              </select>
            </div>
            <button type='sumbit' className='button' onClick={this.handleStartGame}>Start Game</button>
            </form>
          </div>
          
        ) : (
          <GreenLightRedLight
            userDetails = {this.state.userDetails}
            targetClicks={this.state.targetClicks}
            gameDuration={this.state.gameDuration}
          />
        )}
      </div>
    );
  }
}

export default GameApp;

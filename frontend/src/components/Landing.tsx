import React from 'react';
import logo from '../images/logo.png';
import Login from './Login';

const Landing = () => {
  return (
    <div className="landing">
      <header className="landing-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="header-subtitle">
          Welcome to AdFoodio Restaurant! <br/>Please register or log in to start ordering <span className="accenture">food</span>.
        </p>
      </header>
      <Login/>
    </div>
  );
}

export default Landing;

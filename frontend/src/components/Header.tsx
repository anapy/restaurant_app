import React from 'react';
import logo from '../images/logo.png';
import '../stylesheets/Header.scss';
import MenuAppBar from './MenuAppBar'

const Header = () => {
  return (
    <header className="App-header">
      <MenuAppBar/>
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Welcome to AdFoodio Restaurant! <br/>Scroll down and choose your <span className="accenture">food</span>.
      </p>
    </header>
  );
}

export default Header;
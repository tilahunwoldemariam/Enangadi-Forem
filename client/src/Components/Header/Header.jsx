import React from "react";
import "./Header.css";
import logo from '../../asset/images/header_logo.png'
const Header = ({ isAuthenticated, onSignOut }) => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="evangadi_logo" />
      </div>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/how-it-works">How it works</a>

        <div className="auth-button">
          {isAuthenticated ? (
            <button onClick={onSignOut} className="btn blue">
              LOG OUT
            </button>
          ) : (
            <a href="/signin" className="btn blue">
              SIGN IN
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

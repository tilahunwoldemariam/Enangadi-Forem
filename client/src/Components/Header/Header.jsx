import React from "react";
import "./Header.css";

const Header = ({ isAuthenticated, onSignOut }) => {
  return (
    <header className="header">
      <div className="logo">
        <span className="logo-orange">E</span>
        <span className="logo-black">NGADI</span>
      </div>
      <nav className="nav-links">
        <a href="/">Home</a>
        <a href="/how-it-works">How it works</a>
      </nav>
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
    </header>
  );
};

export default Header;

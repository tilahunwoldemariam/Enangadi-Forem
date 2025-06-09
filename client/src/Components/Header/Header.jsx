import React from "react";
import classes from './Header.module.css'
import logo from '../../asset/images/header_logo.png'
const Header = ({ isAuthenticated, onSignOut }) => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <img src={logo} alt="evangadi_logo" />
      </div>
      <div className={classes.nav_links}>
        <a href="/">Home</a>
        <a href="#">How it works</a>

        <div className={classes.auth_button}>
          {isAuthenticated ? (
            <button onClick={onSignOut} className={classes.btn}>
              LOG OUT
            </button>
          ) : (
            <a href="/signin" className={classes.btn}>
              SIGN IN
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

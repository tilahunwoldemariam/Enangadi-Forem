import React, { useState } from "react";
import classes from "./Header.module.css";
import logo from "../../asset/images/header_logo.png";

const Header = ({ isAuthenticated, onSignOut }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <img src={logo} alt="evangadi_logo" />
      </div>

      <button className={classes.menuToggle} onClick={toggleMenu}>
        ☰
      </button>

      <nav
        className={`${classes.mobileMenu} ${
          isMenuOpen ? classes.showMenu : ""
        }`}
      >
        <button className={classes.closeButton} onClick={closeMenu}>
          ×
        </button>
        <div className={classes.mobile_logo}>
          <img src={logo} alt="" />
        </div>
        <a href="/" onClick={closeMenu}>
          Home
        </a>
        <a href="#" onClick={closeMenu}>
          How it works
        </a>

        {isAuthenticated ? (
          <a
            onClick={() => {
              onSignOut();
              closeMenu();
            }}
            className={classes.btn}
          >
            Log out
          </a>
        ) : (
          <a href="/signin" onClick={closeMenu} className={classes.btn}>
            sign In
          </a>
        )}
      </nav>

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

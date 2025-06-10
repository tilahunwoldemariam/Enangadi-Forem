import React, { useState } from "react";
import styles from "./Header.module.css";
import logo from "../../asset/images/header_logo.png";
import { IoCloseSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";


const Header = ({ isAuthenticated, onSignOut }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="evangadi_logo" />
      </div>

      <button className={styles.menuToggle} onClick={toggleMenu}>
        <RxHamburgerMenu color="#FF8500" />
      </button>

      <nav
        className={`${styles.mobileMenu} ${
          isMenuOpen ? styles.showMenu : ""
        }`}
      >
        <button className={styles.closeButton} onClick={closeMenu}>
          <IoCloseSharp size={30} />
        </button>
        <div className={styles.mobile_logo}>
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
            className={styles.btn}
          >
            Log out
          </a>
        ) : (
          
          <a href="/signin" onClick={closeMenu} className={styles.btn}>
            sign In
          </a>
        )}
      </nav>

      <div className={styles.nav_links}>
        <a href="/">Home</a>
        <a href="#">How it works</a>
        <div className={styles.auth_button}>
          {isAuthenticated ? (
            <button onClick={onSignOut} className={styles.btn}>
              LOG OUT
            </button>
          ) : (
            <button to ="/signin"  className={styles.btn}>
              SIGN IN
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

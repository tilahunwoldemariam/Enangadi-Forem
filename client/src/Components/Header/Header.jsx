import React, { useState } from 'react';
import styles from './Header.module.css';
import logo from '../../asset/images/header_logo.png';
import { IoCloseSharp } from 'react-icons/io5';
import { FaBarsStaggered } from 'react-icons/fa6';
import { useContext } from 'react';
import { AuthContext } from '../../Context/Context';
import { Type } from '../../Utility/actionType';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Header = () => {
  const [{ user }, dispatch] = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const navigate = useNavigate();

  const onSignOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch({
      type: Type.REMOVE_USER,
    });
    toast.success('User Logged out successfully');
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <Link to={user ? '/' : '/login'} className={styles.logo}>
        <img src={logo} alt="evangadi_logo" />
      </Link>

      <button className={styles.menuToggle} onClick={toggleMenu}>
        <FaBarsStaggered color="#FF8500" />
      </button>

      <nav
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.showMenu : ''}`}
      >
        <button className={styles.closeButton} onClick={closeMenu}>
          <IoCloseSharp size={30} />
        </button>
        <Link to={user ? '/' : '/login'} className={styles.mobile_logo}>
          <img src={logo} alt="" />
        </Link>

        <Link to={user ? '/' : '/login'} onClick={closeMenu}>
          Home
        </Link>
        <Link to="/how-it-works" onClick={closeMenu}>
          How it works
        </Link>

        {user ? (
          <Link
            onClick={() => {
              onSignOut();
              closeMenu();
            }}
            className={styles.btn}
          >
            Log out
          </Link>
        ) : (
          <Link to="/login" onClick={closeMenu} className={styles.btn}>
            sign In
          </Link>
        )}
      </nav>

      <div className={styles.nav_links}>
        <Link to={user ? '/' : '/login'}>Home</Link>
        <Link to="/how-it-works">How it works</Link>
        <div className={styles.auth_button}>
          {user ? (
            <button onClick={onSignOut} className={styles.btn}>
              LOG OUT
            </button>
          ) : (
            <button className={styles.btn}>
              <Link to="/login" style={{ color: '#fff' }}>
                SIGN IN
              </Link>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

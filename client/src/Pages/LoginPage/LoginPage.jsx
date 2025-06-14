import React, { useRef, useState } from 'react';
import styles from './LoginPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import axiosInstance from '../../Api/axiosConfig';
import { useContext } from 'react';
import { AuthContext } from '../../Context/Context';
import { Type } from '../../Utility/actionType';

function LoginPage() {
  const [_, dispatch] = useContext(AuthContext);

  // State to manage the display of registration form
  const [regInDisplay, setRegInDisplay] = useState(styles.display);

  // State to manage the display of password reset form
  const [resetPage, setResetPage] = useState(styles.display);

  // State to manage errors
  const [errors, setErrors] = useState('');

  // State to manage the display of login form
  const [logInDisplay, setLogInDisplay] = useState('');

  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(true);

  // Ref for email input field
  const emailDom1 = useRef(null);

  // Ref for email input field in registration form
  const emailDom2 = useRef(null);

  // Ref for email input field in reset form
  const emailDom3 = useRef(null);

  // Ref for first name input field
  const firstNameDom = useRef(null);

  // Ref for last name input field
  const lastNameDom = useRef(null);

  // Ref for username input field
  const userNameDom = useRef(null);

  // Ref for password input field in login form
  const passwordDom1 = useRef(null);

  // Ref for password input field in registration form
  const passwordDom2 = useRef(null);

  const passwordDom3 = useRef();

  // Navigate hook for programmatic navigation
  const navigate = useNavigate();

  // Empty fields for error display
  const [emptyFields, setEmptyFields] = useState({
    email: false,
    password: false,
    username: false,
    firstname: false,
    lastname: false,
  });

  // page changing functions start here***
  function registerPage() {
    setErrors(''); // Reset errors
    setEmptyFields({
      email: false,
      password: false,
      username: false,
      firstname: false,
      lastname: false,
    }); // Reset empty fields
    setRegInDisplay('');
    setLogInDisplay(styles.display);
    setResetPage(styles.display);
  }
  function loginPage() {
    setErrors(''); // Reset errors
    setEmptyFields({
      email: false,
      password: false,
      username: false,
      firstname: false,
      lastname: false,
    }); // Reset empty fields
    setLogInDisplay('');
    setRegInDisplay(styles.display);
    setResetPage(styles.display);
  }
  function passwordReset() {
    setErrors(''); // Reset errors
    setEmptyFields({
      email: false,
      password: false,
      username: false,
      firstname: false,
      lastname: false,
    }); // Reset empty fields
    setResetPage('');
    setLogInDisplay(styles.display);
    setRegInDisplay(styles.display);
  }

  // page changing functions end here***
  // Handle form submission for login
  async function handleSubmitLogin(e) {
    e.preventDefault();

    setErrors(''); // Reset errors before submission
    setEmptyFields({
      email: false,
      password: false,
      username: false,
      firstname: false,
      lastname: false,
    });

    // Get values from input fields
    const email = emailDom1.current.value.trim();
    const password = passwordDom1.current.value.trim();

    // Check for empty fields
    const newEmptyFields = {};
    if (!email) newEmptyFields.email = true;
    if (!password) newEmptyFields.password = true;

    if (Object.keys(newEmptyFields).length > 0) {
      setEmptyFields(newEmptyFields);
      setErrors('All fields are required.');

      // Clear emptyFields after 2 seconds
      setTimeout(() => {
        setEmptyFields({
          email: false,
          password: false,
          username: false,
          firstname: false,
          lastname: false,
        });
      }, 2000);
      return;
    }

    try {
      const res = await axiosInstance.post('/users/login', {
        email,
        password,
      });
      console.log(res);

      dispatch({
        type: Type.ADD_USER,
        payload: {
          token: localStorage.getItem('token'),
          user: JSON.parse(localStorage.getItem('user')),
        },
      });

      localStorage.setItem('token', res.data.token); // Store token in localStorage

      localStorage.setItem('user', JSON.stringify(res.data.user)); // Store user info in localStorage

      console.log(`token from local storage: ${localStorage.getItem('token')}`);
      console.log(`user from local storage: ${JSON.parse(localStorage.getItem('user'))}`);

      navigate('/'); // Redirect to home page after successful login

      console.log(res?.data?.token);
    } catch (error) {
      alert(
        error?.response?.data?.msg || 'Error during login. Please try again.'
      );
      console.error('Error during Login:', error);
      setErrors(
        error?.response?.data?.msg || 'An error occurred. Please try again.'
      );
    }
  }

  // Handle form submission for registration
  async function handleSubmitSignUp(e) {
    e.preventDefault();
    setErrors(''); // Reset errors before submission
    setEmptyFields({
      email: false,
      password: false,
      username: false,
      firstname: false,
      lastname: false,
    });

    const username = userNameDom.current.value.trim();
    const firstname = firstNameDom.current.value.trim();
    const lastname = lastNameDom.current.value.trim();
    const email = emailDom2.current.value.trim();
    const password = passwordDom2.current.value.trim();

    // Check for empty fields
    const newEmptyFields = {};
    if (!email) newEmptyFields.email = true;
    if (!password) newEmptyFields.password = true;
    if (!username) newEmptyFields.username = true;
    if (!firstname) newEmptyFields.firstname = true;
    if (!lastname) newEmptyFields.lastname = true;

    if (Object.keys(newEmptyFields).length > 0) {
      setEmptyFields(newEmptyFields);
      setErrors('All fields are required.');

      // Clear emptyFields after 2 seconds
      setTimeout(() => {
        setEmptyFields({
          email: false,
          password: false,
          username: false,
          firstname: false,
          lastname: false,
        });
      }, 2000);
      return;
    }

    // Clear emptyFields after 2 seconds
    setTimeout(() => {
      setEmptyFields({
        email: false,
        password: false,
        username: false,
        firstname: false,
        lastname: false,
      });
    }, 2000);

    try {
      await axiosInstance.post('/users/register', {
        username,
        firstname,
        lastname,
        email,
        password,
      });

      alert('Registration successful! You can now log in.');
      loginPage(); // Redirect to login page after successful registration
    } catch (error) {
      console.error("Error during sign up:", error.response.data.msg);
      setErrors(
        error.response.data.msg || 'An error occurred. Please try again.'
      );
    }
  }

  async function handlePasswordReset(e) {
    e.preventDefault();
    setErrors('');
    const email = emailDom3.current.value.trim();
    const password = passwordDom3.current.value.trim();

    const empty = {
      email: !email,
      password: !password,
    };
    setEmptyFields(empty);

    if (!email || !password) {
      setErrors('Please fill in all fields.');
      setTimeout(() => setEmptyFields({ email: false, password: false }), 2000);
      return;
    }

    if (password.length <= 8) {
      setErrors('Password must be at least 8 characters.');
      setEmptyFields({ password: true });
      setTimeout(() => setEmptyFields({ password: false }), 2000);
      return;
    }

    try {
      await axiosInstance.post('/users/reset-password', {
        email,
        newPassword: password,
      });
      alert('Password reset successfully. You can now log in.');
      setResetPage(styles.display); // hide reset page
      setLogInDisplay(''); // show login page
    } catch (error) {
      console.error('Password reset error:', error);
      setErrors(
        error?.response?.data?.msg || 'Error resetting password. Try again.'
      );
    }
  }



  return (
    <section className={styles.main__bg}>
      <div className={styles.loginLayout}>
        {/* Left side */}
        <div className={styles.left_side}>
          <div className={logInDisplay}>
            <h3 className={styles.login_account}>Login to your account</h3>

            <p className={styles.alrdy}>
              Don't have an account?{" "}
              <Link
                to=""
                className={styles.creat_account}
                onClick={() => registerPage()}
              >
                Create an account
              </Link>
            </p>

            <form className={styles.login_form} onSubmit={handleSubmitLogin}>
              <small className={styles.error_display}>{errors && errors}</small>
              <small className={styles.error_display}></small>

              <input
                type="email"
                ref={emailDom1}
                className={`${styles.email_input} ${styles.email_input_login} ${
                  emptyFields.email ? styles.error_bg : ""
                }`}
                onChange={() =>
                  setEmptyFields({ ...emptyFields, email: false })
                }
                placeholder="Email Address"
              />

              <input
                type={showPassword ? "password" : "text"}
                ref={passwordDom1}
                className={`${styles.password__input} ${
                  emptyFields.password ? styles.error_bg : ""
                }`}
                onChange={() =>
                  setEmptyFields({ ...emptyFields, password: false })
                }
                placeholder="Password"
              />

              <span
                className={styles.toggle_password}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>

              <p className={styles.forgotPwd}>
                <Link
                  to=""
                  className={`${styles.lnk_toggler} ${styles.da}`}
                  onClick={() => passwordReset()}
                >
                  Forgot Password?
                </Link>
              </p>

              <button
                type="submit"
                className={`butn_login ${styles.butn_login}`}
              >
                Login
              </button>
            </form>
          </div>
          {/* register form */}
          <div className={regInDisplay}>
            <h3 className={styles.join_net}>Join the network</h3>

            <p className={styles.alrdy}>
              Already have an account?{" "}
              <Link to="" onClick={() => loginPage()}>
                Sign in
              </Link>
            </p>

            <form onSubmit={handleSubmitSignUp}>
              <small className={styles.error_display}>{errors && errors}</small>

              <input
                type="email"
                ref={emailDom2}
                className={`${styles.email_input} ${
                  emptyFields.email ? styles.error_bg : ""
                }`}
                onChange={() =>
                  setEmptyFields({ ...emptyFields, email: false })
                }
                name="eva_email"
                placeholder="Email address"
              />

              <div className={styles.personal_info}>
                <input
                  ref={firstNameDom}
                  id="fname-input"
                  type="text"
                  className={`${styles.f_name} ${
                    emptyFields.firstname ? styles.error_bg : ""
                  }`}
                  onChange={() =>
                    setEmptyFields({ ...emptyFields, firstname: false })
                  }
                  name="firstname"
                  placeholder="First Name"
                />

                <input
                  ref={lastNameDom}
                  id="lname-input"
                  type="text"
                  className={`${styles.l_name} ${
                    emptyFields.lastname ? styles.error_bg : ""
                  }`}
                  onChange={() =>
                    setEmptyFields({ ...emptyFields, lastname: false })
                  }
                  name="lastname"
                  placeholder="Last Name"
                />

                <input
                  ref={userNameDom}
                  type="text"
                  className={`${styles.l_name} ${styles.userName_input} ${
                    emptyFields.username ? styles.error_bg : ""
                  }`}
                  onChange={() =>
                    setEmptyFields({ ...emptyFields, username: false })
                  }
                  name="User name"
                  placeholder="User Name"
                />
              </div>

              <div className={styles.paswrd_insert}>
                <input
                  ref={passwordDom2}
                  type={showPassword ? "password" : "text"}
                  className={`${styles.password__input} ${
                    emptyFields.password ? styles.error_bg : ""
                  }`}
                  onChange={() =>
                    setEmptyFields({ ...emptyFields, password: false })
                  }
                  name="password"
                  placeholder="Password"
                />
                <div
                  className={styles.toggle_password}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>

              <p className={`${styles.term_policy} ${styles.small}`}>
                I agree to the{" "}
                <Link to="https://legacy.evangadi.com/legal/privacy/">
                  privacy policy
                </Link>{" "}
                and{" "}
                <Link to="https://legacy.evangadi.com/legal/terms/">
                  terms of service
                </Link>
                .
              </p>

              <button
                id={styles.agree_but}
                className={`${styles.butn_login} butn_login`}
                type="submit"
              >
                Agree and Join
              </button>

              <Link
                to=""
                className={styles.already}
                onClick={() => loginPage()}
              >
                Already have an account?
              </Link>
            </form>
          </div>
          {/* reset form */}
          <div className={`${resetPage} ${styles.reset_con}`}>
            <h4 className={styles.reset_title}>Reset your password</h4>

            <p className={styles.reset__desc}>
              Enter your email and new password below to reset it.
            </p>

            <form onSubmit={handlePasswordReset}>
              <input
                ref={emailDom3}
                type="email"
                className={`${styles.email_input} ${
                  emptyFields.email ? styles.error_bg : ""
                }`}
                onChange={() =>
                  setEmptyFields((prev) => ({ ...prev, email: false }))
                }
                name="emailaddress"
                placeholder="Email address"
              />

              <input
                ref={passwordDom3}
                type="password"
                className={`${styles.email_input} ${
                  emptyFields.password ? styles.error_bg : ""
                }`}
                onChange={() =>
                  setEmptyFields((prev) => ({ ...prev, password: false }))
                }
                name="newpassword"
                placeholder="New password"
              />

              <button
                className={`${styles.butn_login} butn_login`}
                type="submit"
              >
                Reset your password
              </button>
            </form>

            <div className={styles.links}>
              <Link to="#" onClick={() => loginPage()}>
                Already have an account?
              </Link>
              <Link to="#" onClick={() => registerPage()}>
                Don’t have an account?
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className={styles.right_side}>
          <div className={styles.right_in_contener}>
            <small className="about">About</small>
            <h2
              className={`${styles.evangadi_network} ${styles.text_gradients}`}
            >
              Evangadi Networks
            </h2>

            <p className={`${styles.p1} ${styles.infoParagraph}`}>
              No matter what stage of life you are in, whether you’re just
              starting elementary school or being promoted to CEO of a Fortune
              500 company, you have much to offer to those who are trying to
              follow in your footsteps.
            </p>
            <p className={`${styles.p2} ${styles.infoParagraph}`}>
              Wheather you are willing to share your knowledge or you are just
              looking to meet mentors of your own, please start by joining the
              network here.
            </p>

            <button className={`${styles.h_w_butn} h_w_butn`}>
              <Link to="/howItWork">HOW IT WORKS</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;

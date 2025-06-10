import React, { useEffect, useRef, useState } from "react";
import styles from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import axiosInstance from "../../Api/axiosConfig";

function LoginPage() {
  // State to manage the display of registration form
  const [regInDisplay, setRegInDisplay] = useState(styles.display);

  // State to manage the display of password reset form
  const [resetPage, setResetPage] = useState(styles.display);

  // State to manage errors
  const [errors, setErrors] = useState("");

  // State to manage the display of login form
  const [logInDisplay, setLogInDisplay] = useState("");

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

  // // Navigate hook for programmatic navigation
  // const navigate = useNavigate();

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
    setErrors(""); // Reset errors
    setEmptyFields({
      email: false,
      password: false,
      username: false,
      firstname: false,
      lastname: false,
    }); // Reset empty fields
    setRegInDisplay("");
    setLogInDisplay(styles.display);
    setResetPage(styles.display);
  }
  function loginPage() {
    setErrors(""); // Reset errors
    setEmptyFields({
      email: false,
      password: false,
      username: false,
      firstname: false,
      lastname: false,
    }); // Reset empty fields
    setLogInDisplay("");
    setRegInDisplay(styles.display);
    setResetPage(styles.display);
  }
  function passwordReset() {
    setErrors(""); // Reset errors
    setEmptyFields({
      email: false,
      password: false,
      username: false,
      firstname: false,
      lastname: false,
    }); // Reset empty fields
    setResetPage("");
    setLogInDisplay(styles.display);
    setRegInDisplay(styles.display);
  }

  // page changing functions end here***
  // Handle form submission for login
  async function handleSubmitLogin(e) {
    setErrors(""); // Reset errors before submission
    setEmptyFields({
      email: false,
      password: false,
      username: false,
      firstname: false,
      lastname: false,
    });

    e.preventDefault();

    // Get values from input fields
    const email = emailDom1.current.value.trim();
    const password = passwordDom1.current.value.trim();

    // Check for empty fields
    const newEmptyFields = {};
    if (!email) newEmptyFields.email = true;
    if (!password) newEmptyFields.password = true;

    if (Object.keys(newEmptyFields).length > 0) {
      setEmptyFields(newEmptyFields);
      setErrors("All fields are required.");

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
      const res = await axiosInstance.post("/users/login", {
        email,
        password,
      });

      alert("Login successful!");

      localStorage.setItem("token", res.data.token); // Store token in localStorage

      localStorage.setItem("user", JSON.stringify(res.data.user)); // Store user info in localStorage

      // navigate("/"); // Redirect to home page after successful login
      window.location.reload(); // Reload the page to reflect the logged-in state I'll remove this later

      console.log(res?.data?.token);
    } catch (error) {
      alert(
        error?.response?.data?.msg || "Error during login. Please try again."
      );
      console.error("Error during Login:", error.response);
      setErrors(
        error?.response?.data?.msg || "An error occurred. Please try again."
      );
    }
  }

  // Handle form submission for registration
  async function handleSubmitSignUp(e) {
    setErrors(""); // Reset errors before submission
    setEmptyFields({
      email: false,
      password: false,
      username: false,
      firstname: false,
      lastname: false,
    });

    e.preventDefault();
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
      setErrors("All fields are required.");

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
      await axiosInstance.post("/users/register", {
        username,
        firstname,
        lastname,
        email,
        password,
      });

      alert("Registration successful! You can now log in.");
      // navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      alert("Error during sign up. Please try again.");
      console.error("Error during sign up:", error.response);
      setErrors(
        error?.response?.data?.msg || "An error occurred. Please try again."
      );
    }
  }

  return (
    <section className={styles.main__bg}>
      <div className={styles.loginLayout}>
        {/* Left side */}
        <div className={styles.left_side}>
          {/* register form */}
          <div className={regInDisplay}>
            <h3 className={styles.join_net}>Join the network</h3>

            <p className={styles.alrdy}>
              Already have an account?{" "}
              <Link to="" onClick={() => loginPage()}>
                Sign in
              </Link>
            </p>

            <form>
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
                I agree to the <Link to="#">privacy policy</Link> and{" "}
                <Link to="#">terms of service</Link>.
              </p>

              <button
                id={styles.agree_but}
                className={`${styles.butn_login} butn_login`}
                type="submit"
                onClick={handleSubmitSignUp}
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
        </div>
      </div>
    </section>
  );
}

export default LoginPage;

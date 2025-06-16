import { useRef, useState } from 'react';
import styles from '../../pages/Auth/Auth.module.css';
import axiosInstance from '../../Api/axiosConfig';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

function Reset({
  setErrors,
  setEmptyFields,
  setResetPage,
  resetPage,
  setLogInDisplay,
  emptyFields,
  loginPage,
  registerPage
}) {
  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Ref for email input field in reset form
  const emailDom3 = useRef(null);

  const passwordDom3 = useRef();

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
      toast.error('Please fill in all fields.');
      setTimeout(() => setEmptyFields({ email: false, password: false }), 2000);
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters.');
      setErrors('Password must be at least 8 characters.');
      setEmptyFields({ password: true });
      setTimeout(() => setEmptyFields({ password: false }), 2000);
      return;
    }

    try {
      setIsLoading(true);
      await axiosInstance.post('/users/reset-password', {
        email,
        newPassword: password,
      });
      toast.success('Password reset successfully. You can now log in.');
      setIsLoading(false);
      setResetPage(styles.display); // hide reset page
      setLogInDisplay(''); // show login page
    } catch (error) {
      console.error('Password reset error:', error);
      setErrors(
        error?.response?.data?.msg || 'Error resetting password. Try again.'
      );
      setIsLoading(false);
    }
  }

  return (
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
            emptyFields.email ? styles.error_bg : ''
          }`}
          onChange={() => setEmptyFields((prev) => ({ ...prev, email: false }))}
          name="emailaddress"
          placeholder="Email address"
        />

        <div className={styles.resetPassInput}>
          <input
            ref={passwordDom3}
            type={showPassword ? 'text' : 'password'}
            className={`${styles.email_input} ${
              emptyFields.password ? styles.error_bg : ''
            }`}
            onChange={() =>
              setEmptyFields((prev) => ({ ...prev, password: false }))
            }
            name="newpassword"
            placeholder="New password"
          />
          <div
            className={styles.resetPassShow}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEye color="gray" />
            ) : (
              <FaEyeSlash color="gray" />
            )}
          </div>
        </div>

        <button className={`${styles.butn_login} butn_login`} type="submit">
          {isLoading ? <ClipLoader color='#fff'  /> : 'Reset your password'}
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
  );
}

export default Reset;

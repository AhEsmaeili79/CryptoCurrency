import React, { useState, useEffect } from "react";
import styles from "../assets/css/AuthPage.module.css"; // Import as a module
import { signupUser, loginUser } from "../api/authApi"; // Import the API calls
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AuthPage: React.FC = () => {
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle signup form submission
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { username, email, password } = formData;
      const user = await signupUser(username, email, password);
      setErrorMessage(user.detail); // Set the success message or error detail
      // On successful signup, show the login section
      setIsLoginActive(true);
      const wrapper = document.querySelector(`.${styles.wrapper}`);
      wrapper?.classList.add(styles.active); // Add the 'active' class to transition to login form
    } catch (error: any) {
      setErrorMessage(error.message || "دوباره امتحان کنید!");
    }
  };
  
  

  // Handle login form submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      const response = await loginUser(email, password);
      setErrorMessage(response.detail); // Set the success message or error detail
      // Store the token and redirect user
      localStorage.setItem("access_token", response.access_token);

      navigate("/");
    } catch (error: any) {
      setErrorMessage(error.message || "دوباره امتحان کنید!");
    }
  };

  // Toggle between login and signup forms
  useEffect(() => {
    const wrapper = document.querySelector(`.${styles.wrapper}`);
    const signupHeader = document.querySelector(`.${styles.signup} header`);
    const loginHeader = document.querySelector(`.${styles.login} header`);

    const handleLoginClick = () => {
      if (wrapper) {
        wrapper.classList.add(styles.active);
        setIsLoginActive(true);
      }
    };

    const handleSignupClick = () => {
      if (wrapper) {
        wrapper.classList.remove(styles.active);
        setIsLoginActive(false);
      }
    };

    loginHeader?.addEventListener("click", handleLoginClick);
    signupHeader?.addEventListener("click", handleSignupClick);

    // Cleanup event listeners
    return () => {
      loginHeader?.removeEventListener("click", handleLoginClick);
      signupHeader?.removeEventListener("click", handleSignupClick);
    };
  }, []);

  return (
    <div className={styles.authform}>
    <section className={styles.wrapper}>
      {/* Signup Form */}
      <div className={`${styles.form} ${styles.signup}`}>
        <header>ثبت نام</header>
        <form onSubmit={handleSignupSubmit}>
          <input
            type="text"
            placeholder="نام کاربری"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            placeholder="ایمیل"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            placeholder="رمزعبور"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <div className={styles.checkbox}>
            <input type="checkbox" id="signupCheck" />
            <label htmlFor="signupCheck">همه قوانین و مقررات را می پذیرم.</label>
          </div>
          <input type="submit" value="ثبت نام" />
        </form>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </div>

      {/* Login Form */}
      <div className={`${styles.form} ${styles.login}`}>
        <header>ورود</header>
        <form onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="ایمیل"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            placeholder="رمزعبور"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <a href="#">رمزعبور را فراموش کرده اید؟</a>
          <input type="submit" value="ورود" />
        </form>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </div>

    </section>
    </div>
  );
};

export default AuthPage;

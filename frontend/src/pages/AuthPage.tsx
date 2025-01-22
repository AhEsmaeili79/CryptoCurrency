import React, { useState, useEffect } from "react";
import styles from "@assets/css/AuthPage.module.css"; 
import { signupUser, loginUser } from "@api/authApi"; 
import { useNavigate } from "react-router-dom"; 
import { FiEye, FiEyeOff } from "react-icons/fi"; 

const AuthPage: React.FC = () => {
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { username, email, password } = formData;
      const user = await signupUser(username, email, password);
      setErrorMessage(""); 
      setIsLoginActive(true);
      const wrapper = document.querySelector(`.${styles.wrapper}`);
      wrapper?.classList.add(styles.active); 
    } catch (error: any) {
      setErrorMessage(error.message || "دوباره امتحان کنید!");
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { username, password } = formData;
      const response = await loginUser(username, password);
      setErrorMessage(""); 
      localStorage.setItem("access_token", response.access); 

      navigate("/"); 
    } catch (error: any) {
      setErrorMessage(error.message || "دوباره امتحان کنید!");
    }
  };

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
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="رمزعبور"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                className={styles.eyeIcon}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
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
              type="username"
              placeholder="نام کاربری"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="رمزعبور"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                className={styles.eyeIcon}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
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

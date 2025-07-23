import styles from './Login.module.css';
import loginImage from '../images/loginImage.jpg';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate , Link } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_URL;
export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
    async function handleSubmit(event) {
        event.preventDefault(); 
        try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        username,
        password
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', username);
      console.log("Login successful", res.data);
      setMessage('Login successful!');
      onLogin(); 
      navigate('/notes');
    } catch (err) {
      setMessage("Invalid credentials. Redirecting to Sign Up...");
      setTimeout(() => {
      navigate('/signup');
      }, 1000);
    } 
  }
  return (
    <div className={styles["login-page"]}>
      <div className={styles["login-wrapper"]}>
      <div className={styles["login-container"]}>
      <h2>Welcome Back</h2>
      <h5>Sign in to continue!</h5>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" id="username" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input type="password"name="password" id="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
        <div className={styles["password-reset"]}>
            <div className={styles['remember-me']}>
                <input type="checkbox" id="rememberMe" />
                <label htmlFor="rememberMe">Remember Me</label>
            </div>
            <p className={styles["forgot-password"]}>
              <a href="/reset-password">Forgot Password?</a>
              </p>
        </div>
        <button type="submit">Sign In</button>
        {message && <p className={styles["login-message"]}>{message}</p>}
        <div className={styles["register-link"]}>
            <p className={styles["register-text"]}>Dont have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
      </form>
    </div>
    <div className={styles["login-image"]}>
      <img src={loginImage} alt="Login" />
      </div>
    </div>
    </div>
  );
}
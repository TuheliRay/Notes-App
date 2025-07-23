import styles from "./SignUp.module.css";  
import signupImage from "../images/signupImage.jpg";
import { useState } from "react";
import axios from "axios";
import { Link , useNavigate} from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_URL;
export default function SignUp(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    async function handleRegister(event) {
        event.preventDefault();
         if (password !== confirmPassword) {
           setMessage('Passwords do not match');
           return;
  }
        try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/signup`, {
        username,
        email,
        password
      });

      setMessage(res.data.msg);
      if (res.data.msg === 'Signup successful') {
        navigate('/login');
      }
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Something went wrong.');
    }
    }
    return(
        <div className={styles["signup-page"]}>
            <div className={styles["signup-wrapper"]}>
             <div className={styles["signup-container"]}>
            <div className={styles["signup-header"]}>
                <h2>Create an Account</h2>
                <h5>Let's get you started!</h5>
            </div>
            <div className={styles["signup-form"]}>
                <form onSubmit={handleRegister}>
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    <button type="submit">Sign Up</button>
                </form>
                {message && <p className={styles["signup-message"]}>{message}</p>}
                <div className={styles["login-link"]}>
                    <p className={styles["login-text"]}>Already have an account? <Link to="/login">Sign In</Link></p>
                </div>
            </div>
        </div>
        <div className={styles["signup-image"]}>
            <img src={signupImage} alt="Sign Up" />
            </div>
        </div>
        </div>
       
    )
}
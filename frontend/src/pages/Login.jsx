import { useState } from "react";
import { Link } from "react-router-dom";
import "../static/Auth.css";
import emailIcon from "../assets/mail.png";
import passwordIcon from "../assets/key.png";
import logoAndText from "../assets/logoAndText.png";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    // Handle sign in logic here
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="login-form-container">
      <img src={logoAndText} alt="Logo" className="logo" />
      <form onSubmit={handleSignIn}>
        <h1 className="title">Sign In</h1>

        <div className="form-group">
          <div className="input-icon-container">
            <img src={emailIcon} alt="Email" className="icon" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-icon-container">
            <img src={passwordIcon} alt="Password" className="icon" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
        </div>
        <Link to="/signup">Forgot Password?</Link>

        <button className="login-button" type="submit">
          Sign In
        </button>
      </form>
      <div className="login-links">
        <p>Don&apos;t have an account yet? </p>
        <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
}

export default Login;

import { useState } from "react";
import { Link } from "react-router-dom";
import "../static/Auth.css";
import emailIcon from "../assets/mail.png";
import passwordIcon from "../assets/key.png";
import logoAndText from "../assets/logoAndText.png";
import userIcon from "../assets/user.png";
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    // Updated log to include agreeToTerms
    console.log(
      "Full Name:",
      fullName,
      "Email:",
      email,
      "Password:",
      password,
      "Confirm Password:",
      confirmPassword,
      "Agreed to Terms:",
      agreeToTerms
    );
    // Handle sign up logic here
  };

  return (
    <div className="login-form-container">
      <img src={logoAndText} alt="Logo" className="logo" />
      <h1 className="title">Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <div className="input-icon-container">
            <img src={userIcon} alt="Name" className="icon" />
            <input
              type="text"
              id="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              required
            />
          </div>
        </div>
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
        <div className="form-group">
          <div className="input-icon-container">
            <img src={passwordIcon} alt="Password" className="icon" />
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
          </div>
        </div>
        <label>
          <input
            className="terms"
            type="checkbox"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
          />
          Agree with <strong>Terms and Conditions</strong>
        </label>
        <button className="signup-button" type="submit">
          Sign Up
        </button>
      </form>
      <div className="login-links">
        <p>Already have an account? </p>
        <Link to="/login">Log in</Link>
      </div>
    </div>
  );
}

export default Signup;

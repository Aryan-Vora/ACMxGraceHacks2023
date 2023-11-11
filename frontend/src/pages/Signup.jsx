import { useState } from "react";
import { Link } from "react-router-dom";
import "../static/Auth.css";
import emailIcon from "../assets/mail.png";
import passwordIcon from "../assets/key.png";
import logo from "../assets/logo.png";
import userIcon from "../assets/user.png";
import { createClient } from "@supabase/supabase-js";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  //supabase auth
  const supabaseUrl = "https://qkmpjjcwnfeizdxapuin.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrbXBqamN3bmZlaXpkeGFwdWluIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk2NDY2NjAsImV4cCI6MjAxNTIyMjY2MH0.UjBM9rlwJdiPdJOR1CGUVU67wBcAVzwWHqL0-mFCjsg";
  const supabase = createClient(supabaseUrl, supabaseKey);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return; // Stop the form submission
    }
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
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        data: {
          name: fullName,
        },
      });
      if (error) throw error;
      alert("Check your email for verification link");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="background">
      <div className="signup-form-container">
        <img src={logo} alt="Logo" className="signup-logo" />
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
    </div>
  );
}

export default Signup;

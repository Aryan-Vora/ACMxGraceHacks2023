import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../static/Auth.css";
import emailIcon from "../assets/mail.png";
import passwordIcon from "../assets/key.png";
import logoAndText from "../assets/LogoAndText.png";
import { createClient } from "@supabase/supabase-js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //supabase auth
  const supabaseUrl = "https://qkmpjjcwnfeizdxapuin.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrbXBqamN3bmZlaXpkeGFwdWluIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk2NDY2NjAsImV4cCI6MjAxNTIyMjY2MH0.UjBM9rlwJdiPdJOR1CGUVU67wBcAVzwWHqL0-mFCjsg";
  const supabase = createClient(supabaseUrl, supabaseKey);

  const handleSignIn = async (e) => {
    e.preventDefault();

    //handle log in auth:
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw error;
      console.log(data);
      navigate("/dashboard");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="background">
      <div className="login-form-container">
        <img src={logoAndText} alt="Logo" className="login-logo" />
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

          <button className="signup-button" type="submit">
            Sign In
          </button>
        </form>
        <div className="login-links">
          <p className="acc">Don&apos;t have an account yet? </p>
          <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

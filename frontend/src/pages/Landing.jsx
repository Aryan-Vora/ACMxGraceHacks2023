import "../static/Landing.css";
import { Link } from "react-router-dom";
import LogoAndText from "../assets/LogoAndText.png";
import Robo from "../assets/robo.png";
import Scan from "../assets/scan.png";
import HealthHands from "../assets/healthhands.png";
import Files from "../assets/files.png";
import downarrow from "../assets/downarrow.png";
function Landing() {
  return (
    <div className="background-bottom">
      <img className="logo" src={LogoAndText} alt="Logo"></img>
      <div className="features">
        <div className="feature-item">
          <img src={Files} alt="Files"></img>
          <h2 className="feature-text">Upload Health Data</h2>
        </div>
        <div className="feature-arrow">
          <img src={downarrow} alt="Down Arrow"></img>
        </div>
        <div className="feature-item">
          <img src={Scan} alt="Scan"></img>
          <h2 className="feature-text">Scan Medications</h2>
        </div>
        <div className="feature-arrow">
          <img src={downarrow} alt="Down Arrow"></img>
        </div>
        <div className="feature-item">
          <img src={HealthHands} alt="Health Hands"></img>
          <h2 className="feature-text">Receive Insights</h2>
        </div>
        <div className="feature-arrow">
          <img src={downarrow} alt="Down Arrow"></img>
        </div>
        <div className="feature-item">
          <img src={Robo} alt="Robo"></img>
          <h2 className="feature-text">Powered by AI</h2>
        </div>
        <div className="feature-arrow">
          <img src={downarrow} alt="Down Arrow"></img>
        </div>
      </div>
      <div className="get-started-container">
        <Link className="get-started" to="/login">
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default Landing;

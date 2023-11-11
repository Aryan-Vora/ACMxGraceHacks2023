import "../static/Dashboard.css";
import { Link } from "react-router-dom";
import LogoAndText from "../assets/LogoAndText.png";
function Dashboard() {
  return (
    <div className="background">
      <div class="logo">
        <img src={LogoAndText} alt="Logo"></img>
      </div>

      <div className="dash-container">
        <h1 className="dash-subtitle">Welcome</h1>
        <p className="dash-summary">
          Enter your information to understand what medicine you take
        </p>

        <Link className="dash-buttons" to="/upload-ehr">
          Upload Medical Info
        </Link>
        <Link className="dash-buttons2" to="/login">
          Logout
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;

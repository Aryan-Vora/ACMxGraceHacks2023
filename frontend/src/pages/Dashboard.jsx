import "../static/Dashboard.css";
import { Link } from "react-router-dom";
function Dashboard() {
  return (
    <div className="background">
      <h1 className="dash-title">Dashboard</h1>
      <div className="dash-container">
        <h1 className="dash-subtitle">Hello Amritha P</h1>

        <Link className="dash-buttons" to="/upload-medication">
          Scan a Medication
        </Link>
        <Link className="dash-buttons" to="/upload-ehr">
          Update Medical Info
        </Link>
        <Link className="dash-buttons2" to="/login">
          Logout
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;

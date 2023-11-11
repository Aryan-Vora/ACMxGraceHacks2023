import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../static/FinalAnalysis.css";

function FinalAnalysis() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch the message from the backend when the component mounts
    // Add name as a parameter to the post request
    fetch("http://127.0.0.1:5000/result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filepath: "./ehr.pdf",
        ingredients: {
          metadata:
            "Extra Strength Tylenol PM Acetaminophen, Diphenhydramine HCl",
          ingredients_list:
            "Acetaminophen(500mg), Diphenhydramine Hci(25mg). Inactive Ingredients: Carnauba Wax, Crospovidone, Fd&C Blue 1 Aluminum Lake, Hypromellose, Magnesium Stearate, Microcrystalline Cellulose, Polyethylene Glycol, Polysorbate 80, Povidone, Pregelatinized Starch, Sodium Starch Glycolate, Stearic Acid, Titanium Dioxide",
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.human_response));
  }, []);
  const BackIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7"></path>
    </svg>
  );
  
  return (
    <div className="background">
<Link className="EHR-back-button" to="/dashboard">
  <BackIcon />
</Link>
      <h1 className="final-analysis-title">Final Analysis</h1>
      <div className="analysis-scrollable-container">
        {message.human_response}
      </div>
    </div>
  );
}

export default FinalAnalysis;

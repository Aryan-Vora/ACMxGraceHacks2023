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
        ingredients: '''{
        'metadata': 'Extra Strength Tylenol PM Acetaminophen, Diphenhydramine HCl',
        'ingredients_list': 'Acetaminophen(500mg), Diphenhydramine Hci(25mg). Inactive Ingredients: Carnauba Wax, Crospovidone, Fd&C Blue 1 Aluminum Lake, Hypromellose, Magnesium Stearate, Microcrystalline Cellulose, Polyethylene Glycol, Polysorbate 80, Povidone, Pregelatinized Starch, Sodium Starch Glycolate, Stearic Acid, Titanium Dioxide'
        }'''
      }),
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.human_response));
  }, []);
  return (
    <div>
      <h1>Final Analysis</h1>
      <p>Message from backend: {message}</p>
      <Link to="/">Go back Home</Link>
    </div>
  );
}

export default FinalAnalysis;

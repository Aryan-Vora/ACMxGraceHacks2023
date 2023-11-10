import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../static/Home.css";
function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch the message from the backend when the component mounts
    // Add name as a parameter to the post request
    fetch("api/hello", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "John" }),
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);
  return (
    <div>
      <h1>Home Page</h1>
      <p>Message from backend: {message}</p>
      <Link to="/">Go back Home</Link>
      <Link to="/upload-ehr">Upload EHR</Link>
      <Link to="/upload-medication">Upload Medication</Link>
      <Link to="/final-analysis">Final Analysis</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">signup</Link>
      <Link to="/example-ocr">Example OCR</Link>
    </div>
  );
}

export default Home;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../static/UploadEHR.css";

function UploadEHR() {
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
      <h1>Upload EHR Page</h1>
      <p>Message from backend: {message}</p>
      <Link to="/">Go back Home</Link>
    </div>
  );
}

export default UploadEHR;

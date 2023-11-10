import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../static/Home.css";
function ExampleOCR() {
  const [message, setMessage] = useState("");

  // Example call to backend OCR api
    useEffect(() => {
    fetch("api/ocr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // put URL or filepath of image you want to test here
      body: JSON.stringify({ url: "../ocr_test.png" }),
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.text)); // data.text is the text from the image
  }, []);

  return (
    <div>
      <h1>OCR example</h1>
      <p>OCR returned: {message}</p>
      <Link to="/">Go back Home</Link>
    </div>
  );
}

export default ExampleOCR;

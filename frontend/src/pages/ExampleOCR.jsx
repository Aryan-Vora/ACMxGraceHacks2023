import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function ExampleOCR() {
  const [message, setMessage] = useState("");
  const handleOCR = () => {
    fetch("api/ocr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // put URL or filepath of image you want to test here
      body: JSON.stringify({ fronturl: "../ADVIL_FRONT.png", backurl: "../ADVIL_BACK.png" }),
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.metadata + "\n" + data.ingredients_list)); // data.text is the text from the image
  };

  return (
    <div>
      <h1>OCR example</h1>
      <p>OCR returned: {message}</p>
      <button onClick={() => handleOCR()}>ocr</button>
      <Link to="/">Go back Home</Link>
    </div>
  );
}

export default ExampleOCR;

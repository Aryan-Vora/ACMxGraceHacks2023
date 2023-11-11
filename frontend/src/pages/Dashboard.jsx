import "../static/UploadEHR.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Logo and Title */}
      <div className="header">
        <img src="path-to-your-logo.png" alt="Logo" />
        <h1>Understand your Medicine</h1>
      </div>

      {/* Feature List */}
      <div className="features">
        {/* Repeat for each feature */}
        <div className="feature-item">
          <img src="path-to-icon.png" alt="Upload Icon" />
          <p>Upload Health Data</p>
        </div>
        {/* ... other features */}
      </div>

      {/* Call to Action Button */}
      <button className="get-started-btn" onClick={handleClick}>
        Get Started
      </button>
    </div>
  );
};

const handleClick = () => {
  // Implement what happens when the button is clicked
};

export default LandingPage;

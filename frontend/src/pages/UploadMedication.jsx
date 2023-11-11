import { useState } from "react";
import "../static/UploadMedication.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { Link } from "react-router-dom";
function UploadMedication() {
  // State to store the selected file and its data URL
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileDataUrl, setFileDataUrl] = useState("");
  // State to control the visibility of the confirmation modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // Handler for file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileDataUrl(reader.result); // Set the data URL
        setIsModalVisible(true); // Show the modal when a file is selected
      };
      reader.readAsDataURL(file);
      setSelectedFile(file); // Set selected file
    }
  };

  // ...

  const navigate = useNavigate(); // Hook to get navigate function

  // Handler for confirming file upload
  const handleConfirmUpload = () => {
    // Implement file upload logic here
    setIsModalVisible(false);
    navigate("/final-analysis");
  };

  // Handler for canceling file upload
  const handleCancelUpload = () => {
    setSelectedFile(null);
    setFileDataUrl("");
    setIsModalVisible(false);
  };
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
      <div className="upload-container">
        <h1 className="EHR-title">Upload Medication</h1>
        <div className="uploadEHR-container">
          <label htmlFor="file-upload" className="custom-file-upload">
            <div className="upload-icon"></div>
            <div className="filename">
              {selectedFile ? selectedFile.name : "Filename.jpeg/png"}
            </div>
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            style={{ display: "none" }} // Hide the actual file input
          />
        </div>
        <div className="filetype">Acceptable File Types: JPEG/PNG</div>

        {selectedFile && (
          <div className={`modal ${isModalVisible ? "visible" : ""}`}>
            <h2>Is this the correct file?</h2>

            <div className="modal-content">
              {fileDataUrl && (
                <div className="pdf-container">
                  <img src={fileDataUrl} alt="Uploaded File Preview"></img>{" "}
                  {/* Use fileDataUrl here */}
                </div>
              )}
            </div>
            <button className="cancel" onClick={handleCancelUpload}>
              Cancel
            </button>
            <button className="confirm" onClick={handleConfirmUpload}>
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadMedication;

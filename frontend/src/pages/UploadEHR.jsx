import { useState } from "react";
import "../static/UploadEHR.css";
import { pdfjs } from "react-pdf";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { Link } from "react-router-dom";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
import { Document, Page } from "react-pdf";
function UploadEHR() {
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
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        // Set the data URL to state
        setFileDataUrl(reader.result);
        setSelectedFile(file);
        setIsModalVisible(true); // Show the modal when a file is selected
      };
      reader.readAsDataURL(file);
    }
    console.log(selectedFile);
  };
  const navigate = useNavigate(); // Hook to get navigate function

  // Handler for confirming file upload
  const handleConfirmUpload = () => {
    // Implement file upload logic here
    setIsModalVisible(false);
    navigate("/upload-medication");
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
        <h1 className="EHR-title">Upload Medical Records</h1>
        <div className="uploadEHR-container">
          <label htmlFor="file-upload" className="custom-file-upload">
            <div className="upload-icon"></div>
            <div className="filename">
              {selectedFile ? selectedFile.name : "Filename.pdf"}
            </div>
          </label>
          <input
            id="file-upload"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            style={{ display: "none" }} // Hide the actual file input
          />
        </div>
        <div className="filetype">Acceptable File Types: PDF</div>

        {selectedFile && (
          <div className={`modal ${isModalVisible ? "visible" : ""}`}>
            <h2>Is this the correct file?</h2>

            <div className="modal-content">
              {fileDataUrl && (
                <div className="pdf-container">
                  <Document
                    file={selectedFile}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="pdf-document"
                  >
                    {Array.from(new Array(numPages), (el, index) => (
                      <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        scale={0.5}
                      />
                    ))}
                  </Document>
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

export default UploadEHR;

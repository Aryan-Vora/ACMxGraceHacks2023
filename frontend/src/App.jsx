import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UploadEHR from "./pages/UploadEHR";
import UploadMedication from "./pages/UploadMedication";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload-ehr" element={<UploadEHR />} />
        <Route path="/upload-medication" element={<UploadMedication />} />
      </Routes>
    </Router>
  );
}

export default App;

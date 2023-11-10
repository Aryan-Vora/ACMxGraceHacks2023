import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UploadEHR from "./pages/UploadEHR";
import UploadMedication from "./pages/UploadMedication";
import FinalAnalysis from "./pages/FinalAnalysis";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload-ehr" element={<UploadEHR />} />
        <Route path="/upload-medication" element={<UploadMedication />} />
        <Route path="/final-analysis" element={<FinalAnalysis />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;

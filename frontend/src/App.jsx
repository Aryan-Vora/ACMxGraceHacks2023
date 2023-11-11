import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UploadEHR from "./pages/UploadEHR";
import UploadMedication from "./pages/UploadMedication";
import FinalAnalysis from "./pages/FinalAnalysis";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import ExampleOCR from "./pages/ExampleOCR";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/map" element={<Home />} />
        <Route path="/upload-ehr" element={<UploadEHR />} />
        <Route path="/upload-medication" element={<UploadMedication />} />
        <Route path="/final-analysis" element={<FinalAnalysis />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="exampleocr" element={<ExampleOCR />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;

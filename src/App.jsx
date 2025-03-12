import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './page/home/Home'
import JobDiscrip from './page/jobDiscrip/JobDiscrip'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job" element={<JobDiscrip />} />
      </Routes>
    </Router>
  )
}

export default App

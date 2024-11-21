import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import { Home } from "./components/Home";
import LoginAdmin from "./components/LoginAdmin";
import { Docs } from "./components/docs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard/>} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard/>} />
        <Route path="/docs" element={<Docs/>} />
      </Routes>
    </Router>
  );
}

export default App;

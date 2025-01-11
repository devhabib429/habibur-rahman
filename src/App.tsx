import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProjectForm from "./pages/ProjectForm";
import Resources from "./pages/Resources";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";
import ERPNextUpdates from "./pages/ERPNextUpdates";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/project-form" element={<ProjectForm />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/erpnext-updates" element={<ERPNextUpdates />} />
      </Routes>
    </Router>
  );
}

export default App;
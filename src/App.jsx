import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Student from "./pages/Student";
import Trainer from "./pages/Trainer";
import Admin from "./pages/Admin";

function App() {
  const [role, setRole] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setRole={setRole} />} />

        <Route path="/student" element={
          <PrivateRoute role={role} allowedRole="student">
            <Student setRole={setRole} />
          </PrivateRoute>
        } />

        <Route path="/trainer" element={
          <PrivateRoute role={role} allowedRole="trainer">
            <Trainer setRole={setRole} />
          </PrivateRoute>
        } />

        <Route path="/admin" element={
          <PrivateRoute role={role} allowedRole="admin">
            <Admin setRole={setRole} />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;

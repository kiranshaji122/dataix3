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
      {role && (
        <button onClick={() => setRole(null)} style={{ margin: 10 }}>
          Logout
        </button>
      )}

      <Routes>
        <Route path="/" element={<Login setRole={setRole} />} />

        <Route
          path="/student"
          element={
            <PrivateRoute role={role} allowedRole="student">
              <Student />
            </PrivateRoute>
          }
        />

        <Route
          path="/trainer"
          element={
            <PrivateRoute role={role} allowedRole="trainer">
              <Trainer />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute role={role} allowedRole="admin">
              <Admin />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

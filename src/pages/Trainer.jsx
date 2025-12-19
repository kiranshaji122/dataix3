import React from "react";
import { dummyUsers } from "../data/users";

function Trainer() {
  const t = dummyUsers.trainer;

  return (
    <div style={{ padding: 30 }}>
      <h2>Trainer Dashboard</h2>
      <p><b>Name:</b> {t.name}</p>

      <h4>Courses Managed</h4>
      <ul>
        {t.courses.map((course, index) => (
          <li key={index}>{course}</li>
        ))}
      </ul>
    </div>
  );
}

export default Trainer;

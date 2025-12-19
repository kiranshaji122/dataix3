import React from "react";
import { dummyUsers } from "../data/users";

function Student() {
  const s = dummyUsers.student;

  return (
    <div style={{ padding: 30 }}>
      <h2>Student Dashboard</h2>
      <p><b>Name:</b> {s.name}</p>
      <p><b>Progress:</b> {s.progress}</p>

      <h4>Courses</h4>
      <ul>
        {s.courses.map((course, index) => (
          <li key={index}>{course}</li>
        ))}
      </ul>
    </div>
  );
}

export default Student;

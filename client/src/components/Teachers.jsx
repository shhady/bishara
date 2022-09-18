import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Teachers.css";
export default function Teachers() {
  const [teachers, setTeachers] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get("http://localhost:5000/teachers");
      setTeachers(result.data);
    };
    fetch();
  }, []);
  console.log(teachers);
  if (!teachers)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: "100px",
        }}
      >
        <div className="spinner">
          <div className="loader">
            <div className="balls_container">
              <div className="ball"></div>
              <div className="ball"></div>
              <div className="ball"></div>
            </div>
            <span>جاري تحميل البيانات</span>
          </div>
        </div>
      </div>
    );

  const drawData = () => {
    return teachers.map((teacher, i) => {
      return (
        <div className="teacher" key={i}>
          <div>
            <img
              src={teacher.avatar}
              alt={teacher.firstName}
              height="150px"
              width="150px"
            />
          </div>
          <div>
            {teacher.firstName} {teacher.lastName}
          </div>
          <div style={{ textAlign: "center" }}>{teacher.about}</div>
        </div>
      );
    });
  };

  return <div className="teachersCards">{drawData()}</div>;
}

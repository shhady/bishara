import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Teachers.css";
export default function Teachers({ user, setUser }) {
  const [teachers, setTeachers] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [chat, setChat] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    user.teacher ? setUserId(user.teacher._id) : setUserId(user.user._id);
  });
  useEffect(() => {
    setChat({
      senderId: userId,
      receiverId: selectedTeacher,
    });
  }, [selectedTeacher]);

  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get("http://localhost:5000/teachers");
      setTeachers(result.data);
    };
    fetch();
  }, []);
  useEffect(() => {
    const startChat = async () => {
      if (!selectedTeacher) return;
      await axios.post("http://localhost:5000/conversations", chat);
    };
    startChat();
  }, [chat]);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(teacher);
    setSelectedTeacher();

    // const teacher = teachers.filter((teacher) => teacher.id === e.target.value);
    // setSelectedTeacher(teacher);
  };
  console.log(selectedTeacher);

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
          <div>
            <button
              onClick={() => {
                setSelectedTeacher(teacher._id);
              }}
            >
              chat
            </button>
          </div>
        </div>
      );
    });
  };

  return <div className="teachersCards">{drawData()}</div>;
}

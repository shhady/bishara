import React, { useState } from "react";
import axios from "axios";
import FileBase from "react-file-base64";
import { useHistory } from "react-router-dom";
import "./styles.css";
export default function CreateTeacher() {
  // const [avatar, setAvatar] = useState("")
  const [teacher, setTeacher] = useState({
    firstName: "",
    lastName: "",
    instrument: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
    about: "",
  });

  const history = useHistory();
  console.log(teacher);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:5000/teachers`, teacher);
    history.push("/teachers");
  };

  const handleChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  // const handleAvatar = (e) => {
  //   const file = e.target.files[0];
  //   transformFile(file);
  // };

  // const transformFile = (file) => {
  //   const reader = new FileReader();
  //   if (file) {
  //     reader.readAsDataURL(file);
  //     reader.onloadend = () => {
  //       setTeacher({ ...teacher, avatar: reader.result });
  //     };
  //   } else {
  //     setTeacher({ ...teacher, avatar: "" });
  //   }
  // };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="formCreateTeacher">
          <input
            name="firstName"
            placeholder="firstName"
            required
            onChange={handleChange}
            style={{ textAlign: "center", width: "60%" }}
          />
          <input
            name="lastName"
            placeholder="lastName"
            required
            onChange={handleChange}
            style={{ textAlign: "center", width: "60%" }}
          />
          <input
            name="instrument"
            placeholder="instrument"
            required
            onChange={handleChange}
            style={{ textAlign: "center", width: "60%" }}
          />
          {/* <input name="image" type="file" required onChange={handleChange} /> */}
          <input
            name="email"
            placeholder="email"
            required
            onChange={handleChange}
            style={{ textAlign: "center", width: "60%" }}
          />
          <input
            name="password"
            placeholder="password"
            required
            onChange={handleChange}
            style={{ textAlign: "center", width: "60%" }}
          />
          <input
            name="confirmPassword"
            placeholder="confirmPassword"
            required
            onChange={handleChange}
            style={{ textAlign: "center", width: "60%" }}
          />
          <textarea
            name="about"
            placeholder="about"
            onChange={handleChange}
            style={{ marginTop: "20px", textAlign: "center", width: "60% " }}
          />
          {/* <input type="file" onChange={handleAvatar} /> */}
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setTeacher({ ...teacher, avatar: base64 })}
          />
          <input
            type="submit"
            style={{ textAlign: "center", width: "60%", marginBottom: "20px" }}
          />
        </div>
      </form>
    </div>
  );
}

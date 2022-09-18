import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function CreateCourse() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const [course, setCourse] = useState({
    instrument: "",
    firstName: "",
    lastName: "",
    avatar: "",
    level: "",
    // videos: [],
  });
  const history = useHistory();
  const firstName = useRef(user.teacher.firstName);
  const lastName = useRef(user.teacher.lastName);
  const avatar = useRef(user.teacher.avatar);

  console.log(firstName);
  console.log(course);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (isSignUp) {
    //   dispatch(signup(formData, history));
    // } else {
    //   dispatch(signin(formData, history));
    // }
    await axios.post(`http://localhost:5000/courses`, course, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
    });
    history.push("/courses");
  };
  useEffect(() => {
    setCourse({
      ...course,
      // [e.target.name]: e.target.value,
      firstName: firstName.current,
      lastName: lastName.current,
      // instrument: e.target.value,
      avatar: avatar.current,
      // level: e.target.value,
    });
  }, [course]);

  // const handleChangeVideos = (e) => {
  //   const files = Array.from(e.target.files);
  //   files.forEach((file) => {
  //     course.videos.push(file);
  //   });
  // };

  return (
    <div style={{ marginTop: "150px" }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          defaultValue={firstName.current}
          name="firstName"
          // onChange={handleChange}
        />
        <input
          type="text"
          defaultValue={user.teacher.lastName}
          name="lastName"
          // onChange={handleChange}
        />
        <select
          onChange={(e) => setCourse({ ...course, instrument: e.target.value })}
        >
          <option value=""> الآلة الموسيقية</option>
          <option value="piano">بيانو</option>
          <option value="oud">عود</option>
          <option value="violin">كمان</option>
          <option value="qanun">قانون</option>
        </select>
        <select
          onChange={(e) => setCourse({ ...course, level: e.target.value })}
        >
          <option value="">المستوى</option>
          <option value="beginner">مبتدأ</option>
          <option value="mid">متوسط</option>
          <option value="professional">متقدم</option>
        </select>
        {/* <input
          placeholder=" الآلة الموسيقية"
          name="instrument"
          // onChange={handleChange}
          autoFocus
          required
        /> */}
        {/*  <input
          placeholder="المستوى"
          name="level"
          onChange={handleChange}
          required
        /> */}
        {/* <input type="file" name="videos" onChange={handleChangeVideos} /> */}
        <input type="submit" />
      </form>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Posts/styles";
import { Link } from "react-router-dom";
export default function Post() {
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [posts, setposts] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get("http://localhost:5000/courses");
      setposts(result.data);
    };
    fetch();
  }, []);

  console.log(posts);
  if (!posts)
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

  const showData = () => {
    return posts.map((post) => {
      return (
        <div key={post._id} className="courseContainer">
          {post.firstName} {"  "}
          {post.lastName}
          <div>{post.instrument}</div>
          <div>{post.level}</div>
          <img
            src={post.avatar}
            alt={post.firstName}
            width="150"
            height="150"
            style={{ borderRadius: "50%" }}
          />
        </div>
      );
    });
  };
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          marginTop: "150px",
          // textAlign: "center",
        }}
      >
        <Link to="/Piano">
          <div
            style={{
              border: "1px solid gray",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1579685055980-48dd748d862e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80"
              alt="piano"
              width="50px"
              height="50px"
              style={{ borderRadius: "50%" }}
            />
            بيانو
          </div>
        </Link>
        <Link to="/Oud">
          <div
            style={{
              border: "1px solid gray",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1593550573849-1d608bb469ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"
              alt="piano"
              width="50px"
              height="50px"
              style={{ borderRadius: "50%" }}
            />
            عود
          </div>
        </Link>
        <Link>
          <div
            style={{
              border: "1px solid gray",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1460036521480-ff49c08c2781?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dmlvbGlufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
              alt="piano"
              width="50px"
              height="50px"
              style={{ borderRadius: "50%" }}
            />
            كمان
          </div>
        </Link>
        <Link>
          <div
            style={{
              border: "1px solid gray",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1579685055980-48dd748d862e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80"
              alt="piano"
              width="50px"
              height="50px"
              style={{ borderRadius: "50%" }}
            />
            قانون
          </div>
        </Link>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        {showData()}
      </div>
    </>
  );
}

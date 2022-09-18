import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

export default function Profile({ user, setUser }) {
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogoutFromAllDevices = async () => {
    const response = await axios.post(
      `http://localhost:5000/teachers/logoutAll`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: window.localStorage.getItem("token"),
        },
      }
    );

    if (response.status === 200) {
      // REMOVE TOKEN
      window.localStorage.removeItem("token");
    }

    // localStorage.removeItem("profile");
    // await axios.post("http://localhost:5000/users/logoutAll");
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser(null);
  };

  const handleUserLogoutFromAllDevices = async () => {
    const response = await axios.post(
      `http://localhost:5000/users/logoutAll`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: window.localStorage.getItem("token"),
        },
      }
    );

    if (response.status === 200) {
      // REMOVE TOKEN
      window.localStorage.removeItem("token");
    }

    // localStorage.removeItem("profile");
    // await axios.post("http://localhost:5000/users/logoutAll");
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser(null);
  };

  const goToCreateCourse = () => {
    history.push("/createCourse");
  };
  const gotohomepage = () => {
    history.push("/");
  };
  return (
    <div>
      {user ? (
        <div>
          {user.teacher ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "200px",
              }}
            >
              {" "}
              <img
                src={user.teacher.avatar}
                alt={user.teacher.firstName}
                width="150"
                height="150"
                style={{ borderRadius: "50%" }}
              />
              <h2>
                {user.teacher.firstName}
                {"  "}
                {user.teacher.lastName}
              </h2>
              {user.teacher.instrument}
              <button onClick={goToCreateCourse}>انشئ دورة</button>
              <button onClick={gotohomepage}>الصفحة الرئيسية</button>
              <button onClick={handleLogoutFromAllDevices}>
                خروج من جميع الاجهزة
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "200px",
              }}
            >
              <h2>
                {user.user.firstName}
                {"  "}
                {user.user.lastName}
              </h2>
              <button onClick={handleUserLogoutFromAllDevices}>
                خروج من جميع الاجهزة
              </button>

              <button onClick={gotohomepage}>الصفحة الرئيسية</button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

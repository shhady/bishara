import React, { useState } from "react";
import "./Header.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import {
  faUser,
  faBars,
  faMessage,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
export default function Header({ user, setUser }) {
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const [openMenu, setOpenMenu] = useState(false);
  // const location = useLocation();
  console.log(user);

  // useEffect(() => {
  //   const token = user?.token;
  //   setUser(JSON.parse(localStorage.getItem("profile")));
  // }, [location]);

  const handleLogoutTeacher = async () => {
    const response = await axios.post(
      `http://localhost:5000/teachers/logout`,
      {},
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      }
    );

    if (response.status === 200) {
      // REMOVE TOKEN
      window.localStorage.removeItem("token");
    }

    // localStorage.removeItem("profile");
    // await axios.post("http://localhost:5000/teachers/logoutAll");
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser(null);
  };

  const handleLogoutStudent = async () => {
    const response = await axios.post(
      `http://localhost:5000/users/logout`,
      {},
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
      }
    );

    if (response.status === 200) {
      // REMOVE TOKEN
      window.localStorage.removeItem("token");
    }

    // localStorage.removeItem("profile");
    // await axios.post("http://localhost:5000/teachers/logoutAll");
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser(null);
  };

  return (
    <div>
      <div className="header">
        <div className="middle">
          {user ? (
            <div>
              {user.teacher ? (
                <Link to="/profile" style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={user.teacher.avatar}
                      alt={user.teacher.firstName}
                      style={{
                        height: "40px",
                        width: "40px",
                        borderRadius: "50%",
                        marginLeft: "10px",
                        marginRight: "10px",
                      }}
                    />
                    {user.teacher.firstName} {user.teacher.lastName}
                  </div>
                </Link>
              ) : (
                <Link to="/profile" style={{ textDecoration: "none" }}>
                  <>
                    <FontAwesomeIcon icon={faUser} /> {user.user.firstName}{" "}
                    {user.user.lastName}
                  </>
                </Link>
              )}
            </div>
          ) : (
            <div style={{ visibility: "hidden" }}>X</div>
          )}

          <div>
            <Link to="/">
              <img src="Logonew.png" alt="logo" className="logoImage" />
            </Link>
          </div>

          {user ? (
            <div
              className="auth"
              style={{
                border: "none",
                height: "100%",
                display: "flex",
              }}
            >
              <Link to="/profile">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* <h4>
                    {user.teacher ? user.teacher.lastName : user.user.lastName}
                  </h4> */}
                  {/* <h4 style={{ marginRight: "5px" }}>
                    {user.teacher
                      ? user.teacher.firstName
                      : user.user.firstName}
                  </h4> */}
                  {"  "}
                  {/* {user.teacher ? (
                    <img
                      src={user.teacher ? user.teacher.avatar : "profile.jpg"}
                      alt={user.teacher?.image}
                      style={{
                        height: "40px",
                        borderRadius: "50%",
                        marginLeft: "10px",
                        marginRight: "10px",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        margin: "3px",
                        padding: "3px",
                        borderRadius: "50%",
                        border: "1px solid gray",
                      }}
                    >
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                  )} */}
                </div>
              </Link>
              {user.teacher ? (
                // <div
                //   style={{
                //     display: "flex",
                //     alignItems: "center",
                //     justifyContent: "center",
                //   }}
                // >
                //   <button
                //     onClick={handleLogoutTeacher}
                //     style={{
                //       border: "none",
                //       width: "10rem",
                //       cursor: "pointer",
                //     }}
                //   >
                //     خروج
                //   </button>
                <div
                  style={{
                    display: "flex",
                    // flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    // border: "1px solid gray",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                >
                  <div
                    onClick={handleLogoutTeacher}
                    style={{
                      display: "flex",
                      // border: "1px solid gray",
                      borderRadius: "10px",
                      height: "30px",
                      padding: "3px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: "2px",
                      }}
                    >
                      <FontAwesomeIcon icon={faArrowRightFromBracket} />{" "}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      خروج
                    </div>
                  </div>

                  {user?.teacher?.role === "admin" ? (
                    <Link to="/CreateTeacher">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          marginRight: "10px",
                          background: "#cdcaca",
                          cursor: "pointer",
                        }}
                      >
                        تسجيل معلمين
                      </div>
                      {/* <button
                        style={{
                          border: "none",
                          width: "10rem",
                          cursor: "pointer",
                        }}
                      >
                        تسجيل معلمين
                      </button> */}
                    </Link>
                  ) : null}
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    // border: "1px solid gray",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                >
                  <div
                    onClick={handleLogoutStudent}
                    style={{
                      display: "flex",
                      // border: "1px solid gray",
                      borderRadius: "10px",
                      height: "30px",
                      padding: "3px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: "2px",
                      }}
                    >
                      {" "}
                      <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      خروج
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div
              className="auth"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link to="/auth" style={{ textDecoration: "none" }}>
                <div
                  style={{
                    display: "flex",
                    border: "1px solid gray",
                    borderRadius: "10px",
                    height: "30px",
                    padding: "3px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft: "3px",
                    }}
                  >
                    <FontAwesomeIcon icon={faArrowRightToBracket} />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    تسجيل الدخول
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {/* <div></div>
          <div className="menuMobile">
            {" "}
            <FontAwesomeIcon icon={faBars} />
            القائمة
          </div> */}
        </div>
        <div className="header-down">
          <div className="Menu-message">
            <div></div>
            <div
              className="menuMobile"
              style={{
                // textAlign: "center",
                border: "1px solid gray",
                padding: "2px",
              }}
              onClick={() => setOpenMenu(!openMenu)}
            >
              {!openMenu ? <FontAwesomeIcon icon={faBars} /> : "X اغلاق"}{" "}
            </div>
          </div>
          <div className="menu-details-computer">
            <Link to="/teachers" style={{ textDecoration: "none" }}>
              <div>
                <h3 className="headeroud">المدرسين</h3>
              </div>
            </Link>
            <Link to="/courses" style={{ textDecoration: "none" }}>
              <div>
                <h3 className="headeroud">الدورات الموسيقية</h3>
              </div>
            </Link>
            <Link to="Piano" style={{ textDecoration: "none" }}>
              <div>
                <h3 className="headerpiano">نوتات موسيقية</h3>
              </div>
            </Link>
            <Link to="" style={{ textDecoration: "none" }}>
              <div>
                <h3 className="headerpiano">الاشتراك </h3>
              </div>
            </Link>
          </div>
          <div style={{ padding: "2px", border: "1px solid white" }}>
            <FontAwesomeIcon icon={faMessage} />
          </div>
          <div style={{ padding: "2px", border: "1px solid white" }}>
            <FontAwesomeIcon icon={faBell} />
          </div>
          {openMenu && (
            <div className="menu-details">
              <Link to="/" style={{ textDecoration: "none" }}>
                <div onClick={() => setOpenMenu(!openMenu)}>
                  <h3 className="headeroud">الرئيسية</h3>
                </div>
              </Link>
              <Link to="/teachers" style={{ textDecoration: "none" }}>
                <div onClick={() => setOpenMenu(!openMenu)}>
                  <h3 className="headeroud">المدرسين</h3>
                </div>
              </Link>
              <Link to="/courses" style={{ textDecoration: "none" }}>
                <div onClick={() => setOpenMenu(!openMenu)}>
                  <h3 className="headeroud">الدورات الموسيقية</h3>
                </div>
              </Link>
              <Link to="Piano" style={{ textDecoration: "none" }}>
                <div onClick={() => setOpenMenu(!openMenu)}>
                  <h3 className="headerpiano">نوتات موسيقية</h3>
                </div>
              </Link>
              <Link to="" style={{ textDecoration: "none" }}>
                <div onClick={() => setOpenMenu(!openMenu)}>
                  <h3 className="headerpiano">الاشتراك </h3>
                </div>
              </Link>
            </div>
          )}
          {/* <div className="menuMobile">
            {" "}
            <FontAwesomeIcon icon={faBars} />
            القائمة
          </div> */}
        </div>
      </div>
    </div>
  );
}

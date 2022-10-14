import React, { useState, useEffect } from "react";
import axios from "axios";
export default function StudentsPractices({ user }) {
  const [allPracrices, setAllPracrices] = useState([]);
  const [teacherPractices, setTeacherPractices] = useState([]);
  const [userId, setUserId] = useState(null);
  const [reply, setReply] = useState("");
  const [myReply, setMyReply] = useState("");
  const [showReply, setShowReply] = useState(null);

  useEffect(() => {
    const userid = user.user ? user.user._id : user.teacher._id;
    setUserId(userid);
  }, [user]);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        process.env.REACT_APP_BACKEND_URL + `/practices`
      );
      setAllPracrices(res.data);
    };
    fetch();
  }, []);

  useEffect(() => {
    const res = allPracrices.filter(
      (practice) => practice.teacherId === userId
    );
    setTeacherPractices(res);
  }, [allPracrices]);

  console.log(teacherPractices);

  const handleReply = (e) => {
    setReply(e.target.value);
  };
  useEffect(() => {
    setMyReply(reply);
  }, [reply]);

  const addTeacherReply = (practice) => {
    const addReply = async () => {
      await axios.patch(
        process.env.REACT_APP_BACKEND_URL + `/practices/${practice._id}`,
        {
          reply: myReply,
        }
      );
    };
    addReply();
    setShowReply(myReply);
  };
  console.log(myReply);
  console.log(showReply);
  const showData = () => {
    return teacherPractices?.map((practice) => {
      return (
        <div
          style={{ borderRight: "1px solid black", padding: "10px" }}
          key={practice._id}
        >
          <div>
            الطالب:
            {practice.studentFirstName} {practice.studentLastName}
          </div>
          <div>
            {" "}
            الدورة:
            {practice.courseName}, {practice.courseLevel}
          </div>
          <div>
            الدرس:
            {practice.video}
            <br />
            التمرين:
          </div>
          <div>
            <div>
              <video
                key={practice.myPractice}
                controls
                style={{ width: "100%", height: "250px" }}
              >
                <source src={practice.myPractice} type="video/mp4" />
              </video>
            </div>
            <div>
              {practice.reply ? (
                <div>
                  <div>{practice.reply}</div>
                  <button onClick={() => setShowReply(null)}>تعديل</button>
                </div>
              ) : (
                <div>
                  {showReply === myReply ? (
                    <div>
                      <div>
                        <div>
                          {myReply ? (
                            <div>{myReply}</div>
                          ) : (
                            <div>{practice.reply}</div>
                          )}
                        </div>
                        <button onClick={() => setShowReply(null)}>
                          تعديل
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <textarea
                        name="reply"
                        onChange={handleReply}
                        placeholder="Reply"
                        value={myReply}
                        style={{ height: "70%", width: "100%" }}
                      />
                      <button onClick={() => addTeacherReply(practice)}>
                        تثبيت
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div style={{ padding: "30px" }}>
              <div> تعليق المعلم:</div>

              {/* <div>{practice.reply}</div> */}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div
      style={{
        marginTop: "150px",
      }}
    >
      <div>
        <h2 style={{ textAlign: "center" }}>تمارين الطلاب</h2>
      </div>
      <div>{showData()}</div>
    </div>
  );
}

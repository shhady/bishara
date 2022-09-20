import React, { useState, useEffect, useRef } from "react";
import "./messenger.css";
import Conversation from "../Conversations/Conversation";
import Message from "../Message/Message";
import axios from "axios";
import { io } from "socket.io-client";
export default function Messenger({ user, setUser }) {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const [userAvatar, setUserAvatar] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();
  const socket = useRef();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        // createdAt: Date.now(),
      });
    });
  }, [userId]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat, userId]);

  useEffect(() => {
    user.teacher
      ? setUserAvatar(user.teacher.avatar)
      : setUserAvatar("./Logo.JPG");
    user.teacher ? setUserId(user.teacher._id) : setUserId(user.user._id);
  }, [user.teacher, user.user]);
  console.log(userId);
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/conversations/` + userId
        );
        if (!res) return null;
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [userId]);
  useEffect(() => {
    socket.current.emit(
      "addUser",
      user.teacher ? user.teacher._id : user.user._id
    );
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user.teacher, user.user]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/messages/" + currentChat?._id
        );
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: userId,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find((m) => m !== userId);
    console.log(receiverId);
    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("http://localhost:5000/messages/", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input className="chatMenuInput" placeholder="ابحث عن معلمين" />
          {conversations.map((c, i) => (
            <div onClick={() => setCurrentChat(c)} key={i}>
              <Conversation conversation={c} currentUser={userId} />
            </div>
          ))}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat ? (
            <>
              <div className="chatBoxTop">
                {messages.map((m) => (
                  <div ref={scrollRef} key={m.id}>
                    <Message
                      message={m}
                      own={m.sender === userId}
                      userAvatar={userAvatar}
                    />
                  </div>
                ))}
              </div>
              <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  placeholder="write something..."
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                  }}
                  value={newMessage}
                ></textarea>
                <button className="chatSubmitButton" onClick={handleSubmit}>
                  ارسل
                </button>
              </div>
            </>
          ) : (
            <span>اضغط على اسم الاستاذ لبدأ المحادثة</span>
          )}
        </div>
      </div>
      {/* <div className="chatOnline">
        <div className="chatOnlineWrapper">online</div>
      </div> */}
    </div>
  );
}

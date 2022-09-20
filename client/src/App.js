import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import Piano from "./components/PianoPage";
import Header from "./components/Header";
import Oud from "./components/Oud";
import Auth from "./components/Auth/Auth";
import CreateTeacher from "./components/Form/CreateTeacher";
import Profile from "./components/Profile/Profile";
import CreateCourse from "./components/Course/CreateCourse";
import Teachers from "./components/Teachers";
import Courses from "./components/Courses";
import Messenger from "./components/Messenger/Messenger";
// import Hero from "./components/Hero";
export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  return (
    <div>
      <BrowserRouter>
        <Header user={user} setUser={setUser} />
        <Route path="/" exact>
          <Home user={user} setUser={setUser} />
        </Route>
        <Route path="/Oud" exact component={Oud} />
        <Route path="/Piano" exact component={Piano} />
        <Route path="/auth" exact>
          <Auth user={user} setUser={setUser} />
        </Route>
        <Route path="/CreateTeacher" exact component={CreateTeacher} />
        <Route path="/profile" exact>
          <Profile user={user} setUser={setUser} />
        </Route>
        <Route path="/createcourse" exact component={CreateCourse} />
        <Route path="/courses" exact component={Courses} />
        {/* <Route path="/teachers" exact component={Teachers} /> */}
        <Route path="/teachers" exact>
          <Teachers user={user} setUser={setUser} />
        </Route>
        <Route path="/messenger" exact>
          {user ? <Messenger user={user} setUser={setUser} /> : <Home />}
        </Route>
      </BrowserRouter>
    </div>
  );
}

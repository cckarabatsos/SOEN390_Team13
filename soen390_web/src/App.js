import "../src/App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserProfile from "./pages/UserProfile";
import JobSearch from "./pages/JobSearch";
//import UserProfile from "./pages/UserProfile";
import UserNetworking from "./pages/UserNetworking";
import Navbar from "./components/NavBar";
import UserConnection from "./pages/UserConnection";
import Contacts from "./pages/Contacts";
import JobApplication from "./pages/JobApplication";
import MessagingPage from "./pages/MessagingPage";
import NewsFeedPage from "./pages/NewsFeedPage";
import Admin from "./pages/Admin";

const AppWrapper = () => {
  const [userData, setUseData] = useState({});

  useEffect(() => {
    window.addEventListener("storage", () => {
      console.log("storage changed!");

      var data;
      try {
        data = JSON.parse(localStorage.getItem("isAuth"));
        console.log("data: " + data);
      } catch (error) {
        setUseData(false);
      }

      if (data != null) {
        setUseData(JSON.parse(localStorage.getItem("isAuth")));
      } else {
        setUseData(false);
      }
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar userData={userData}></Navbar>
        <Routes>
          <Route path="/" element={<Login></Login>} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/JobSearch" element={<JobSearch />} />
          <Route path="/Contacts" element={<Contacts />}></Route>
          <Route path="/JobApplication" element={<JobApplication />}></Route>
          <Route path="/UserNetworking" element={<UserNetworking />} />
          <Route path="/UserConnection" element={<UserConnection />} />
          <Route path="/MessagingPage" element={<MessagingPage />} />
          <Route path="/NewsFeedPAge" element={<NewsFeedPage />} />
          <Route path="/Admin" element={<Admin />} />
        </Routes>
      </Router>
    </div>
  );
};

export default AppWrapper;

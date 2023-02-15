import "../src/App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserProfile from "./pages/UserProfile"
import JobSearch from "./pages/JobSearch";

const AppWrapper = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup/>} />
          <Route path="/UserProfile" element={<UserProfile/>} />
          <Route path="/JobSearch" element={<JobSearch/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default AppWrapper;

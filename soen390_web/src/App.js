import "../src/App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserProfile from "./pages/UserProfile"
import JobSearch from "./pages/JobSearch";
//import UserProfile from "./pages/UserProfile";
import UserNetworking from "./pages/UserNetworking";
import Navbar from "./components/NavBar";
import UserConnection from "./pages/UserConnection";

const AppWrapper = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup/>} />
          <Route path="/UserProfile" element={<UserProfile/>} />
          <Route path="/JobSearch" element={<JobSearch/>} />
          <Route path="/Signup" element={<Signup />} />
          
          <Route path="/UserNetworking" element={<UserNetworking />} />
          <Route path="/UserConnection" element={<UserConnection />} />
        </Routes>
      </Router>
    </div>
  );
};

export default AppWrapper;

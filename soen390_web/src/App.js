import "../src/App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import Login from "./pages/Login";
import Register from "./pages/Register";
import Signup from "./pages/Signup";
=======
import MainTitle from "./pages/MainTitle";

>>>>>>> dev

const AppWrapper = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Signup" element={<Signup/>} />
=======
          <Route path="/" element={<MainTitle />} />
>>>>>>> dev
        </Routes>
      </Router>
    </div>
  );
};

export default AppWrapper;

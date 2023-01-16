import "../src/App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainTitle from "./pages/MainTitle";
import Register from "./pages/Register";

const AppWrapper = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainTitle />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
};

export default AppWrapper;

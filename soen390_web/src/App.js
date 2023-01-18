import "../src/App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainTitle from "./pages/MainTitle";


const AppWrapper = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainTitle />} />
        </Routes>
      </Router>
    </div>
  );
};

export default AppWrapper;

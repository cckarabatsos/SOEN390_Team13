import "../src/App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainTitle from "./pages/MainTitle";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
const AppWrapper = () => {
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
    const signUserOut = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            setIsAuth(false);
            window.location.pathname = "/login";
        });
    };
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<MainTitle />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Router>
            <button onClick={signUserOut}> Log Out</button>
        </div>
    );
};

export default AppWrapper;

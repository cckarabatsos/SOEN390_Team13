import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
  Navigate,
} from "react-router-dom";
import "../src/App.css";
import JobSearch from "./pages/JobSearch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserProfile from "./pages/UserProfile";
import "./assets/Roboto/Roboto-Regular.ttf";
import Footer from "./components/Footer";
import Navbar from "./components/NavBar";
import SubFooter from "./components/SubFooter";
import Admin from "./pages/Admin";
import Contacts from "./pages/Contacts";
import JobApplication from "./pages/JobApplication";
import MessagingPage from "./pages/MessagingPage";
import NewsFeedPage from "./pages/NewsFeedPage";
import UserConnection from "./pages/UserConnection";
import UserNetworking from "./pages/UserNetworking";

const AppWrapper = () => {
  const [userData, setUserData] = useState(() => {
    try {
      const data = localStorage.getItem("isAuth");
      return data !== null ? JSON.parse(data) : null;
    } catch (error) {
      return null;
    }
  });

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const data = localStorage.getItem("isAuth");
        setUserData(data !== null ? JSON.parse(data) : null);
      } catch (error) {
        setUserData(null);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar userData={userData}></Navbar>
        <Routes>
          <Route
            path="/"
            element={userData ? <Navigate to="/UserProfile" /> : <Login />}
          />
          <Route
            path="/Signup"
            element={userData ? <Navigate to="/UserProfile" /> : <Signup />}
          />
          {userData && (
            <>
              <Route path="/UserProfile" element={<UserProfile />} />
              <Route path="/JobSearch" element={<JobSearch />} />
              <Route path="/Contacts" element={<Contacts />} />
              <Route path="/JobApplication" element={<JobApplication />} />
              <Route path="/UserNetworking" element={<UserNetworking />} />
              <Route path="/UserConnection" element={<UserConnection />} />
              <Route path="/MessagingPage" element={<MessagingPage />} />
              <Route path="/NewsFeedPAge" element={<NewsFeedPage />} />
              {userData.isAdmin && (
                <Route path="/Admin" element={<Admin userData={userData} />} />
              )}
            </>
          )}
        </Routes>
        <SubFooter />
        <Footer />
      </Router>
    </div>
  );
};

export default AppWrapper;

import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "../src/App.css";
import "./assets/Roboto/Roboto-Regular.ttf";
import Footer from "./components/Footer";
import Navbar from "./components/NavBar";
import SubFooter from "./components/SubFooter";
import Admin from "./pages/Admin";
import Contacts from "./pages/Contacts";
import JobApplication from "./pages/JobApplication";
import JobSearch from "./pages/JobSearch";
import Login from "./pages/Login";
import MessagingPage from "./pages/MessagingPage";
import NewsFeedPage from "./pages/NewsFeedPage";
import Signup from "./pages/Signup";
import UserConnection from "./pages/UserConnection";
import UserNetworking from "./pages/UserNetworking";
import UserProfile from "./pages/UserProfile";
import ViewUserProfile from "./pages/ViewUserProfile";
import SearchPage from "./pages/SearchPage";

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
            element={userData ? <Navigate to="/UserLogin" /> : <Login />}
          />
          <Route
            path="/Signup"
            element={userData ? <Navigate to="/UserLogin" /> : <Signup />}
          />
          <Route path="/Search" element={<SearchPage />} />
          <Route path="/UserLogin" element={<Login />} />
          {userData && (
            <>
              <Route path="/UserProfile" element={<UserProfile />} />
              <Route
              
                path="/UserProfile/:userId"
                element={<ViewUserProfile />}
              />
              
              <Route path="/Contacts" element={<Contacts />} />
              <Route path="/JobApplication" element={<JobApplication />} />
              <Route path="/UserNetworking" element={<UserNetworking />} />
              <Route path="/UserConnection" element={<UserConnection />} />
              <Route path="/Messages/:userId" element={<MessagingPage />} />
              <Route path="/NewsFeedPAge" element={<NewsFeedPage />} />
              
              {userData.isAdmin && (
                <Route path="/Admin" element={<Admin userData={userData} />} />
              )}
            </>
          )}
        </Routes>
        <div className="footer-collection">
          <SubFooter />
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default AppWrapper;

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
import UserSearch from "./pages/UserSearch";
import UserProfile from "./pages/UserProfile";
import ViewUserProfile from "./pages/ViewUserProfile";
import SearchPage from "./pages/SearchPage";
import CompanyProfilePage from "./pages/CompanyProfile";
import NotificationPage from "./pages/NotificationPage";

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
          {userData ? (
            <>
            {console.log(userData)}
              {userData.isCompany ? (
                <Route path="/" element={<CompanyProfilePage />} />
              ) : (
                <Route path="/" element={<UserProfile />} />
              )}
              <Route path="/CompanyProfile" element={<CompanyProfilePage />} />
              <Route path="/Search" element={<SearchPage />} />
              <Route path="/UserProfile" element={<UserProfile />} />
              <Route path="/Contacts" element={<Contacts />} />
              <Route
                path="/JobApplication/:postId"
                element={<JobApplication userData={userData} />}
              />
              <Route path="/UserNetworking" element={<UserSearch />} />
              <Route path="/UserConnection" element={<UserConnection />} />
              <Route
                path="/Messages/:userId"
                element={<MessagingPage userData={userData} />}
              />
              <Route path="/NewsFeedPAge" element={<NewsFeedPage />} />
              <Route path="/NotificationsPage" element={<NotificationPage />} />
              {userData.isAdmin && (
                <Route path="/Admin" element={<Admin userData={userData} />} />
              )}
              <Route path="/UserProfile/:userId" element={<ViewUserProfile />} />
              <Route path="/CompanyProfile/:companyID" element={<CompanyProfilePage />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/Signup" element={<Signup />} />              
              <Route path="/UserLogin" element={<Login />} />
            </>
          )}
        </Routes>
        <div className="footer-collection">
          <Footer />
        </div>
      </Router>
    </div>
  );
          }
export default AppWrapper;

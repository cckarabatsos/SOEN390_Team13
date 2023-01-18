import React, { useState } from "react";
import LoginDialog from "../components/LoginDialog";

import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

import Register from "../components/Register"


function MainTitle(props) {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.reload();
    });
  };

  return (
    <>
      <h1>Main</h1>

      {!isAuth ? (
        <LoginDialog />
      ) : (
        <button onClick={signUserOut}> Log Out</button>
      )}

      
      <Register />

    </>
  );
}

export default MainTitle;

import React from "react";
import LoginDialog from "../components/LoginDialog";
import Register from "../components/Register"

function MainTitle(props) {
  return (
    <>
      <h1>Main</h1>
      <LoginDialog />
      <Register />
    </>
  );
}

export default MainTitle;

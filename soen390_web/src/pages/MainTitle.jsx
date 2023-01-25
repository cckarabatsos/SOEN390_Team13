import React from "react";
import LoginDialog from "../components/LoginDialog";
import NavBar from "../components/NavBar";

function MainTitle(props) {
  return (
    <>
      <NavBar />
      <h1>Main</h1>
      <LoginDialog />
    </>
  );
}

export default MainTitle;

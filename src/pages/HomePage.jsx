import React from "react";
import Chat from "../components/Chat";
import { Link } from "react-router-dom";
import Register from "../components/Register";
import Login from "../components/Login";
import { useSelector } from "react-redux";
function HomePage({
  handleShowLogin,
  showLogin,
  handleShowRegister,
  showRegister,
}) {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      {user ? (
        <Chat />
      ) : (
        <>
          <Register
            handleShowRegister={handleShowRegister}
            showRegister={showRegister}
          />
          <Login showLogin={showLogin} handleShowLogin={handleShowLogin} />
        </>
      )}
    </>
  );
}

export default HomePage;

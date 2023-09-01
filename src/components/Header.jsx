import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../firebase";
import { login as logoutHandle } from "../store/auth";
import { connect, useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const handleLogout = async () => {
    await logout();
    dispatch(logoutHandle());
    navigate("/", {
      replace: true,
    });
  };
  return (
    <header>
      <div className="navbar">
        <div className="logo">
          <Link to="/">Chat</Link>
        </div>
       {user ?  <div className="sign-out">
          <span onClick={handleLogout}>Çıxış et</span>
        </div> : ""}
      </div>
    </header>
  );
}
const t = (a) => a;
export default connect(t)(Header);

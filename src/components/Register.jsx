import React from "react";
import { useState } from "react";
import { register, update } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { login as loginHandle } from "../store/auth";
import { updateCurrentUser, updateProfile } from "firebase/auth";
function Register({ handleShowRegister, showRegister }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [displayName, setdisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await register(email, password, displayName);
    await update({
      photoURL: avatar,
    });
  };
  return (
    <>
      <div
        className={
          showRegister ? "register-container active" : "register-container"
        }
      >
        <form className={showRegister ? "register active" : "register"}>
          <p className="title">Qeydiyyat</p>
          <p className="message">
            İndi qeydiyyatdan keçin və tətbiqimizə tam giriş əldə edin.
          </p>
          <div className="flex">
            <label>
              <input
                value={displayName}
                required=""
                placeholder="Nick"
                type="text"
                className="input"
                onChange={(e) => setdisplayName(e.target.value)}
              />
            </label>
            <label>
              <input
                value={email}
                required=""
                placeholder="E-poçt"
                type="email"
                className="input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <label>
            <input
              value={password}
              required=""
              placeholder="Şifrə"
              type="password"
              className="input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            <input
              value={avatar}
              required=""
              placeholder="Profil Şəkli (url)"
              type="text"
              className="input"
              onChange={(e) => setAvatar(e.target.value)}
            />
          </label>
          <button
            disabled={!displayName || !email || !password}
            onClick={handleSubmit}
            className="submit"
          >
            Qeydiyyat
          </button>
          <p className="signin">
            Artıq hesabınız var?{" "}
            <a onClick={handleShowRegister} href="#">
              Giriş
            </a>{" "}
          </p>
        </form>
      </div>
    </>
  );
}
export default Register;

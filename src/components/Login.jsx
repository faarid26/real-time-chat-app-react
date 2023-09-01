import React from "react";
import { useEffect, useState } from "react";
import { auth, firebase } from "../firebase";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { login } from "../firebase";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { login as loginHandle } from "../store/auth";
function Login({ handleShowLogin, showLogin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const firebaseConfig = {
    apiKey: "AIzaSyAC1Rx8cUFQR-7OZCYoe_kI8Wpw4yYR3UM",
    authDomain: "chat-app-react-44887.firebaseapp.com",
    projectId: "chat-app-react-44887",
    storageBucket: "chat-app-react-44887.appspot.com",
    messagingSenderId: "77215581440",
    appId: "1:77215581440:web:3e30fd129be0118da59fe5",
  };
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const notify = () => toast("daxil olundu");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    dispatch(loginHandle(user));
    navigate("/", {
      replace: true,
    });
  };
  // const firestore = firebase.firestore();

  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log("Giriş başarılı:", result);
      })
      .catch((error) => {
        console.error("Giriş başarısız:", error);
      });
  }

  const [user] = useAuthState(auth);
  return (
    <>
      <div className={showLogin ? "login-container active" : "login-container"}>
        <form className={showLogin ? "form active" : "form"}>
          <p className="title">Giriş</p>
          <p className="message">Giriş edin.</p>
          <div className="flex">
            <label>
              <input
                required=""
                placeholder="E-poçt"
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <label>
            <input
              required=""
              placeholder="Şifrə"
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            disabled={!email || !password}
           onClick={handleSubmit}
            className="submit"
          >
            Giriş
          </button>
          <p className="signin">
            Hesabınız yoxdur?{" "}
            <a onClick={handleShowLogin} href="#">
              Qeydiyyat
            </a>{" "}
          </p>
        </form>
      </div>
    </>
  );
}
// const mapStateToProps = (state) => {
//   return {
//   };
// };
const t = (a) => a;
export default connect(t)(Login);

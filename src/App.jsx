import { Suspense, lazy, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Loader from "./components/Loader";
import Chat from "./components/Chat";
import { auth, firebase } from "./firebase";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { connect, useSelector } from "react-redux";
import { register } from "./firebase";
import Register from "./components/Register";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
const Home = lazy(() => import("./pages/HomePage"));
function App({ dispatch }) {
  const [showRegister, setShowRegister] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const user = useSelector((state) => state.auth);
  const firebaseConfig = {
    apiKey: "AIzaSyAC1Rx8cUFQR-7OZCYoe_kI8Wpw4yYR3UM",
    authDomain: "chat-app-react-44887.firebaseapp.com",
    projectId: "chat-app-react-44887",
    storageBucket: "chat-app-react-44887.appspot.com",
    messagingSenderId: "77215581440",
    appId: "1:77215581440:web:3e30fd129be0118da59fe5",
  };
  const handleShowRegister = () => {
    setShowRegister(!showRegister);
    setShowLogin(!showLogin);
  };
  const handleShowLogin = () => {
    setShowLogin(!showLogin);
    setShowRegister(!showRegister);
  };
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();
  return (
    <>
      <Header />
      <Toaster position="top-right" />
      <Suspense fallback={<Loader/>}>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              handleShowLogin={handleShowLogin}
              showLogin={showLogin}
              handleShowRegister={handleShowRegister}
              showRegister={showRegister}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              handleShowRegister={handleShowRegister}
              showRegister={showRegister}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login handleShowLogin={handleShowLogin} showLogin={showLogin} />
          }
        />
      </Routes>
      </Suspense>
    </>
  );
}
const t = (a) => a;
export default connect()(App);

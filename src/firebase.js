import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import toast, { Toaster } from "react-hot-toast";
import { getFirestore } from "@firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { GoogleAuthProvider} from "firebase/auth";
import { addDoc, collection, setDoc, doc } from "@firebase/firestore";
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
const auth = getAuth();
export const db = getFirestore(app);

export const register = async (email, password, displayName, photoURL) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    toast.success("Hesab yaradıldı, Giriş edə bilərsiniz");
    if (user) {
      await updateProfile(user, { displayName, photoURL });
    }

    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    toast.success("Hesaba Daxil olundu");
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};
export const logout = async () => {
  try {
    const { user } = await signOut(auth);
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};
export const update = async (data) => {
  try {
    await updateProfile(auth.currentUser, data);
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};
export const addMessage = async (data) => {
  const result = await addDoc(collection(db, "messages"), data);
};
export { app as firebase, analytics, auth };

import React, { useEffect } from "react";
import { useState } from "react";
import { connect, useSelector } from "react-redux";
import { addMessage, db } from "../firebase";
import { useRef } from "react";
import { collection, getDocs, onSnapshot, deleteDoc } from "@firebase/firestore";
import { toast } from "react-hot-toast";
function Chat() {
  const firebaseConfig = {
    apiKey: "AIzaSyAC1Rx8cUFQR-7OZCYoe_kI8Wpw4yYR3UM",
    authDomain: "chat-app-react-44887.firebaseapp.com",
    projectId: "chat-app-react-44887",
    storageBucket: "chat-app-react-44887.appspot.com",
    messagingSenderId: "77215581440",
    appId: "1:77215581440:web:3e30fd129be0118da59fe5",
  };
  const { user } = useSelector((state) => state.auth);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const messagesCollection = collection(db, "messages");
    const unsubscribe = onSnapshot(messagesCollection, (querySnapshot) => {
      const messagesData = [];
      querySnapshot.forEach((doc) => {
        messagesData.push(doc.data());
      });
      setMessages(messagesData);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const clearMessagesCollection = async () => {
    const messagesCollectionRef = collection(db, "messages");
  
    try {
      const querySnapshot = await getDocs(messagesCollectionRef);
  
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
  
      toast.succes("Mesajlar silindi !")
    } catch (error) {
      toast.error("Mesajlar siline bilmedi", error)
    }
  };
  const submitHandle = async (e) => {
    e.preventDefault();
    await addMessage({
      user: user.displayName,
      photoURL: user.photoURL,
      message,
      uid: user.uid,
    });
  };
  return (
    <>
      <div className="chat-container">
        <div className="chat-scroll">
        <div className="chat">
          <div className="messages-area">
            {messages.map((message, index) => (
              <div key={index} className="message">
                <div className="user">
                  <div className="user-pp">
                    <img src={message.photoURL} alt="" />
                  </div>
                  <div className="user-dt">
                    <div className="user-info">
                      <h3>{message.user}</h3>
                    </div>
                    <div className="user-message">
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div></div>
        </div>
        </div>
        <div className="sender-area">
          <div className="input-place">
            <input
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Mesaj göndər."
              className="send-input"
              type="text"
            />
            <button className="send" onClick={submitHandle}>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
          {user.email === "admin@gmail.com" ? (
            <button onClick={clearMessagesCollection} className="clear">Chati Temizle</button>
          ) : null}
        </div>
      </div>
    </>
  );
}
const t = (a) => a;
export default connect(t)(Chat);

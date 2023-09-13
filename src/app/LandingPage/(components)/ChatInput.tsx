"use client";
import React, { ChangeEvent, FormEvent, HtmlHTMLAttributes, use, useEffect } from "react";
import { db } from "@/app/(firebase)/firebase";
import { setDoc, collection, addDoc, DocumentData } from "firebase/firestore";
import { AuthContext } from "@/app/(firebase)/AuthContext";
import { CurrentChatContext } from "../page";



function ChatInput() {
  const [message, setMessage] = React.useState("");
  const currentUser = React.useContext(AuthContext);
  const {currentChat,setCurrentChat} = React.useContext(CurrentChatContext);
  useEffect(() => {console.log('currentCHat',currentChat)}, [currentChat])
  //q: how do i get the type of the event object in typescript

  const HandleChange = (e:React.ChangeEvent<HTMLInputElement> ) => {
    setMessage(e.target.value);
  };
  const HandleSubmit = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(message);
    console.log('current',currentChat)
    const colRef = collection(db, "chats");
    addDoc(colRef, {
      message: message,
      timestamp: Date.now(),
      from: currentUser?.user?.email,
      to: currentChat?.email
    });
    setMessage("");
    e.target.value="";
  };
  return (
    <form
      className="flex justify-between items-center w-10/12 mb-6 gap-5"
     
    >
      <input
        type="text"
        placeholder="Type message"
        className="grow p-4 rounded-lg bg-gray-950 placeholder:text-gray-600"
        onChange={HandleChange}
      ></input>
      <button  onClick={HandleSubmit}>
        <img src="/images/paper-plane.svg" className="w-8 h-8 "></img>
      </button>
    </form>
  );
}

export default ChatInput;

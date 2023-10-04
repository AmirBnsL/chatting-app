"use client";
import React, {  useEffect } from "react";
import { db } from "@/app/(firebase)/firebase";
import { collection, addDoc} from "firebase/firestore";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/redux/store";


function ChatInput() {
  const [message, setMessage] = React.useState("");
  const currentUser = useSelector((state:RootState)=> state.context.user); //it has currentUser.uid , currentUser.email , currentUser.displayName inside user object inside it
  const currentChat = useSelector((state:RootState)=> state.context.currentChat); //it has currentUser.uid , currentUser.email , currentUser.displayName inside user object inside it))
  useEffect(() => {console.log('currentCHat',currentChat)}, [currentChat])
  //q: how do i get the type of the event object in typescript

  const HandleChange = (e:React.ChangeEvent<HTMLInputElement> ) => {
    setMessage(e.target.value);
  };
  const HandleSubmit = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const colRef = collection(db, "chats");
    addDoc(colRef, {
      message: message,
      timestamp: Date.now(),
      from: currentUser?.email,
      to: currentChat?.email
    });
    setMessage("");
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
        value={message}
      ></input>
      <button  onClick={HandleSubmit}>
        <img src="/images/paper-plane.svg" className="w-8 h-8 "></img>
      </button>
    </form>
  );
}

export default ChatInput;

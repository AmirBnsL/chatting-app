'use client'

import { useSelector } from "react-redux";

import { RootState } from "@/app/lib/redux/store";
import NavBar from "./(components)/NavBar";
import ChatBox from "./(components)/ChatBox";
import ChatInput from "./(components)/ChatInput";


function MainBar() { 
    const currentChat = useSelector((state: RootState) => state.context.currentChat);

  return (
    <div className="w-full h-full flex flex-col">
        {
        currentChat && (
        <>
        <NavBar
          ></NavBar>
          <ChatBox />
          <ChatInput />
        </>
      )}</div>
  )
}

export default MainBar
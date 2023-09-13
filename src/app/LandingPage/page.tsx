"use client";
import React, { FC, FormEvent } from "react";
import { useState, createContext } from "react";
import { useAuthContext } from "../(firebase)/AuthContext";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { authInstance } from "../(firebase)/AuthContext";
import NavBar from "./(components)/NavBar";
import SideBar from "./(components)/SideBar";
import ChatBox from "./(components)/ChatBox";
import ChatInput from "./(components)/ChatInput";
import { DocumentData } from "firebase/firestore";

//q: what is the type of currentChatContext?
//a: it is a context object that has a currentChat and setCurrentChat property
//q: what is the type of currentChat and setCurrentChat?
export interface CurrentChatContextType {
  currentChat: DocumentData ;
  setCurrentChat: React.Dispatch<React.SetStateAction<DocumentData>>;
}

export const CurrentChatContext = createContext<CurrentChatContextType | undefined>(undefined);

function LandingPage() {
  const [currentChat, setCurrentChat] = useState<DocumentData>({} as DocumentData);//current selected contact item
  
  const user = useAuthContext();
  const router = useRouter();
  console.log({currentChat})
  const HandleLogOut = (e: FormEvent) => {
    e.preventDefault();
    signOut(authInstance);
  };

  React.useEffect(() => {
    if (user.user == null) {
      router.push("/");
    }
  }, [user]);
  console.log(user);
  return (
    <>
      <CurrentChatContext.Provider value={{ currentChat, setCurrentChat }}>
        <SideBar></SideBar>
      <div className="grow bg-pale_azure-700 flex items-center justify-around flex-col h-screen">
        {currentChat && (
          <>
            <NavBar name={currentChat.name} imgSrc={'/images/profile.png'}></NavBar>
            <ChatBox />
            <ChatInput />
          </>
        )}
      </div>
      </CurrentChatContext.Provider>
    </>
  );
}

export default LandingPage;

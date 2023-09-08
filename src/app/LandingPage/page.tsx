"use client";
import React, { FormEvent } from "react";
import { useState, createContext } from "react";
import { useAuthContext } from "../(firebase)/AuthContext";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { authInstance } from "../(firebase)/AuthContext";
import NavBar from "./(components)/NavBar";
import SideBar from "./(components)/SideBar";
import ChatBox from "./(components)/ChatBox";
import ChatInput from "./(components)/ChatInput";

export const CurrentChatContext = createContext({});

function LandingPage() {
  const [currentChat, setCurrentChat] = useState<any>(null);//current selected contact item
  const user = useAuthContext();
  const router = useRouter();

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

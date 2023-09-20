"use client";
import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { authInstance } from "../(firebase)/AuthContext";
import NavBar from "./(components)/NavBar";
import ChatBox from "./(components)/ChatBox";
import ChatInput from "./(components)/ChatInput";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../lib/redux/store";


function LandingPage({ children }: { children: React.ReactNode }) {
  const currentChat = useSelector((state: RootState) => state.context.currentChat);
  const user = useSelector((state: RootState) => state.context.user);
  const router = useRouter();
  console.log({ currentChat }, "from landing page");
  const HandleLogOut = (e: FormEvent) => {
    e.preventDefault();
    signOut(authInstance);
  };

  React.useEffect(() => {
    if (user == null) {
      router.push("/");
    }
  }, [user]);
  console.log(user);
  return (
    <>
      {children}
      <div className="grow bg-pale_azure-700 flex items-center justify-around flex-col h-screen">
        {currentChat && (
          <>
            <NavBar
              name={currentChat.name}
              imgSrc={"/images/profile.png"}
            ></NavBar>
            <ChatBox />
            <ChatInput />
          </>
        )}
      </div>
    </>
  );
}

export default LandingPage;

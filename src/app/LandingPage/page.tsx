
import React, { FormEvent } from "react";
import { signOut } from "firebase/auth";
import { authInstance } from "../(firebase)/AuthContext";
import MainBar from "./main";


function LandingPage({ children }: { children: React.ReactNode }) {
  
  const HandleLogOut = (e: FormEvent) => {
    e.preventDefault();
    signOut(authInstance);
  };

  
  return (
    <>
      {children}
      <div className="grow bg-pale_azure-700 flex items-center justify-around flex-col h-screen">
        <MainBar></MainBar>
      </div>
    </>
  );
}

export default LandingPage;

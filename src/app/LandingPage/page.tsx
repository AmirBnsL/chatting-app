import MainBar from "./main";
import { ReactNode } from "react";

interface LandingPageProps {
  children: ReactNode;
}

export default function LandingPage({ children }: LandingPageProps) {
  return (
    <>
      {children}
      <div className="grow bg-pale_azure-700 flex items-center justify-around flex-col h-screen">
        <MainBar />
      </div>
    </>
  );
}
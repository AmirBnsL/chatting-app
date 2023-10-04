import MainBar from "./main";

function LandingPage({ children }: { children: React.ReactNode }) {
  
  

  
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

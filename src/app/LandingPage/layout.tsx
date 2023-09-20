import SideBar from "./(components)/SideBar";
import LandingPage from "./page";

function layout() {
  return (
    <div className="flex w-screen overflow-hidden relative">
      <LandingPage>
        <SideBar></SideBar>{" "}
      </LandingPage>
    </div>
  );
}

export default layout;

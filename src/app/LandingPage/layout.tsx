import SideBar from "./(components)/SideBar";
import LandingPage from "./page";
import KickOutRouter from "./kickOutRouter";

function layout() {
  return (
    <div className="flex w-screen overflow-hidden relative">
      <KickOutRouter>
        <LandingPage>
          <SideBar></SideBar>{" "}
        </LandingPage>
      </KickOutRouter>
    </div>
  );
}

export default layout;

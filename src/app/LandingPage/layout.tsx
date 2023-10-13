import LandingPage from "./page";
import KickOutRouter from "./kickOutRouter";
import SideBar from "./(components)/SideBar";
function layout() {
  return (
    <div className="flex w-screen overflow-hidden relative">
      <KickOutRouter>
        <LandingPage>
          <SideBar />
        </LandingPage>
      </KickOutRouter>
    </div>
  );
}

export default layout;

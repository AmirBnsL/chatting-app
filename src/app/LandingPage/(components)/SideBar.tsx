
import SearchBar from "./(components)/SearchBar";
import Contacts from "./Contacts";
import AddingElement from "./AddingElement";
import HamburgerOpener from "./HamburgerOpener";
import { getAllFbUser } from "./contactFetch";
import { db } from "@/app/(firebase)/firebase";


async function getDBusers(){
  
  const fetchedDB = await getAllFbUser(db);

  return fetchedDB[0]
  
}

getDBusers()

async function SideBar() {
  const fetchedDB = await getDBusers();
  return (
    <>
      <div
        className={`md:basis-3/12 basis-1/4 bg-blue-gradient flex-shrink-1 flex flex-col items-center gap-1 h-screen overflow-scroll `}
      >
        <div className={`flex justify-center items-center h-20 w-full`}>
          <SearchBar></SearchBar> 
          {/* here we need only searchetext */}
        </div>
        <Contacts fetchedDB={fetchedDB}></Contacts>
        {/* here we need our list of contacts */}

        <AddingElement />
      </div>
      <HamburgerOpener></HamburgerOpener>
    </>
  );
}

export default SideBar;

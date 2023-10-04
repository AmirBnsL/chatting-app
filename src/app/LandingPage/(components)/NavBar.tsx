import React from "react";
import Image from "next/image";
import NavBarTitleImg from "./NavBarTitleImg";

function NavBar() {
  return (
    <div className="flex justify-between p-4 items-center w-full bg-pale_azure-400">
      <NavBarTitleImg></NavBarTitleImg>
      <div className="flex items-center gap-5">
        <button className="w-8 h-8 relative">
          <Image src="/images/search.png" alt="search" fill={true} />
        </button>
        <button className="w-8 h-8 relative">
          <Image src="/images/ellipsis-vertical-solid.svg" fill={true} alt="" />
        </button>
      </div>
    </div>
  );
}

export default NavBar;

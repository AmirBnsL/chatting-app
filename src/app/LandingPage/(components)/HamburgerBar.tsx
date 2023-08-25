import React from "react";
import Image from "next/image";

function HamburgerBar({setIsOpen}) {
  return (
    <>
      <div className="w-8 h-8 relative" onClick={()=>{setIsOpen((prevOpen) => !prevOpen)}}>
        <Image src='/nothing.png' alt='arrow-back' fill={true} ></Image>
      </div>
      <div className="profile">profile</div>
      <div className="menu">
        <div className="settings"></div>
      </div>
    </>
  );
}

export default HamburgerBar;

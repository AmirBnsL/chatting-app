import React from "react";
import Image from "next/image";
function NavBar({ name, imgSrc }: { name: string; imgSrc: string }) {
  return (
    <div className="flex justify-between p-4 items-center w-full bg-FajrBlue">
      <div className="flex justify-center gap-5 items-center">
        <button className="w-16 h-16 rounded-full relative">
          <Image src={imgSrc} alt="profile" fill={true} />
        </button>
        <h1 className="text-xl font-bold">{name}</h1>
      </div>
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

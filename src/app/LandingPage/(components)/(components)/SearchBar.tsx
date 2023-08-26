"use client";
import React from "react";

import Image from "next/image";

function SearchBar({
  searchValue,
  setSearchValue,
  isOpen,
  setIsOpen,
  
}: {
  searchValue: any;
  setSearchValue: any;
  isOpen: any;
  setIsOpen: any;
}) {  
  const handleSearch = (e: any) => {
    setSearchValue(e.target.value);
  };

  const handleCancel = (e) => {
    setSearchValue("");
  };
  return (
    <div className="w-full flex items-center justify-around">
        <div className="relative w-8 h-8 " onClick={()=> {setIsOpen((prevOpen)=> !prevOpen)}}>
        <Image src="/images/hamburger.png" fill={true} alt="Hamburger"></Image>
            </div>
      <input
        type="text"
        placeholder="search for contact"
        className="p-3 text-black"
        value={searchValue}
        onChange={handleSearch}
      />
      <div className="relative w-8 h-8 " onClick={handleCancel}>
        <Image src="/images/cancel.png" fill={true} alt="cancel"></Image>
      </div>
    </div>
  );
}

export default SearchBar;

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

  const [searchOpen, setSearchOpen] = React.useState(false);
  const handleSearch = (e: any) => {
    setSearchValue(e.target.value);
  };

  const handleCancel = () => {
    setSearchValue("");
  };
  //TODO: magnfier icon to expand the search bar
  //todo: change the red icon and hamburger to something  minimal with good color
  //todo:
  return (
    <div className="w-full flex items-center justify-normal gap-2 relative px-2">
      <div
        className="relative min-w-[2rem] min-h-[2rem] "
        onClick={() => {
          setIsOpen((prevOpen) => !prevOpen);
        }}
      >
        <Image src="/images/hamburger.png" fill={true} alt="Hamburger"></Image>
      </div>
      {<input
        type="text"
        placeholder="search for contact"
        className={` text-gray-950 focus:outline-none rounded-2xl bg-gray-100 placeholder:text-gray-400 ${searchOpen ? " p-2" : "w-0 p-0"} transition-['width'] duration-500 `}
        value={searchValue}
        onChange={handleSearch}
      />}
      {
        <div className={`w-8 h-8 ${searchOpen ? 'absolute right-2' : ''} `} onClick={()=> {setSearchOpen(!searchOpen)
        handleCancel()}}>
          <div className={`relative w-full h-full ${searchOpen ? 'scale-75': ''} `} >
            <Image
              src={`/images/${searchOpen ? "cancel" : "search"}.png`}
              fill={true}
              alt="cancel"
            ></Image>
          </div>
        </div>
      }
    </div>
  );
}

export default SearchBar;

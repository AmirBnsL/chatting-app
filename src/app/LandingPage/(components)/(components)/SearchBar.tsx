"use client";
import React from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { setSearch } from "@/app/lib/redux/Features/search/searchSlice";
import { RootState } from "@/app/lib/redux/store";
import { useSelector } from "react-redux";
import { toggleHamburger } from "@/app/lib/redux/Features/hamburger/hamburgerSlice";

function SearchBar() {
  const dispatch = useDispatch();
  const searchValue = useSelector((state:RootState) => state.search.value);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const handleSearch = (e: any) => {
    dispatch(setSearch(e.target.value));
  };

  const handleCancel = () => {
    dispatch(setSearch(''));
  };
  //TODO: magnfier icon to expand the search bar
  //todo: change the red icon and hamburger to something  minimal with good color
  //todo:
  return (
    <div className="w-full flex items-center justify-normal gap-2 relative px-2">
      <div
        className="relative min-w-[2rem] min-h-[2rem] "
        onClick={() => {
          dispatch(toggleHamburger());
        }}
      >
        <Image src="/images/hamburger.png" fill={true} alt="Hamburger"></Image>
      </div>
      {<input
        type="text"
        placeholder="search for contact"
        className={` text-gray-950 focus:outline-none rounded-2xl bg-gray-100 placeholder:text-gray-400 ${searchOpen ? " p-2" : "w-0 p-0"} transition-all duration-150 `}
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

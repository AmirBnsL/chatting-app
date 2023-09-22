import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/redux/store";
function NavBarTitleImg() {
const currentChat = useSelector((state:RootState)=> state.context.currentChat);
  return (
    <div className="flex justify-center gap-5 items-center">
      <button className="w-16 h-16 rounded-full relative overflow-hidden ">
        <Image src={'./images/profile.png'} alt="profile" fill={true} />
      </button>
      <h1 className="text-lg font-bold text-space_cadet-100 ">{currentChat.name}</h1>
    </div>
  );
}

export default NavBarTitleImg;

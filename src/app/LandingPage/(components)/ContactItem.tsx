"use client";
import React from "react";
import Image from "next/image";
import { DocumentData } from "@firebase/firestore";
import { useSelector,useDispatch } from "react-redux";
import { RootState } from "@/app/lib/redux/store";
import { setCurrentUser } from "@/app/lib/redux/Features/context/contextSlice";

function ContactItem({ contact }: { contact: DocumentData}) {
  const currentChat = useSelector((state:RootState) => state.context.currentChat);
  const dispatch = useDispatch();


  const isCurrentChat = currentChat?.name == contact?.name;

  const HandleClick = () => {
    console.log(isCurrentChat)
    !isCurrentChat ? dispatch(setCurrentUser(contact)) : dispatch(setCurrentUser(null));
  };
  React.useEffect(() => {console.log('current chat',currentChat);}, [currentChat])
  return (
    <div
      className={`h-fit w-full flex items-center box-border p-2 m-2 hover:bg-cyan-400 ${isCurrentChat ? 'bg-cyan-400 relative'  : '' } gap-5 w-fit`}
      onClick={HandleClick}
    >
      {isCurrentChat && 
      <div className="w-1  bg-cyan-800 absolute h-full left-0"></div>}
      <div className="w-16 h-16 rounded-full overflow-hidden relative">
        {" "}
        <Image
          src={"/images/no-profile-picture-icon.svg"}
          alt="profile-profile"
          fill={true}
        />
      </div>
      <div className="font-semibold text-ultra_violet-100">
        {contact.name}
      </div>
    </div>
  );
}

export default ContactItem;

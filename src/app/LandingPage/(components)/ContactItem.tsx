"use client";
import React from "react";
import { CurrentChatContext } from "../page";
import Image from "next/image";

function ContactItem({ contact }) {
  const { currentChat, setCurrentChat } = React.useContext(CurrentChatContext);
  const HandleClick = () => {
        setCurrentChat(contact)
  };
  React.useEffect(() => {console.log('current chat',currentChat);}, [currentChat])
  return (
    <div
      className="h-fit flex items-center p-4 m-2 hover:bg-FajrBlue gap-5 w-fit"
      onClick={HandleClick}
    >
      <button className="w-16 h-16 rounded-full relative">
        {" "}
        <Image
          src={"/images/no-profile-picture-icon.svg"}
          alt="profile-profile"
          fill={true}
        />
      </button>
      <div className="font-semibold text-gray-100">
        {contact.name}
      </div>
    </div>
  );
}

export default ContactItem;

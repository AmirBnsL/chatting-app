import React from "react";
import Image from "next/image";
function Profile() {
  return (
    <div className="flex flex-col items-start h-[20vh]">
      <div className="w-16 h-16 rounded-full relative">
        {" "}
        <Image
          src={"/images/no-profile-picture-icon.svg"}
          alt="profile-profile"
          fill={true}
        />
      </div>
      <div className="text-gray-100 flex flex-col items-start justify-start gap-0">
        <div className="font-semibold text-sm">Name</div>
        <div className="font-semibold  text-sm">Email</div>
        <div className=" text-xs">+213 750697632</div>
      </div>
    </div>
  );
}

function MenuItem({ children ,imgSrc}) {
  
  const notSettings = imgSrc !== '/images/settings.png'
  return (<div className="flex justify-normal items-center w-10/12">
  <div className="relative w-6 h-6">
    <Image src={imgSrc} alt="setting" fill={true}></Image>
    </div>
  {children}
  {notSettings && <div className="relative w-6 h-6 ">
    <Image src={'/images/arrow.png'} alt='arrow' fill={true}></Image>
  </div>}
  </div>)


}

function HamburgerBar({ setIsOpen, isOpen }) {
  return (
    <>
      <div className="w-full flex flex-col justify-center bg-blue-900">
        <div
          className={`w-8 h-8 relative rotate-90 self-end ${
            isOpen ? "" : "hidden"
          }`}
          onClick={() => {
            setIsOpen((prevOpen) => !prevOpen);
          }}
        >
          <Image
            src="/images/hamburger.png"
            alt="arrow-back"
            fill={true}
          ></Image>
        </div>
        <Profile></Profile>
      </div>
      <div className="w-full h-full">
            <MenuItem children={<h1 className="text-gray-100 font-bold text-xl">Settings</h1>} imgSrc={'/images/settings.png'}/>
        <div className="settings flex flex-col items-center ">
          <MenuItem children={<h2 className="text-gray-100 font-semibold text-lg grow">Profile </h2>} imgSrc={'/images/profile.png'}/>
          <MenuItem children={<h2 className="text-gray-100 font-semibold text-lg grow">Notifications </h2>} imgSrc={'/images/notification.png'}/>
          <MenuItem children={<h2 className="text-gray-100 font-semibold text-lg grow">DarkMode </h2>} imgSrc={'/images/darkmode.png'}/>

        </div>
      </div>
    </>
  );
}

export default HamburgerBar;

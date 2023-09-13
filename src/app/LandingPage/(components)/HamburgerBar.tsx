import React, { ReactNode } from "react";
import Image from "next/image";
import { JsxElement } from "typescript";

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

function MenuItem({
  title,
  imgSrc,
  children,
}: {
  title: ReactNode;
  imgSrc: string;
  children?: ReactNode;
}) {
  const notSettings = imgSrc !== "/images/settings.png";
  return (
    <div className="flex justify-normal items-center w-10/12">
      <div className="relative w-6 h-6">
        <Image src={imgSrc} alt="setting" fill={true}></Image>
      </div>
      {title}
      {notSettings && (
        <div className="relative w-6 h-6 ">
          <Image src={"/images/arrow.png"} alt="arrow" fill={true}></Image>
        </div>
      )}
    </div>
  );
}

const DropDownMenu = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

function HamburgerBar({
  setIsOpen,
  isOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}) {
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
        //TODO: add the settings menu //TODO: add the profile menu which has
        change username, change password, change email,and freinds and from
        there you logOut //TODO: add the notification menu which you can change
        there type of notification //TODO: add the darkmode menu which you can
        change the theme of the app //TODO: use a chlidren prop and
        cssTransition to make the menu appear and disappear through translate
        and opacity
        <MenuItem
          title={<h1 className="text-gray-100 font-bold text-xl">Settings</h1>}
          imgSrc={"/images/settings.png"}
        ></MenuItem>
        <div className="settings flex flex-col items-center ">
          <MenuItem
            title={
              <h2 className="text-gray-100 font-semibold text-lg grow">
                Profile{" "}
              </h2>
            }
            imgSrc={"/images/profile.png"}
          ></MenuItem>
          <MenuItem
            title={
              <h2 className="text-gray-100 font-semibold text-lg grow">
                Notifications{" "}
              </h2>
            }
            imgSrc={"/images/notification.png"}
          ></MenuItem>
          <MenuItem
            title={
              <h2 className="text-gray-100 font-semibold text-lg grow">
                DarkMode{" "}
              </h2>
            }
            imgSrc={"/images/darkmode.png"}
          ></MenuItem>
        </div>
      </div>
    </>
  );
}

export default HamburgerBar;

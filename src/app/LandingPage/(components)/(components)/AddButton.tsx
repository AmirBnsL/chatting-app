import React from 'react'
import Image from 'next/image';


function AddButton({
    setIsAdding,
  }: {
    setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  }) {
    return (
      <div
        className="flex justify-center items-center cursor-pointer bg-FajrBlue rounded w-fit py-1 px-2 "
        onClick={() => {
          setIsAdding((prevIsAdding) => !prevIsAdding);
        }}
      >
        <p className="font-bold text-sm">Add Friend</p>
        <button className="relative w-6 h-6">
          <Image
            src={"/images/plus-solid.svg"}
            alt="add contact"
            fill={true}
          ></Image>
        </button>
      </div>
    );
  }
  

export default AddButton
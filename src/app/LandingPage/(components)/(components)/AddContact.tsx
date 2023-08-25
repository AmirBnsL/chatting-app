"use client";
import React from "react";

import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/app/(firebase)/firebase";
import { AuthContext } from "@/app/(firebase)/AuthContext";

export default function AddContact({
  dbUsers,
  contacts,
  setContacts,
}: {
  dbUsers: any;
  contacts: any;
  setContacts: any;
}) {
  const [searchedContact, setSearchedContact] = React.useState("");
  const currentUser = React.useContext(AuthContext);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    function makeSureUnique(arr: any) {
      const uniqueArr = [];
      arr.forEach((item: any) => {
        if (!uniqueArr.includes(item)) {
          uniqueArr.push(item);
        }
        return uniqueArr;
      });
    }
    const UniqueContact = contacts.find(
      (contact: any) => contact.email === searchedContact
    );

    const foundObject = dbUsers.find(
      (user: any) =>
        user.email === searchedContact && user.email !== currentUser.user.email
    );
    if (foundObject && !UniqueContact) {
      console.log("found");
      const updatedContacts = makeSureUnique([...contacts, foundObject]);
      setContacts(updatedContacts);
      const docRef = doc(db, "users", currentUser.user.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        const updatedFriends = [...userData.friends, foundObject.email];
        await updateDoc(docRef, { friends: updatedFriends });
      } else {
        console.log("No such document!");
        ``;
      }
      console.log(docSnap.data());
    } else {
      console.log("fuck you");
    }
  };
  return (
    <form
      className="flex justify-center items-center cursor-pointer bg-FajrBlue rounded w-fit py-1 px-2 "
      onSubmit={HandleSubmit}
    >
      <input
        type="text"
        placeholder="Enter Email"
        className="w-full h-8 rounded bg-FajrBlue text-white px-2"
        onChange={(e) => {
          setSearchedContact(e.target.value);
        }}
      />
      <input type="submit" value={"Add contact"} />
    </form>
  );
}

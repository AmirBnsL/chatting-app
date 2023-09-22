"use client";
import React from "react";

import { doc, updateDoc, getDoc, DocumentData } from "firebase/firestore";
import { db } from "@/app/(firebase)/firebase";
import { useSelector,useDispatch } from "react-redux";
import { RootState } from "@/app/lib/redux/store";
import { setContacts } from "@/app/lib/redux/Features/contacts/contactsSlice";

export default function AddContact() {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dbUsers = useSelector((state: RootState) => state.contacts.dbUsers);
  const dispatch = useDispatch();
  const [searchedContact, setSearchedContact] = React.useState("");
  const currentUser = useSelector((state: RootState) => state.context.user);

  const HandleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    function makeSureUnique(arr: Array<any>) {
      return [...new Set(arr)]
    }
    console.log(contacts)
    const isContactUnique = !contacts.some((contact) => contact.name === searchedContact);
    console.log(isContactUnique);


    const foundObject  = dbUsers?.find(
      (user : DocumentData) =>{
        return user.name === searchedContact && user.name !== currentUser?.displayName

      }
    );
    console.log(foundObject);
    if (foundObject && isContactUnique) {
      console.log("found");
      const updatedContacts = makeSureUnique([...contacts, foundObject]);
      dispatch(setContacts(updatedContacts));
      const docRef = doc(db, "users", currentUser?.email);
      const docSnap = await getDoc(docRef);



      if (docSnap.exists()) {
        const userData = docSnap.data();
        console.log({userData})
        const updatedFriends = [...userData.friends, foundObject.name];
        await updateDoc(docRef, { friends: updatedFriends });
      } else {
        console.log("No such document!");
        ``;
      }
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

'use client'
import React, { useEffect } from "react";
import ContactItem from "./ContactItem";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/redux/store";
import { useDispatch } from "react-redux";
import { setContacts, setDbusers, setFriendArr } from "@/app/lib/redux/Features/contacts/contactsSlice";
import {db} from "@/app/(firebase)/firebase";
import { DocumentData, doc, getDoc } from "firebase/firestore";


function Contacts({fetchedDB}:{fetchedDB:DocumentData[]}) {
  
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const friendsArr = useSelector((state: RootState) => state.contacts.friendArr);
  const dbUsers = useSelector((state: RootState) => state.contacts.dbUsers);
  const currentUser = useSelector((state: RootState) => state.context.user);
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(setDbusers(fetchedDB));
    //fill contacts with friendsArr that is searched in firebase firestore call this inside contacts component and share with other components
   
  }, [dbUsers]);
  useEffect(() => {
    if (!dbUsers) return;
     dispatch(setFriendArr({dbUsers,currentUser}));
    console.log(friendsArr);
    if (friendsArr.length == 0) return;
      const newContacts:DocumentData[] = [];
      (async () => {
        for (const friend of friendsArr) {
          const docRef = doc(db, "users", friend);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            newContacts.push(docSnap.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        }
        dispatch(setContacts(newContacts));
      });
  } , [ dbUsers]); 
  const searchText = useSelector(
    (state: RootState) => state.search.searchText
  );
  const searchedContacts = contacts.filter((contact) => {
    return contact.name.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <>
      {searchedContacts.map((contact, index) => (
        <ContactItem contact={contact} key={index}></ContactItem>
      ))}
    </>
  );
}

export default Contacts;

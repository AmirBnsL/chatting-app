"use client";
import React, { useEffect } from "react";
import ContactItem from "./ContactItem";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/redux/store";
import { useDispatch } from "react-redux";

import {
  setContacts,
  setDbusers,
  setFriendArr,
} from "@/app/lib/redux/Features/contacts/contactsSlice";
import { db } from "@/app/(firebase)/firebase";
import { DocumentData, collection, getDocs, query,where, } from "firebase/firestore";


async function getDocFromName(name: string) {
        const q = query(collection(db,'users'),where('name','==',name));
        const docSnap = await getDocs(q);
        if (docSnap.empty) { console.log("No such  document!");
        return 
        
        } else {
          // doc.data() will be undefined in this case
          return docSnap.docs[0].data();
        }
      }






function Contacts({ fetchedDB }: { fetchedDB: DocumentData[] | null}) {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
    const dbUsers = useSelector((state: RootState) => state.contacts.dbUsers);
  const currentUser = useSelector((state: RootState) => state.context.user);
  const dispatch = useDispatch();
    
  
  const fillFromfbDocs =async (friendsArr:Array<string>) => {
    // gets each friends and pushes it into newContacts from firebase documents in firestore
    const newContacts: DocumentData[] = [];
      for (const friend of friendsArr) {
        const friendDoc = await getDocFromName(friend);
        console.log({friendDoc}) //undefined
        friendDoc && newContacts.push(friendDoc);
      }
    return newContacts;
    }

  const updateContacts = async (friendArr:Array<string>) => {
    const newContacts = await fillFromfbDocs(friendArr); 
    console.log({newContacts})
    dispatch(setContacts(newContacts));
  };

  useEffect(() => {
    dispatch(setDbusers(fetchedDB));
    //fill contacts with friendsArr that is searched in firebase firestore call this inside contacts component and share with other components
  }, []);
  useEffect(() => {    
    if (!dbUsers) return;
    const newFriendsArr = fetchedDB?.filter((user: DocumentData) => {
      return user.name == currentUser?.displayName;
    })[0].friends
    console.log({newFriendsArr});
    updateContacts(newFriendsArr);
    console.log(contacts)
    } 
  , [dbUsers]);



  const searchText = useSelector((state: RootState) => state.search.searchText);
  
  const searchedContacts = contacts?.filter((contact) => {
    return contact.name.toLowerCase().includes(searchText.toLowerCase());

  })
  return (
    <>

      {fetchedDB && searchedContacts?.map((contact, index) => (
        <ContactItem contact={contact} key={index}></ContactItem>
      ))}
    </>
  );
}

export default Contacts;

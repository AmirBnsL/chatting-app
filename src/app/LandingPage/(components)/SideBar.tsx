"use client";
import React, { useContext, useEffect } from "react";
import { db } from "@/app/(firebase)/firebase";
import { getDoc, doc, DocumentData } from "firebase/firestore";
import { AuthContext } from "@/app/(firebase)/AuthContext";
import SearchBar from "./(components)/SearchBar";
import { getContacts } from "./contactFetch";
import Contacts from "./Contacts";
import AddingElement from "./AddingElement";
import HamburgerBar from "./HamburgerBar";
/* async function getContacts() {
      const res = await fetch('./db.json');
      if (!res.ok) {
          throw new Error('Something went wrong');
      }
      const data = await res.json();
      return await data;
  }
  */
function SideBar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dbUsers, setDbUsers] = React.useState<DocumentData>([]); //is the list of friends of the current user
  const [searchValue, setSearchValue] = React.useState("");
  const [contacts, setContacts] = React.useState<DocumentData[]>([]); //is the list of friends of the current user that is gonna
  const [friendsArr, setFriendsArr] = React.useState([]); //is the list of friends of the current user that is gonna
  const [isLoading, setIsLoading] = React.useState(true);
  const currentUser = useContext(AuthContext); //it has currentUser.uid , currentUser.email , currentUser.displayName inside user object inside it
  useEffect(() => {
    /* const FetchedFriends = async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        const fetchedUsers = querySnapshot.docs.map((doc) => doc.data());
        setDbUsers(fetchedUsers);
        console.log("fetched Users", fetchedUsers);
        const fetchedCurrentUser = fetchedUsers.filter(
          (user) => user.name == currentUser.user.email
        );
        setFriendsArr(fetchedCurrentUser[0].friends);
      };
      FetchedFriends(); */
    getContacts({ db, currentUser }).then((res) => {
      setFriendsArr(res[0]);
      setDbUsers(res[1]);
      setIsLoading(false);
    });
  }, []);
  useEffect(() => {
    //fill contacts with friendsArr that is searched in firebase firestore
    if (isLoading) return;
    const newContacts = [];
    if (friendsArr.length == 0) return;
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
      setContacts(newContacts);
    })();
  }, [dbUsers]);
  useEffect(() => {
    console.log("contacts:", contacts);
    console.log("DBusers", dbUsers);
  }, [contacts, dbUsers]);
  return (
    <>
      <div
        className={`md:basis-3/12 basis-1/4 bg-blue-gradient flex-shrink-1 flex flex-col items-center gap-1 h-screen overflow-scroll `}
      >
        <div
          className={`flex justify-center items-center h-20 w-full`}
        >
          <SearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
          ></SearchBar>
        </div>
        <Contacts
          contacts={contacts.filter((contact) =>
            contact.name.includes(searchValue)
          )}
        ></Contacts>

        <AddingElement
          dbUsers={dbUsers}
          contacts={contacts}
          setContacts={setContacts}
        />
      </div>
      <div
        className={`md:basis-1/4 basis-1/3 bg-blue-950 flex  flex-col w-[27vw] md:w-[27vw] items-center gap-1 absolute h-screen ${
          isOpen ? "" : "translate-x-[-100%]"
        } transition-all duration-300`}
      >
        <HamburgerBar setIsOpen={setIsOpen} isOpen={isOpen}></HamburgerBar>
      </div>
    </>
  );
}

export default SideBar;

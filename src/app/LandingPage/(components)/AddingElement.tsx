'use client'
import React from 'react'
import AddButton from './(components)/AddButton';
import AddContact from './(components)/AddContact';
import { DocumentData } from 'firebase/firestore';

interface AddingElementProps {
    dbUsers: DocumentData[];
    contacts: DocumentData[];
    setContacts: React.Dispatch<React.SetStateAction<DocumentData[]>>;
}

function AddingElement({dbUsers, contacts, setContacts}: AddingElementProps) {
    const [isAdding, setIsAdding] = React.useState(true);

  return (
    <>
    {isAdding ? (
        <AddButton setIsAdding={setIsAdding}></AddButton>
      ) : (
        <AddContact
          dbUsers={dbUsers}
          contacts={contacts}
          setContacts={setContacts}
        ></AddContact>
      )}
    </>
  )
}

export default AddingElement
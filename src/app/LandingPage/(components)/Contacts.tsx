import React from 'react';
import ContactItem from './ContactItem';
import { DocumentData } from 'firebase/firestore';

function Contacts({contacts}: {contacts: DocumentData[]}) {
  return (
    <>
     {contacts.map((contact, index) => (
        <ContactItem contact={contact} key={index}></ContactItem>
      ))}
    </>
  )
}

export default Contacts
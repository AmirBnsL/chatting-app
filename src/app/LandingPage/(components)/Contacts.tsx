import React from 'react';
import ContactItem from './ContactItem';

function Contacts({contacts}) {
  return (
    <>
     {contacts.map((contact, index) => (
        <ContactItem contact={contact} key={index}></ContactItem>
      ))}
    </>
  )
}

export default Contacts
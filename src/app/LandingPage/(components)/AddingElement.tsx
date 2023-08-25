'use client'
import React from 'react'
import AddButton from './(components)/AddButton';
import AddContact from './(components)/AddContact';

function AddingElement({dbUsers, contacts, setContacts}) {
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
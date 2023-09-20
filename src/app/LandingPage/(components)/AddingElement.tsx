'use client'
import React from 'react'
import AddButton from './(components)/AddButton';
import AddContact from './(components)/AddContact';
import { DocumentData } from 'firebase/firestore';


function AddingElement() {
    const [isAdding, setIsAdding] = React.useState(true);

  return (
    <>
    {isAdding ? (
        <AddButton setIsAdding={setIsAdding}></AddButton>
      ) : (
        <AddContact
        ></AddContact>
      )}
    </>
  )
}

export default AddingElement
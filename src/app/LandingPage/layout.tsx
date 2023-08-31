
import React from 'react'

function layout({children} : {children: React.ReactNode}) {

  return (
    <div className='flex w-screen overflow-hidden relative'>
        {children}
    </div>
  )
}

export default layout
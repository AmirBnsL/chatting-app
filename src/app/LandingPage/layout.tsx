
import React from 'react'

function layout({children} : {children: React.ReactNode}) {

  return (
    <div className='flex w-screen '>
        {children}
    </div>
  )
}

export default layout
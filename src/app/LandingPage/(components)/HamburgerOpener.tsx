'use client'

import React from 'react'
import HamburgerBar from './HamburgerBar'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/lib/redux/store'

function HamburgerOpener() {
  const isOpen = useSelector((state:RootState) => state.hamburger.isOpen);
    
  return (
    <div
        className={`md:basis-1/4 basis-1/3 bg-blue-950 flex  flex-col w-[27vw] md:w-[27vw] items-center gap-1 absolute h-screen ${
          isOpen ? "" : "translate-x-[-100%]"
        } transition-all duration-300`}
      >
        <HamburgerBar></HamburgerBar>
      </div>
  )
}

export default HamburgerOpener
'use client'

import { useSelector } from "react-redux";
import { RootState } from "../lib/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


function KickOutRouter({children}:{children:React.ReactNode}) {
    const user = useSelector((state: RootState) => state.context.user);
    const router = useRouter();

    useEffect(() => {
        if (user == null) {
          router.push("/");
        }
      }, [user]);
      console.log(user);

  return (
    <>
    {children}
    </>

    
  )
}

export default KickOutRouter
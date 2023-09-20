'use client'
import React, { ReactNode } from "react";
import { User, getAuth } from "firebase/auth";
import app from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../lib/redux/Features/context/contextSlice";

export const authInstance = getAuth(app);

export interface SerializedUser {
    uid: string | null,
    email: string | null,
    displayName: string | null,
    photoURL: string | null,
}


export const AuthProvider = ({ children }:{children:ReactNode}) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(true); 

    React.useEffect(() => {
        const unsubscribe =onAuthStateChanged(authInstance, (user) => {
            console.log({user})
             const serialziedUser : SerializedUser | null =
            user && {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
            }
         dispatch(setUser(serialziedUser));
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    return (
        <>
        {!loading && children}</>
        )

}
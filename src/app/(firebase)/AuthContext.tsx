'use client'
import React from "react";
import { getAuth } from "firebase/auth";
import app from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

export const authInstance = getAuth(app);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true); 

    React.useEffect(() => {
        const unsubscribe =onAuthStateChanged(authInstance, (user) => {
            if (user) {setUser(user);}
            else {setUser(null);}

            setLoading(false);
        });
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ user}}>
            {!loading && children}
        </AuthContext.Provider> 
        )

}
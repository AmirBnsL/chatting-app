'use client'
import React, { ReactNode } from "react";
import { User, getAuth } from "firebase/auth";
import app from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

export const authInstance = getAuth(app);

interface AuthContextType {
    user: User | null;
}
export const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }:{children:ReactNode}) => {

    const [user, setUser] = React.useState<User | null >(null);
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
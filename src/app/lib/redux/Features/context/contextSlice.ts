'use client'
import { createSlice } from "@reduxjs/toolkit";
import { FirebaseError } from "firebase/app";
import { SerializedUser } from "@/app/(firebase)/AuthContext";
import { DocumentData } from "firebase/firestore";
interface ContextState {
    user: SerializedUser | null,
    error:FirebaseError | null,
    currentChat: DocumentData | null,
}

const initialState: ContextState = {
    user: null,
    error:null,
    currentChat: null,
};

export const contextSlice = createSlice({
    name: "authContext",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
        ,
        setCurrentUser: (state, action) => {
            state.currentChat = action.payload;
        }
    }
});



export const { setUser,setCurrentUser } = contextSlice.actions;
export default contextSlice.reducer;

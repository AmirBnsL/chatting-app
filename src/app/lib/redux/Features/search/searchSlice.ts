import { createSlice } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore/lite";
import { type } from "os";


interface SearchState {
    searchText: string,
    searchedContacts: DocumentData[] | null;
}


const initialState: SearchState = {
    searchText:'',
    searchedContacts: null,
    
};

interface searchedContactsPayload {
    type: string;

    payload: {
    contacts: DocumentData[];
    searchText: string;
    };
}

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.searchText = action.payload;
        }
        ,
        setSearchedContacts: (state, action:searchedContactsPayload) => {
            state.searchedContacts = action.payload.contacts?.filter((contact) => {
                return contact.name.toLowerCase().includes(action.payload.searchText.toLowerCase());
            
              });
        }
    }
});


export const { setSearch , setSearchedContacts } = searchSlice.actions;
export default searchSlice.reducer;

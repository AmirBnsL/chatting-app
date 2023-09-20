import { configureStore } from "@reduxjs/toolkit";
import contextSlice from "./Features/context/contextSlice";
import searchSlice from "./Features/search/searchSlice";
import hamburgerSlice from "./Features/hamburger/hamburgerSlice";
import contactsSlice from "./Features/contacts/contactsSlice";

const store = configureStore({
    reducer: { 
        context: contextSlice,
        search: searchSlice,
        hamburger: hamburgerSlice,
        contacts: contactsSlice,
    }

});


export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
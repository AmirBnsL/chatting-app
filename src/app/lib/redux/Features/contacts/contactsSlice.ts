import { SerializedUser } from "@/app/(firebase)/AuthContext";
import { createSlice } from "@reduxjs/toolkit";
import { DocumentData } from "firebase/firestore";

interface contactsState {
  contacts: DocumentData[]; //show contacts
  dbUsers: DocumentData[] | null; //all firebase store users
  friendArr: DocumentData[]; //friendslist
}

const initialState: contactsState = {
  contacts: [],
  dbUsers: null,
  friendArr: [],
};
interface friendArrPayload {
  type: string;

  payload: {
    dbUsers: DocumentData[] | null;
    currentUser: SerializedUser | null;
  };
}

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    setDbusers: (state, action) => {
      state.dbUsers = action.payload;
    },
    setFriendArr: (state, action: friendArrPayload) => {
      /*  const fetchedCurrentUser = fetchedUsers.filter(
                (user) => user.name == currentUser?.displayName
                ); */
      state.friendArr = action.payload.dbUsers?.filter((user: DocumentData) => {
        return user.name == action.payload.currentUser?.displayName;
      })[0].friends;
    },
  },
});

export const { setContacts, setDbusers, setFriendArr } = contactsSlice.actions;
export default contactsSlice.reducer;

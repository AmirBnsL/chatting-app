//unintended pun in the name of the file

import { createSlice } from "@reduxjs/toolkit";

interface HamburgerState {
    isOpen: boolean;
}

const initialState: HamburgerState = {
    isOpen: false,
};

export const hamburgerSlice = createSlice({
    name: "hamburger",
    initialState,
    reducers: {
        toggleHamburger: (state) => {
            state.isOpen = !state.isOpen;
        }
    }
});



export const { toggleHamburger } = hamburgerSlice.actions;
export default hamburgerSlice.reducer;

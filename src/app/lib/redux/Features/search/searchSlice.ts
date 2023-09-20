import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
    searchText: string;
}


const initialState: SearchState = {
    searchText:'',
    
};

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.searchText = action.payload;
        }
    }
});


export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;

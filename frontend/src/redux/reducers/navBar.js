import { createSlice } from "@reduxjs/toolkit";

export const navBar = createSlice({
    name: 'navBarState',
    initialState: {
        index: 0,
    },
    reducers: {
        setNavBar: (state, action) => {
            state.index = action.payload.index;
        },
    }
})

export const { setNavBar } = navBar.actions

export default navBar.reducer
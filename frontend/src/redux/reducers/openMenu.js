import { createSlice } from "@reduxjs/toolkit";

function isMobileDevice() {
    const mobileWidth = 768;
    if (window.innerWidth < mobileWidth) return true; else return false; 
  }


export const openMenu = createSlice({
    name: 'openMenuState',
    initialState: {
        value: isMobileDevice() ? false : true,
    },
    reducers: {
        reverse: (state) => {
            state.value = !state.value;
        },
    }
})

export const { reverse } = openMenu.actions

export default openMenu.reducer
import { createSlice } from "@reduxjs/toolkit";

export const loginState = createSlice({
    name: 'loginState',
    initialState: {
        isLogin: window.localStorage.getItem('token') ? true : false,
        phone: '',
        password: ''
    },
    reducers: {
        setLoginState: (state) => {
            state.isLogin = true;
        },
        setLogoutState: (state) => {
            state.isLogin = false;
        },
        setAuthInfoState: (state, action) => {
            state.phone = action.payload.phone
            state.password = action.payload.password
        },
    }
})

export const { setLoginState, setLogoutState, setAuthInfoState } = loginState.actions

export default loginState.reducer
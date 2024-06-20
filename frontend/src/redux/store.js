import { configureStore } from "@reduxjs/toolkit";
import openMenuReducer from './reducers/openMenu'
import loginReducer from './reducers/loginState'
import navBarReducer from './reducers/navBar'

export default configureStore({
    reducer: {
        openMenuState: openMenuReducer,
        loginState: loginReducer,
        navBarState: navBarReducer,
    },
})
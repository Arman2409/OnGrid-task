import {configureStore} from "@reduxjs/toolkit";
import logInSlice from "./logInSlice";
import mainPageSlice from "./mainPageSlice";

const reducers = {
    logIn: logInSlice,
    mainPage: mainPageSlice,
}

const store = configureStore({reducer: reducers})

export default store;
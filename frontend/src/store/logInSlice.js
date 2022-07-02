import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "login",
    initialState: {isAuthenticated:null, user: {}},
    reducers: { 

    },
})

export default loginSlice.reducer
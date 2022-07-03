import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const signInThunk = createAsyncThunk(
     'login/signInThunk',
     async (user, thunkAPI) => {
        const response = axios.get('signIn', {params: {user}});
        thunkAPI.fulfillWithValue(response);
     }
);

const loginSlice = createSlice({
    name: "login",
    initialState: {isAuthenticated:null, user: {}},
    reducers: { 

    },
    extraReducers:{
    [signInThunk.fulfilled]: (state, action) => {
        state.signInResponse = action.payload;
    }
    }
})

export default loginSlice.reducer
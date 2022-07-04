import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getResultThunk = createAsyncThunk(
    'login/getResultThunk',
    async (_, { fulfillWithValue,rejectWithValue}) => {
       try {
         const api = '/getResult'
         const response = await axios.get(api);
            return fulfillWithValue(response.data);
       } catch (e) {
           if (!e.response) {
               throw e
             }
             return rejectWithValue(e.response)
       }
    }
);

export const logOutThunk = createAsyncThunk(
    'login/logOutThunk',
    async (_, { fulfillWithValue,rejectWithValue}) => {
       try {
         const api = '/logOut'
         const response = await axios.get(api);
            return fulfillWithValue(response.data);
       } catch (e) {
           if (!e.response) {
               throw e
             }
             return rejectWithValue(e.response)
       }
    }
);

const mainSlice = createSlice({
    name: "mainPage",
    initialState: {
        userResult: null,
        logOutResponse: null,
    },
    reducers: { 
        // ...
    },
    extraReducers: {
    [getResultThunk.fulfilled]: (state, action) => {
        state.userResult = action.payload;
    },
    [getResultThunk.rejected]: (state, action) => {
        state.userResult = {error: action.payload};
    },
    [logOutThunk.fulfilled]: (state, action) => {
        state.logOutResponse = action.payload;
    },
    [logOutThunk.rejected]: (state, action) => {
        state.logOutResponse = {error: action.payload};
    }
    }
})

export default mainSlice.reducer
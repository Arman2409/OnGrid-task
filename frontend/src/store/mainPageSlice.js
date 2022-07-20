import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getResultThunk = createAsyncThunk(
    'login/getResultThunk',
    async (_, { fulfillWithValue,rejectWithValue}) => {
       try {
         const api = '/api/getResult'
         const response = await axios.get(api);
            return fulfillWithValue(response.data);
       } catch (e) {
           if (!e.response) {
             console.error(e);
             }
             return rejectWithValue(e.response)
       }
    }
);

export const logOutThunk = createAsyncThunk(
    'login/logOutThunk',
    async (_, { fulfillWithValue,rejectWithValue}) => {
       try {
         const api = '/api/logOut'
         const response = await axios.get(api);
            return fulfillWithValue(response.data);
       } catch (e) {
           if (!e.response) {
               console.error(e);
             }
             return rejectWithValue(e.response.data)
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
       clearLogOutResponse: (state, action) => {
          state.logOutResponse = null;
       }
    },
    extraReducers: {
    [getResultThunk.fulfilled]: (state, action) => {
        state.userResult = action.payload;
    },
    [getResultThunk.rejected]: (state, action) => {
        state.userResult = {error: action.payload};
    },
    [logOutThunk.fulfilled]: (state, action) => {
        console.log(action.payload);
        state.logOutResponse = action.payload;
    },
    [logOutThunk.rejected]: (state, action) => {
        state.logOutResponse = {error: action.payload};
    }
    }
})

export const {clearLogOutResponse} = mainSlice.actions;
export default mainSlice.reducer
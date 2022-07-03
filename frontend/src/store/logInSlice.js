import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const signInThunk = createAsyncThunk(
     'login/signInThunk',
     async (user, { fulfillWithValue,rejectWithValue}) => {
        try {
          const api = '/signIn'
          const response = await axios.get(api, {params: user});
             return fulfillWithValue(response);
        } catch (e) {
            if (!e.response) {
                throw e
              }
              return rejectWithValue(e.response)
        }
        // console.log(response);
        // thunkAPI.fulfillWithValue(response.data);
     }
);

const loginSlice = createSlice({
    name: "login",
    initialState: {
        isAuthenticated:null,
        user: {},
        signInResponse: {}
    },
    reducers: { 
        // ...
    },
    extraReducers:{
    [signInThunk.fulfilled]: (state, action) => {
        console.log('fulfilled', action)
        state.signInResponse = action.payload;
    },
    [signInThunk.rejected]: (state, action) => {
        console.log('rejected', action.payload)
        state.signInResponse = action.payload;
    }
    }
})

export default loginSlice.reducer;
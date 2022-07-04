import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const signInThunk = createAsyncThunk(
     'login/signInThunk',
     async (user, { fulfillWithValue,rejectWithValue}) => {
        try {
          const api = '/signIn'
          const response = await axios.get(api, {params: user});
             return fulfillWithValue(response.data);
        } catch (e) {
            if (!e.response) {
                throw e
              }
              return rejectWithValue(e.response)
        }
     }
);

export const authenticateThunk = createAsyncThunk(
    'login/authenticateThunk',
    async (_, { fulfillWithValue,rejectWithValue}) => {
       try {
         const api = '/isAuthenticated';
         const response = await axios.get(api);
            return fulfillWithValue(response.data);
       } catch (e) {
             return rejectWithValue(e.message);
       }
    }
);

const loginSlice = createSlice({
    name: "login",
    initialState: {
        isAuthenticated:null,
        user: null,
        signInResponse: null,
    },
    reducers: { 
        clearResponse: (state,action) => {
            state.signInResponse = null;
        }
    },
    extraReducers:{
    [signInThunk.fulfilled]: (state, action) => {
        state.signInResponse = action.payload;
        if (typeof(action.paylaod) == 'object') {
            state.user = action.payload;
        }
    },
    [signInThunk.rejected]: (state, action) => {
        state.signInResponse = action.payload;
    },
    [authenticateThunk.fulfilled]: (state, action) => {
        console.log(action.payload);
        const isAuth = Boolean(action.payload.email);
       if (!isAuth) {
          state.user = {};
       } else {
          state.user = action.payload;
       }
    },
    [authenticateThunk.rejected]: (state, action) => {
        console.error(action.payload.message);
     },
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export const {clearResponse} = loginSlice.actions;
export default loginSlice.reducer;
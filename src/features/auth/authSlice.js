import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const authSlice = createSlice({

    name: "auth",
    initialState:{user:null,token:null},
    reducers: {
        setCredentials: (state, action) => {
            console.log('Setting credentials');
            console.log(action.payload);
          const { email, accessToken,id,emailVerified } = action.payload;
          state.user = email;
          state.token = accessToken;
          state.id = id;
          state.emailVerified = emailVerified;
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
            state.id=null;
            state.emailVerified=null;
        }
        }

});   


export const { setCredentials, logOut } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectAccessToken = (state) => state.auth.token;
export default authSlice.reducer;


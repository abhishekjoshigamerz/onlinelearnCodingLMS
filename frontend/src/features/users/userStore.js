import { createSlice } from "@reduxjs/toolkit";

export const userStore = createSlice({
    name: "user",
    initialState: {
        user: null,
    },
    reducers: {
        setUserData: (state, action) => {
            state.user = action.payload;
        }
    }
});

export const { setUserData } = userStore.actions;

export default userStore.reducer;
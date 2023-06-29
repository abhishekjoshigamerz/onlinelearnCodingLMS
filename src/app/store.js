import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { apiSlice } from "./api/apiSlice";
import userReducer from '../features/users/userStore';
import cartReducer from '../features/cart/cartStore';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        user: userReducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(apiSlice.middleware),
          
    devTools: true,
});

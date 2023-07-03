import { createSlice } from "@reduxjs/toolkit";

export const cartStore = createSlice({
    name: "cart",
    initialState: {
        cart: {},
    },
    reducers: {
        setCartData: (state, action) => {

          const { courseID, courseName, coursePrice, courseImage } = action.payload;
            
            state.cart[courseID] = {
                courseName: courseName,
                coursePrice: coursePrice,
                courseImage: courseImage,
                id: courseID,
            };    
        },
        removeCartData:(state, action)=>{
            const id  = action.payload;
            delete state.cart[id];
        },
        clearCart: (state) => {
            state.cart = {};
        }
    }
});

export const { setCartData, removeCartData,clearCart } = cartStore.actions;

export default cartStore.reducer;

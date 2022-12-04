import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name : "cart",
    initialState : {
        products : [],
        cartCount : 0,
        total : 0,
    },
    reducers : {
        addProduct : (state,action) => {
            state.cartCount += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        }
    }
});

export const {addProduct} = cartSlice.actions;
export default cartSlice.reducer;
import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: []
    },
    reducers: {
        addToCart(state, action) {
            if(state.products.map(item => item.id).includes(action.payload.id)) {
                state.products.map(item => item.id === action.payload.id && item.amount++)
            } else state.products.push({...action.payload, amount: 1})
        },
        removeFromCart(state, action) {
            if(state.products.filter(item => item.id === action.payload.id)[0].amount === 1) {
                state.products = state.products.filter(item => item.id !== action.payload.id)
            } else state.products.map(item => item.id === action.payload.id && item.amount--)
        },
        terminateFromCart(state, action) {
            state.products = state.products.filter(item => item.id !== action.payload.id)
        }
    }
})

export const {addToCart, removeFromCart, terminateFromCart} = cartSlice.actions

export default cartSlice.reducer
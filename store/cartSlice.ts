import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CartState {
  cartItems: Product[]
}

const initialState: CartState = {
  cartItems: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      if (state.cartItems.map(item => item.id).includes(action.payload.id)) {
        state.cartItems.map(item => item.id === action.payload.id && item.amount++);
      } else state.cartItems.push({...action.payload, amount: 1});
    },
    removeFromCart(state, action: PayloadAction<Product>) {
      if (state.cartItems.filter(item => item.id === action.payload.id)[0].amount === 1) {
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
      } else state.cartItems.map(item => item.id === action.payload.id && item.amount--);
    },
    terminateFromCart(state, action: PayloadAction<Product>) {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
    }
  }
});

export const cartActions = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
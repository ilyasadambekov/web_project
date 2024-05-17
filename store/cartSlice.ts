import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CartState {
  products: Product[]
}

const initialState: CartState = {
  products: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      if (state.products.map(item => item.id).includes(action.payload.id)) {
        state.products.map(item => item.id === action.payload.id && item.amount++);
      } else state.products.push({...action.payload, amount: 1});
    },
    removeFromCart(state, action: PayloadAction<Product>) {
      if (state.products.filter(item => item.id === action.payload.id)[0].amount === 1) {
        state.products = state.products.filter(item => item.id !== action.payload.id);
      } else state.products.map(item => item.id === action.payload.id && item.amount--);
    },
    terminateFromCart(state, action: PayloadAction<Product>) {
      state.products = state.products.filter(item => item.id !== action.payload.id);
    }
  }
});

export const cartActions = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
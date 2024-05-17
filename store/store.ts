import {configureStore} from "@reduxjs/toolkit";
import {api} from "./api";
import {filtersReducer} from './filtersSlice';
import {cartReducer} from './cartSlice';
import {modalReducer} from './modalSlice';
import {authReducer} from './authSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    filters: filtersReducer,
    cart: cartReducer,
    modal: modalReducer,
    auth: authReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
});

export type RootState = ReturnType<typeof store.getState>
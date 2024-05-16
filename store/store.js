import {configureStore} from "@reduxjs/toolkit";
import {api} from "@/store/api";
import filtersReducer from './filtersSlice'
import cartReducer from './cartSlice'
import modalReducer from './modalSlice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    filters: filtersReducer,
    cart: cartReducer,
    modal: modalReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
})
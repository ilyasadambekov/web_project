import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type Price = {
  min: string,
  max: string
}

interface FiltersState {
  query: string,
  sortBy: string,
  material: string,
  price: Price
}

const initialState: FiltersState = {
  query: '',
  sortBy: '',
  material: '',
  price: {
    min: '',
    max: ''
  }
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload
    },
    setSortBy(state, action: PayloadAction<string>) {
      state.sortBy = action.payload
    },
    setMaterial(state, action: PayloadAction<string>) {
      state.material = action.payload
    },
    setPrice(state, action: PayloadAction<Price>) {
      state.price = action.payload
    },
    clearFilters(state) {
      state.query = ''
      state.sortBy = ''
      state.material = ''
      state.price = {
        min: '',
        max: ''
      }
    }
  }
})

export const filtersActions = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
import {createSlice} from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    query: '',
    sortBy: '',
    material: '',
    price: {
      min: '',
      max: ''
    }
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload
    },
    setSortBy(state, action) {
      state.sortBy = action.payload
    },
    setMaterial(state, action) {
      state.material = action.payload
    },
    setPrice(state, action) {
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

export const {
  setQuery,
  setSortBy,
  setMaterial,
  setPrice,
  clearFilters
} = filtersSlice.actions

export default filtersSlice.reducer
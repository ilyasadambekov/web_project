import {createSlice} from "@reduxjs/toolkit";

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        query: '',
        sortBy: '',
        category: '',
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
        setCategory(state, action) {
            state.category = action.payload
        },
        setPrice(state, action) {
            state.price = action.payload
        },
        clearFilters(state) {
            state.query = ''
            state.sortBy = ''
            state.category = ''
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
    setCategory,
    setPrice,
    clearFilters
} = filtersSlice.actions

export default filtersSlice.reducer
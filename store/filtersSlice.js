import {createSlice} from "@reduxjs/toolkit";

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
        query: '',
        categories: []
    },
    reducers: {
        setQuery(state, action) {
            state.query = action.payload
        },
        addCategory(state, action) {
            state.categories.push(action.payload)
        },
        removeCategory(state, action) {
            state.categories = state.categories.filter(item => item !== action.payload)
        }
    }
})

export const {setQuery, addCategory, removeCategory} = filtersSlice.actions

export default filtersSlice.reducer
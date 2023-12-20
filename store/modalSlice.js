import {createSlice} from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        status: 'closed'
    },
    reducers: {
        setModal(state, action) {
            state.status = action.payload
        },
        closeModal(state) {
            state.status = 'closed'
        }
    }
})

export const {setModal, closeModal} = modalSlice.actions

export default modalSlice.reducer
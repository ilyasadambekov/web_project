import {createSlice} from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    activeModal: null,
    isOpen: false,
  },
  reducers: {
    openModal(state, action) {
      state.activeModal = {
        name: action.payload.name,
        position: action.payload.position
      };
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
    },
    clearActiveModal(state) {
      state.activeModal = null;
    }
  }
});

export const {openModal, closeModal, clearActiveModal} = modalSlice.actions;

export default modalSlice.reducer;
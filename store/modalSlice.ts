import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type ModalName = 'auth' | 'cart'

interface ModalState {
  activeModal: null | ModalName,
  isOpen: boolean
}

const initialState: ModalState = {
  activeModal: null,
  isOpen: false
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<ModalName>) {
      state.activeModal = action.payload;
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

export const modalActions = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
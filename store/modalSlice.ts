import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type ActiveModal = {
  name: 'auth' | 'cart',
  position: string
}

interface ModalState {
  activeModal: null | ActiveModal,
  isOpen: boolean,
}

const initialState: ModalState = {
  activeModal: null,
  isOpen: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<ActiveModal>) {
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

export const modalActions = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
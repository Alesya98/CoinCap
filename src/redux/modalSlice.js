import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isOpenPortfolio: false,
        isOpen: false,
        modalData: null
    },
    reducers: {
        openModal: (state, action) => {
            // console.log(action.payload)
            state.isOpen = true
            state.modalData = action.payload
        },
        closeModal: (state) => {
            state.isOpen = false
            state.modalData = null
        },
        openPortfolio: (state) => {
            state.isOpenPortfolio = true
        },
        closePortfolio: (state) => {
            state.isOpenPortfolio = false
        }
    },
    selectors: {
        modalSelector: (selector) => selector
     }
})

export const { openModal, closeModal, openPortfolio, closePortfolio } = modalSlice.actions;
export const { modalSelector } = modalSlice.selectors;
export default modalSlice.reducer;
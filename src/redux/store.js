import { configureStore } from "@reduxjs/toolkit";
import coinsSlice from './coinsSlice'
import modalSlice from './modalSlice'
import portfolioSlice from './portfolioSlice'

export const store = configureStore({
    reducer: {
        coins: coinsSlice,
        modal: modalSlice,
        portfolio: portfolioSlice
    }
})
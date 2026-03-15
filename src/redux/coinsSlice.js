import { createSlice } from "@reduxjs/toolkit";
import { getInfoCoinCap } from "../api/ApiCoinCap";


const coinsSlice = createSlice({
    name: 'coins',
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(getInfoCoinCap.fulfilled, (state, action) => {
            // console.log(action.payload)
            state.items = action.payload;
            ((state.loading = false), (state.error = false));
          })
          .addMatcher(
            (action) => action.type.endsWith("/pending"),
            (state) => {
              ((state.loading = true), (state.error = false));
            },
          )
            .addMatcher((action) => action.type.endsWith("/rejected"),
                (state, action) => {
                    state.loading = false,
                    state.error = action.error.message
            });
    },
    selectors: {
        cionsSelector: (state) => state
    }
})

export default coinsSlice.reducer
export const { cionsSelector } = coinsSlice.selectors
import { createSlice } from "@reduxjs/toolkit";

const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState: {
        tasks: []
    },
    reducers: {
        addTasks: (state, action) => {
            // console.log('slicePortfolio:', action.payload)
            state.tasks.push(action.payload)
        },
        deleteTask: (state, action) => {
            console.log(action.payload)
        }
    },
    selectors: {
        portfolioSelector: (state) => state.tasks
    }
})

export const { addTasks, deleteTask } = portfolioSlice.actions;
export default portfolioSlice.reducer
export const {portfolioSelector} = portfolioSlice.selectors
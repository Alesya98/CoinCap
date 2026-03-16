import { createSlice } from "@reduxjs/toolkit";

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: {
    tasks: JSON.parse(localStorage.getItem("my_coins")) || [],
    resultPortfolio: 0,
  },
  reducers: {
    addTasks: (state, action) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((item) => {
        return item.modalData.id !== action.payload;
      });
    },
    setResultPortfolio: (state, action) => {
      state.resultPortfolio = action.payload;
    },
  },
  selectors: {
    portfolioSelector: (state) => state.tasks,
    resultSelector: (state) => state.resultPortfolio,
  },
});

export const { addTasks, deleteTask, setResultPortfolio } =
  portfolioSlice.actions;
export default portfolioSlice.reducer;
export const { portfolioSelector } = portfolioSlice.selectors;
export const { resultSelector } = portfolioSlice.selectors;

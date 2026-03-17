import { createSlice } from "@reduxjs/toolkit";

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: {
    tasks: JSON.parse(localStorage.getItem("my_coins")) || [],
    resultPortfolio: 0,
  },
  reducers: {
    addTasks: (state, action) => {
      const newTask = action.payload
      console.log('action', action.payload)
      console.log('newTask',newTask.modalData.id);

      const findTask = state.tasks.find(item => item.modalData.id === newTask.modalData.id)

      console.log('findTask',findTask)
      if (findTask) {
        findTask.total += Number(newTask.total)
      } else {
        state.tasks.push({
          ...newTask,
          total: Number(newTask.total),
        });
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((item) => {
        return item.modalData && item.modalData.id !== action.payload;
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

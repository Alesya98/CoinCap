import { configureStore } from "@reduxjs/toolkit";
import coinsSlice from "./coinsSlice";
import modalSlice from "./modalSlice";
import portfolioSlice from "./portfolioSlice";

const coinsMiddleWare = (store) => (next) => (action) => {
  const result = next(action);

  if (action.type.startsWith("portfolio/")) {
    const state = store.getState();
    localStorage.setItem("my_coins", JSON.stringify(state.portfolio.tasks));
  }

  return result;
};

export const store = configureStore({
  reducer: {
    coins: coinsSlice,
    modal: modalSlice,
    portfolio: portfolioSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coinsMiddleWare),
});

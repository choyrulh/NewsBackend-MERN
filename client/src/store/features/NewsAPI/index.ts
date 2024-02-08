import { combineReducers } from "@reduxjs/toolkit";
import allNewsReducer from "./fetchAllNewsApiSlice";
const rootReducer = combineReducers({
  news: allNewsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

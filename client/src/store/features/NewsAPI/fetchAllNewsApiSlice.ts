import axios from "axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { newsType } from "../../../type/newsType";

const axiosCreate = axios.create({
  baseUrl: "http://localhost:3000/api/v1/news",
});

export const STATUSES = {
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
};

export const fetchAllNewsApiSlice = createAsyncThunk("news-slice", async () => {
  const { data } = await axiosCreate.get<newsType[]>("");
  return data;
});

interface NewsState {
  news: newsType[];
  status: string;
  error: string | null;
}

const initialState: NewsState = {
  news: [],
  status: STATUSES.IDLE,
  error: null,
};

const allNewsSlice = createSlice({
  name: "news-slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllNewsApiSlice.pending, (state) => {
      state.status = STATUSES.LOADING;
    });
    builder.addCase(
      fetchAllNewsApiSlice.fulfilled,
      (state, action: PayloadAction<newsType[]>) => {
        state.status = STATUSES.IDLE;
        state.news = action.payload;
      }
    );
    builder.addCase(fetchAllNewsApiSlice.rejected, (state, action) => {
      state.status = STATUSES.ERROR;
      state.error = action.error.message as string;
    });
  },
});

export default allNewsSlice.reducer;

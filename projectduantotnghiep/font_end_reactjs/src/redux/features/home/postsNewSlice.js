import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import homeService from "./homeService";

export const getListPostNew = createAsyncThunk(
  "getListPostNew",
  async (thunkAPI) => {
    try {
      const data = await homeService.getPostNew();
      return data;
    } catch (error) {
      return error.message;
    }
  }
);
export const PostsNewSlice = createSlice({
  name: "PostsNew",
  initialState: {
    data: [],
    isLoading: false,
  },
  extraReducers: {
    [getListPostNew.pending]: (state) => {
      state.isLoading = true;
    },
    [getListPostNew.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.data = payload.datapost;
      return state;
    },
  },
});
export default PostsNewSlice.reducer;
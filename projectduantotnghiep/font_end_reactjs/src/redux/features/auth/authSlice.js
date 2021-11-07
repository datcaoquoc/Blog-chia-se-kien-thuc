import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService.js";

export const postLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await authService.login(email, password);
      return data;
    } catch (error) {
      return error.message;
    }
  }
);
export const postRegister = createAsyncThunk(
  "auth/register",
  async ({ name ,email, password }, thunkAPI) => {
    try {
      const data = await authService.register(name, email, password);
      return data;
    } catch (error) {
      return error.message;
    }
  }
);
export const postVerificationCode = createAsyncThunk(
  "auth/verificationcodes",
  async ({ code, email }, thunkAPI) => {
    try {
      const data = await authService.verifiCode(code, email);
      return data;
    } catch (error) {
      return error.message;
    }
  }
);



export const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: "",
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  reducers: {
    clearState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: {
    //đăng ký
    [postRegister.pending]: (state) => {
      state.isLoading = true
    },
    [postRegister.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.email = payload.email;
      state.message = payload.message;
      return state;
    },
    [postRegister.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
      state.message = "lỗi truy vấn";
    },
    // đăng nhập
    [postLogin.pending]: (state) => {
      state.isLoading = true
    },
    [postLogin.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = payload.message;
      state.email = payload.email;
      return state;
    },
    [postLogin.rejected]: (state) => {
      state.isLoading = false;
      state.isError = true;
      state.message = "lỗi truy vấn";
    },
    // xác thực mã code
    [postVerificationCode.pending]: (state) => {
      state.isLoading = true
    },
    [postVerificationCode.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = payload.message;
      return state;
    },

  },
});
export const { clearState } = authSlice.actions;
export default authSlice.reducer
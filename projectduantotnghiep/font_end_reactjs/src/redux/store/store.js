import { configureStore } from "@reduxjs/toolkit";
import authReduser from '../features/auth/authSlice';
export default configureStore({
  reducer: {
    auth: authReduser,
  },
})
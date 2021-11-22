import { configureStore } from "@reduxjs/toolkit";
import authReduser from '../features/auth/authSlice';
import  userReducer from "../features/user/userSlice";
import categoryReducer from "../features/category/categorySlice";
import postnewReducer from "../features/home/postsNewSlice";
import postsByCategoryReducer from "../features/home/postsByCategorySlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['isLogin']
};
const _persistedReducer = persistReducer(persistConfig, authReduser);

const store =  configureStore({
  reducer: {
    auth: _persistedReducer,
    user: userReducer,
    category: categoryReducer,
    postnew: postnewReducer,
    postbycategory: postsByCategoryReducer,
  },
})
export const persistor = persistStore(store);
export default store;
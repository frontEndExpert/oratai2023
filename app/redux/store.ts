import productsReducer from './features/productsReducer';
import authReducer from './features/authReducer';
import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';


const rootReducer = combineReducers({
    products: productsReducer,
    auth: authReducer
});

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware({serializableCheck: false}),
  });
  
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const authSlice  = (state: RootState) => state.auth;
export const productsSlice  = (state: RootState) => state.products;

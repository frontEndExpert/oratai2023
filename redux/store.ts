'use client'

import productsReducer from './features/productsReducer';
import authReducer from './features/authReducer';
import { combineReducers } from "redux";
import { configureStore, PayloadAction } from '@reduxjs/toolkit';
// import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const RootReducer = combineReducers({
    products: productsReducer,
    auth: authReducer
});

// {serializableCheck: false}
const store = configureStore({
    reducer: RootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware(),
});

export default store;

setupListeners(store.dispatch);
// export const wrapper = createWrapper(() => store);

// store.getState
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//export const useDispatch = () => useContext(store).dispatch;
export const authSlice = (state: RootState) => state.auth;
export const productsSlice = (state: RootState) => state.products;

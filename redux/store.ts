'use client'

import productsReducer from './features/productsReducer';
import authReducer from './features/authReducer';
import { combineReducers } from "redux";
import { configureStore, PayloadAction, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from "@reduxjs/toolkit/dist/query";
// import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'


const RootReducer = combineReducers({
    products: productsReducer,
    auth: authReducer
});

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: [thunk]
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware({
    //         serializableCheck: {
    //             ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //         },
    //     }).concat(thunk)
});

export default store;

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//export const useDispatch = () => useContext(store).dispatch;
export const authSlice = (state: RootState) => state.auth;
export const productsSlice = (state: RootState) => state.products;

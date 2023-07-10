'use client'

import productsReducer from './features/productsReducer';
import authReducer from './features/authReducer';
import { AnyAction, combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from './createNoopStorage';
import thunk from 'redux-thunk'
import {
    Transform,
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

type RootReducerType = ReturnType<typeof RootReducer>

let transforms: Transform<unknown, string, any, any>[] = [];

if (true) {
    const encrypt = encryptTransform({
        secretKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY || "123",
        onError: function (error: any) {
            // Handle the error.
            console.log("encrypt error", error);
        },
    });
    transforms = [encrypt];
}

const persistConfig = {
    key: 'root',
    storage,
    transforms,
};

const persistedReducer = persistReducer<RootReducerType, AnyAction>(persistConfig, RootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        const middleware = getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(thunk);

        return middleware
    },
    devTools: true,
});

export default store;

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const authSlice = (state: RootState) => state.auth;
export const productsSlice = (state: RootState) => state.products;

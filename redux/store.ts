'use client'

import productsReducer from './features/productsReducer';
import authReducer from './features/authReducer';
import { combineReducers } from "redux";
import { configureStore, PayloadAction, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from "@reduxjs/toolkit/dist/query";
//import { createWrapper, HYDRATE } from "next-redux-wrapper";
// import storage from "redux-persist/lib/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { encryptTransform } from "redux-persist-transform-encrypt";
//import thunk from "redux-thunk";
import {
    PersistConfig, Transform,
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from './createNoopStorage';

//combinedReducer
const RootReducer = combineReducers({
    products: productsReducer,
    auth: authReducer
});

let transforms: Transform<unknown, string, any, any>[] = [];

//if (process.env.NODE_ENV === "production") {
if (true) {
    const encrypt = encryptTransform({
        secretKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY || "123", // NEXT_PUBLIC_REDUX_SECRET,
        onError: function (error: any) {
            // Handle the error.
            console.log("encrypt error", error);
        },
    });
    transforms = [encrypt];
}

const persistConfig = {
    key: "root",
    storage,
    transforms,
};

const persistedReducer = persistReducer(persistConfig, RootReducer);


const store = configureStore({
    reducer: persistedReducer,     // process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => {
        const middleware = getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        });

        return middleware
    },
    devTools: true,
});

export default store;
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export type AppStore = ReturnType<typeof makeStore>;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//     ReturnType,
//     RootState,
//     unknown,
//     Action
// >;
// export const wrapper = createWrapper<AppStore>(makeStore);

export const authSlice = (state: RootState) => state.auth;
export const productsSlice = (state: RootState) => state.products;

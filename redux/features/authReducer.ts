'use client'

import React from 'react';
import { createSlice, createAsyncThunk, ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/database";


export type AuthState = {
    isAuthenticated: boolean;
    userId: string;
    error: string;
    loading: boolean;
    authShow: boolean;
    isAdmin: boolean;
    userDetails: any;
    path: string;
    email: string;
    //expiresIn?: number;
}

const initialState = {
    isAuthenticated: false,
    userId: "",
    error: "",
    loading: false,
    authShow: false,
    isAdmin: false,
    userDetails: null,
    path: '/',
    email: ""
    //expiresIn: 1000
};

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
// Initialize Realtime Database and get a reference to the service
const database = firebase.database();

export const auth = createAsyncThunk(
    'auth/auth',
    async (emailObj: { email: string, password: string, isSignup: boolean }, thunkAPI: any) => {
        const { dispatch } = thunkAPI
        const { email, password, isSignup } = emailObj;

        try {
            const userData = { email: "", isAdmin: false, localId: "", isAuthenticated: false };

            if (isSignup) {
                const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
                if (userCredential.user) {
                    const userObj = { email, isAdmin: false };
                    await firebase.database().ref('users/' + userCredential.user.uid).set(userObj);
                    userData.localId = userCredential.user.uid || "123";
                    userData.email = email;
                    userData.isAuthenticated = true;
                    userData.isAdmin = false;
                }
            } else {
                const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
                if (userCredential.user) {
                    const uid = userCredential.user.uid;
                    const isAdmin = await dispatch(getisAdmin(uid)).unwrap();
                    userData.localId = uid;
                    userData.email = email;
                    userData.isAuthenticated = true;
                    userData.isAdmin = isAdmin;
                }
            }

            dispatch(authClose());
            return { ...userData };
        } catch (error: any) {
            console.log("error", error)
            if (!error.response) {
                throw error;
            }
            return error;
        }
    }
);


export const getisAdmin = createAsyncThunk(
    'auth/getisAdmin',
    async (uid: string, thunkAPI: any) => {
        const { rejectWithValue, fulfillWithValue } = thunkAPI;
        let isAdmin = false;
        try {
            await firebase.database().ref('users/' + uid).once('value').then((snapshot) => {
                isAdmin = snapshot.val().isAdmin
            })
            return fulfillWithValue(isAdmin)
        }
        catch (error: any) {
            console.log("isadmin error", error)
            if (!error) {
                throw error;
            }
            return rejectWithValue(error);
        };
    }
);

export const authLogout = createAsyncThunk<void, void, any>(
    'auth/authLogout',
    async (_: void, thunkAPI: any) => {
        const { rejectWithValue } = thunkAPI;
        try {
            await firebase.auth().signOut();
            console.log('User signed out');
            return;
        } catch (error: any) {
            console.log('Error signing out:', error);
            return rejectWithValue(error);
        }
    }
);

const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authOpen: (state: AuthState) => {
            state.authShow = true;
            state.loading = false;
        },
        authClose: (state: AuthState) => {
            state.authShow = false;
            state.loading = true;
        },
    },
    extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
        builder.addCase(auth.pending, (state: AuthState) => {
            state.error = "";
            state.loading = true;
        }),
            builder.addCase(auth.fulfilled, (state: AuthState, action: PayloadAction<any>) => {
                state.isAuthenticated = true;
                state.userId = action.payload.localId;
                state.error = "";
                state.isAdmin = action.payload.isAdmin;
                state.loading = false;
            }),
            builder.addCase(auth.rejected, (state: AuthState, action: PayloadAction<any>) => {
                state.error = action.payload.toString();
                state.isAuthenticated = false;
                state.isAdmin = false;
            }),

            builder.addCase(getisAdmin.pending, (state: AuthState) => {
                state.error = "";
                state.loading = true;
            }),
            builder.addCase(getisAdmin.fulfilled, (state: AuthState, action: PayloadAction<boolean>) => {
                state.isAdmin = action.payload;
                state.error = "";
                state.loading = false;
            }),
            builder.addCase(getisAdmin.rejected, (state: AuthState, action: any) => {
                state.isAdmin = false;
                state.error = action.payload.toString();
                state.loading = false;
            })

        builder.addCase(authLogout.pending, (state: AuthState) => {
            state.error = "";
            state.loading = true;
        }),
            builder.addCase(authLogout.fulfilled, (state: AuthState) => {
                console.log('User signed out');
                state.isAuthenticated = false;
                state.userId = "";
                state.isAdmin = false;
                state.error = "";
                state.loading = false;
            }),
            builder.addCase(authLogout.rejected, (state: AuthState, action: PayloadAction<any>) => {
                state.error = action.payload.toString();
            })
    }
})


export const { authOpen, authClose } = authReducer.actions;

export default authReducer.reducer;
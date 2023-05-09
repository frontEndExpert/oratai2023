'use client'

import React from 'react';
import { createSlice, createAsyncThunk, ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import firebase from 'firebase/app';
import 'firebase/auth';
import "firebase/database";

// import { RejectedActionFromAsyncThunk } from '@reduxjs/toolkit/dist/matchers';


export type AuthState = {
    isAuthenticated: boolean;
    userId: string;
    error: string;
    loading: boolean;
    authRedirectPath: string;
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
    authRedirectPath: '/',
    authShow: false,
    isAdmin: false,
    userDetails: null,
    path: '/',
    email: ""
    //expiresIn: 1000
};

const firebaseConfig = {
    apiKey: "AIzaSyDW7ozYaZ9Z8_6pqHnyeVIJFNgwEkKrD_A",
    authDomain: "oratai-2018.firebaseapp.com",
    projectId: "oratai-2018",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "376642946923",
    appId: "oratai-2018",
    databaseURL: "https://oratai-2018.firebaseio.com",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
// Initialize Realtime Database and get a reference to the service
const database = firebase.database();

export const auth = createAsyncThunk(
    'auth/auth',
    async (emailObj: { email: string, password: string, isSignup: boolean }, { dispatch }) => {
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
                    console.log("isAdmin", isAdmin);
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


export const getisAdmin = createAsyncThunk<boolean, string, { rejectValue: string }>(
    'auth/getisAdmin',
    async (uid, { rejectWithValue, fulfillWithValue, getState }) => {
        let isAdmin = false;
        try {
            await firebase.database().ref('users/' + uid).once('value').then((snapshot) => {
                isAdmin = snapshot.val().isAdmin
            })
            //console.log("isAdmin", isAdmin)
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

export const authLogout = createAsyncThunk<void, void, { rejectValue: string }>(
    'auth/authLogout',
    async (_, { rejectWithValue }) => {
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
        // setToken: (state, action) => {
        //     state.token = action.payload;
        // },
        authOpen: (state: AuthState) => {
            state.authShow = true;
            state.loading = false;
        },
        authClose: (state) => {
            state.authShow = false;
            state.loading = true;
        },
        setAuthRedirectPath: (state, action: PayloadAction<string>) => {
            state.authRedirectPath = action.payload;
        },
    },
    extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
        builder.addCase(auth.pending, (state) => {
            state.error = "";
            state.loading = true;
        }),
            builder.addCase(auth.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.userId = action.payload.localId;
                state.error = "";
                state.isAdmin = action.payload.isAdmin;
                state.loading = false;
            }),
            builder.addCase(auth.rejected, (state, action: any) => {
                state.error = action.payload.toString();
                state.isAuthenticated = false;
                state.isAdmin = false;
            }),

            builder.addCase(getisAdmin.pending, (state) => {
                state.error = "";
                state.loading = true;
            }),
            builder.addCase(getisAdmin.fulfilled, (state, action) => {
                state.isAdmin = action.payload;
                state.error = "";
                state.loading = false;
            }),
            builder.addCase(getisAdmin.rejected, (state, action: any) => {
                state.isAdmin = false;
                state.error = action.payload.toString();
                state.loading = false;
            })

        builder.addCase(authLogout.pending, (state) => {
            state.error = "";
            state.loading = true;
        }),
            builder.addCase(authLogout.fulfilled, (state, action) => {
                console.log('User signed out');
                state.isAuthenticated = false;
                state.userId = "";
                state.isAdmin = false;
                state.error = "";
                state.loading = false;
            }),
            builder.addCase(authLogout.rejected, (state, action: any) => {
                state.error = action.payload.toString();
            })
    }
})


export const { authOpen, authClose, setAuthRedirectPath } = authReducer.actions;

export default authReducer.reducer;
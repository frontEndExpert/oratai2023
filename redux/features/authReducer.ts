'use client'

import React from 'react';
import {
    createSlice, createAsyncThunk, isRejectedWithValue,
    ActionReducerMapBuilder, PayloadAction, AsyncThunkPayloadCreator
} from "@reduxjs/toolkit";
import authAxios from 'axios';
import axios from '../../config/axios-firebase';
import firebase from 'firebase/app';
import 'firebase/auth';

import { RejectedActionFromAsyncThunk } from '@reduxjs/toolkit/dist/matchers';

export type AuthState = {
    token: string;
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
    token: "",
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
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const addUser = createAsyncThunk(
    'auth/addUser',
    async (dataObj: { email: string, userId: string }, { dispatch, rejectWithValue, fulfillWithValue }) => {
        try {
            let token = localStorage.getItem("token");
            const { email, userId } = dataObj;
            const user = { 'email': email, 'isAdmin': 'false' }
            const url = `/users/${userId}/.json?auth=${token}`
            const response = await axios.put(url, user)

            return fulfillWithValue(response);
        } catch (error: any) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data as string);
        };
    })

export const getUserDetails = createAsyncThunk(
    'auth/getUserDetails',
    async (userId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const response = await axios.get(`/users/${userId}/userDetails/userDetails.json`)
            //    .then( data => data.json() )
            console.log('getUserDetails response', response)
            return fulfillWithValue(response);
        } catch (error: any) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        };
    }
);


export const addUserDetails = createAsyncThunk(
    'auth/addUserDetails',
    async (userDetails, thunkAPI) => {
        try {
            let token = localStorage.getItem("token");
            let userId = localStorage.getItem("userId");

            const response = await axios.put(`/users/${userId}/userDetails.json?auth=${token}`, userDetails)
            //        .then( data => data.json() )
            return response;
        } catch (error: any) {
            if (!error.response) {
                throw error;
            }
            return isRejectedWithValue(error.response.data);
        };
    }
);


export const auth = createAsyncThunk(
    'auth/auth',
    async (emailObj: { email: string, password: string, isSignup: boolean }, { dispatch, rejectWithValue, fulfillWithValue }) => {
        try {
            const { email, password, isSignup } = emailObj;

            var userData = { email: "", isAdmin: false, idToken: "", localId: "", isAuthenticated: false } as { email: string, isAdmin: boolean, idToken: string, localId: string, isAuthenticated: boolean };

            if (isSignup) {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(async (userCredential) => {
                        // Signed in 
                        if (userCredential.user) {
                            console.log("userCredential", userCredential);

                            localStorage.setItem('userId', userCredential.user.uid);
                            localStorage.setItem('isAdmin', "false");
                            localStorage.setItem('token', userCredential.user.refreshToken);
                            // localStorage.setItem('expirationDate', expirationDate.toDateString());
                            userData.localId = userCredential.user.uid;
                            userData.email = email;
                            userData.isAuthenticated = true;
                            userData.isAdmin = false;
                            userData.idToken = userCredential.user.refreshToken
                            dispatch(setToken(userData.idToken));
                        }
                        // set up new user is database
                        const userObj = { email, userId: userData.localId }
                        dispatch(addUser(userObj));

                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log("error login", errorCode, errorMessage);
                    });
            } else {
                firebase.auth().signInWithEmailAndPassword(email, password)
                    .then(async (userCredential) => {
                        // Signed in
                        if (userCredential.user) {
                            console.log("userCredential", userCredential);
                            //const expirationDate = (lastSignInTime) + 10000; //credential.expirationDate;
                            const isAdmin = await dispatch(getisAdmin(email)).unwrap();
                            console.log("isAdmin", isAdmin);

                            localStorage.setItem('userId', userCredential.user.uid);
                            localStorage.setItem('isAdmin', isAdmin.toString());
                            localStorage.setItem('token', userCredential.user.refreshToken);
                            // localStorage.setItem('expirationDate', expirationDate.toDateString());
                            userData.localId = userCredential.user.uid;
                            userData.email = email;
                            userData.isAdmin = isAdmin;
                            userData.idToken = userCredential.user.refreshToken
                            dispatch(setToken(userData.idToken));
                        }

                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log("error login", errorCode, errorMessage);
                    });
            }


            // localStorage.setItem('expirationDate', expirationDate.toISOString());


            dispatch(authClose());
            return fulfillWithValue({ ...userData });
        } catch (error: any) {
            console.log("error", error)
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error);
        };
    }
);


export const getisAdmin = createAsyncThunk<boolean, string, { rejectValue: string }>(
    'auth/getisAdmin',
    async (email, { rejectWithValue, fulfillWithValue }) => {
        try {
            const response = await axios.get("/users.json")
            const userData = response.data

            const usersArr = Object.keys(userData).map(key => { return { ...userData[key], id: key } });
            let userArr = [];
            let isAdmin = false;
            if (email !== "") {
                userArr = usersArr.filter(user => user.email.toLowerCase() === email.toLowerCase());
                console.log("userArr", userArr)
                isAdmin = userArr[0].isAdmin;
            } else {
                isAdmin = localStorage.getItem("isAdmin") == "true" ? true : false;
            };
            return fulfillWithValue(isAdmin)
        }
        catch (error: any) {
            console.log("isadmin error", error)
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        };
    }
);


const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
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
        authLogout: (state) => {
            firebase.auth().signOut().then(() => {
                // Sign-out successful.
                console.log('User signed out');
                localStorage.removeItem('token');
                localStorage.removeItem('expirationDate');
                localStorage.removeItem('userId');
                state.token = "";
                state.userId = "";
                state.isAdmin = false;
            }).catch((error) => {
                console.log('Error User signed out');
            });

        },
    },
    extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
        builder.addCase(addUser.pending, (state: AuthState) => {
            state.error = "";
            state.loading = true;
        }),
            builder.addCase(addUser.fulfilled, (state, action) => {
                //console.log('userDetails payload', action.payload)
                state.userDetails = action.payload.toString() //.userDetails; userId
                state.loading = false;
            }),
            builder.addCase(addUser.rejected, (state, action) => {
                if (action.payload) {
                    //console.log('action.payload error', action.payload)
                    state.error = action.payload.toString() //.error;
                } else {
                    state.error = action.error.toString();
                }
            }),

            builder.addCase(auth.pending, (state) => {
                state.error = "";
                state.loading = true;
            }),
            builder.addCase(auth.fulfilled, (state, action) => {
                state.token = action.payload.idToken;
                state.userId = action.payload.localId;
                state.error = "";
                state.isAdmin = action.payload.isAdmin;
                state.loading = false;
                //state.expiresIn = parseInt(action.payload.expiresIn) * 1000;
            }),
            builder.addCase(auth.rejected, (state, action: any) => {
                state.error = action.payload.toString();
            }),
            builder.addCase(getisAdmin.pending, (state) => {
                state.error = "";
                state.loading = true;
            }),
            builder.addCase(getisAdmin.fulfilled, (state, action) => {
                state.isAdmin = action.payload.toString() === 'true';
                state.error = "";
                state.loading = false;
            }),
            builder.addCase(getisAdmin.rejected, (state, action: any) => {
                state.error = action.payload.toString();
            })
    }
})


export const { authOpen, authClose, setAuthRedirectPath, authLogout, setToken } = authReducer.actions;

export default authReducer.reducer;
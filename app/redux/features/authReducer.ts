import React from 'react';
import { createSlice, createAsyncThunk, isRejectedWithValue, 
    ActionReducerMapBuilder, PayloadAction, AsyncThunkPayloadCreator } from "@reduxjs/toolkit";
import authAxios from 'axios';
import axios from '../../config/axios-firebase';
import { RejectedActionFromAsyncThunk } from '@reduxjs/toolkit/dist/matchers';

export type AuthState = {
    token: string,
    userId: string,
    error: string,
    loading: boolean,
    authRedirectPath: string,
    authShow: boolean,
    isAdmin: boolean,
    userDetails: any,
    path: string,
    email: string,
    expiresIn: number
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
    email: "",
    expiresIn: 1000
} as AuthState;

export const addUser = createAsyncThunk(
    'auth/addUser',
    async ( dataObj: {email: string, userId: string}, { dispatch, rejectWithValue, fulfillWithValue } ) => {
        try {
            let token = localStorage.getItem("token");
            const { email, userId } = dataObj;
            const user = {'email': email, 'isAdmin': 'false'}
            const url = `/users/${userId}/.json?auth=${token}`
            const response = await axios.put( url, user ) 

            return fulfillWithValue(response);
        } catch( error: any ) {
                if(!error.response){
                    throw error;
                }
                return rejectWithValue(error.response.data as string);
            };
}) 

export const getUserDetails = createAsyncThunk(
    'auth/getUserDetails',
    async ( userId,  { rejectWithValue, fulfillWithValue } ) => {
        try {
                const response = await axios.get( `/users/${userId}/userDetails/userDetails.json`)
                //    .then( data => data.json() )
                console.log('getUserDetails response', response)
                return fulfillWithValue(response);
            } catch( error: any ) {
                if(!error.response){
                    throw error;
                }
                return rejectWithValue(error.response.data);
            };
    }
);


export const addUserDetails = createAsyncThunk(
    'auth/addUserDetails',
    async ( userDetails, thunkAPI ) => {
        try {
            let token = localStorage.getItem("token");
            let userId = localStorage.getItem("userId"); 
            
            const response = await axios.put( `/users/${userId}/userDetails.json?auth=${token}`,  userDetails )
            //        .then( data => data.json() )
                return response;
            } catch( error: any ) {
                if(!error.response){
                    throw error;
                }
                return isRejectedWithValue(error.response.data);
            };
    }
);


export const auth = createAsyncThunk(
    'auth/auth',
    async ( emailObj: { email: string, password: string, isSignup: boolean }, { dispatch, rejectWithValue, fulfillWithValue } ) => {
        try {
            const {email, password, isSignup} = emailObj;
            const authData = {
                email: email,
                password: password,
                returnSecureToken: true
            };
            let url = (isSignup) 
                ? 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDW7ozYaZ9Z8_6pqHnyeVIJFNgwEkKrD_A'
                : 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDW7ozYaZ9Z8_6pqHnyeVIJFNgwEkKrD_A';
                      
            const response =  await authAxios.post(url, authData);
                    const userData = response.data;
                    const expirationDate = new Date(new Date().getTime() + userData.expiresIn * 1000);
                    
                    localStorage.setItem('token', userData.idToken);
                    localStorage.setItem('expirationDate', expirationDate.toISOString());
                    localStorage.setItem('userId', userData.localId);
                    if (isSignup) {
                        // set up new user is database
                        const userObj = { email, userId:userData.localId }
                        dispatch(addUser(userObj ));
                    }
                   const isAdmin = await dispatch(getisAdmin(email)).unwrap();
                    localStorage.setItem('isAdmin', isAdmin.toString());
                    dispatch(authClose());
            return fulfillWithValue({...userData, isAdmin});
            } catch( error: any ) {
                console.log("error", error)
                if(!error.response){
                    throw error;
                }
                return rejectWithValue(error);
            };
        }
);


export const getisAdmin = createAsyncThunk<boolean, string, { rejectValue: string }>(
    'auth/getisAdmin',
    async ( email, { rejectWithValue, fulfillWithValue }  ) => {
        try {
                   const response = await axios.get("/users.json")
                   const userData = response.data

                    const usersArr = Object.keys(userData).map( key => {return {...userData[key] , id:key}} );
                    let userArr = [];
                    let isAdmin = false;
                    if (email !== "") {
                        userArr = usersArr.filter( user => user.email.toLowerCase() === email.toLowerCase())
                        isAdmin = userArr[0].isAdmin;
                    } else {
                        isAdmin = localStorage.getItem("isAdmin") == "true" ? true : false;
                    }; 
                return  fulfillWithValue(isAdmin)   
            } 
        catch( error: any ) {
                console.log("isadmin error", error)
                if(!error.response){
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
        authOpen: ( state) => {
            state.authShow = true;
            state.loading = false;
        },
        authClose: ( state) => {
            state.authShow = false;
            state.loading = true;
        },
        setAuthRedirectPath: (state, action) => {
            state.authRedirectPath = action.payload.path;
        }, //myTimeout
        authLogout: (state, action) => {
            localStorage.removeItem('token');
            localStorage.removeItem('expirationDate');
            localStorage.removeItem('userId');

            state.token = ""; 
            state.userId = ""; 
            state.isAdmin = false;
        },
    },
    extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
        builder.addCase(addUser.pending, (state) => {
            state.error = "";
            state.loading = true;
        }),
        builder.addCase(addUser.fulfilled, (state, action) => {
            console.log('userDetails payload', action.payload)
            state.userDetails = action.payload.toString() //.userDetails; userId
            state.loading = false;
        }),
        builder.addCase(addUser.rejected, (state, action) => {
            if (action.payload) {
                console.log('action.payload error', action.payload)
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
            state.expiresIn = parseInt(action.payload.expiresIn) * 1000;
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


export const { authOpen, authClose, setAuthRedirectPath, authLogout} = authReducer.actions;

export default authReducer.reducer;
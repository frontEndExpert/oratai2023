'use client'

import React from 'react';
import { createSlice, createAsyncThunk, ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import type { Dispatch } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import firebase from 'firebase/app';
import "firebase/database";
import { RootState } from '../store';
import { ThunkApiMetaConfig } from '@reduxjs/toolkit/dist/query/core/buildThunks';
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';


const firebaseConfig = {
  apiKey: "AIzaSyDW7ozYaZ9Z8_6pqHnyeVIJFNgwEkKrD_A",
  authDomain: "oratai-2018.firebaseapp.com",
  projectId: "oratai-2018",
  messagingSenderId: "376642946923",
  appId: "oratai-2018",
  databaseURL: "https://oratai-2018.firebaseio.com",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// Initialize Realtime Database and get a reference to the service
const database = firebase.database();

type AsyncThunkConfig = {
  /** return type for `thunkApi.getState` */
  state?: RootState
  /** type for `thunkApi.dispatch` */
  dispatch?: Dispatch
  /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
  extra?: unknown
  /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
  rejectValue?: unknown
  /** return type of the `serializeError` option callback */
  serializedErrorType?: unknown
  /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
  pendingMeta?: unknown
  /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
  fulfilledMeta?: unknown
  /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
  rejectedMeta?: unknown
}

// interface ThunkAPI<ReturnValue = any, State = RootState, ExtraArgument = any, SerializedErrorType = {}> {
//   dispatch: (action: PayloadAction) => Promise<ReturnValue>;
//   getState: () => State;
//   extra: ExtraArgument;
//   requestId: string;
//   signal: AbortSignal;
//   rejectWithValue: (
//       value: SerializedErrorType | ReturnType<SerializedError['toString']>,
//   ) => Promise<ReturnValue>;
// }

export type Product = {
  id: string;
  description: string;
  group_id: string;
  pattern_id: string;
  photo_url: string;
  retail_price: string;
  title: string;
  wholesale_price: string;
}

export type FireProduct = {
  description: string;
  group_id: string;
  pattern_id: string;
  photo_url: string;
  retail_price: string;
  title: string;
  wholesale_price: string;
  [key: string]: any;
}

export type ProductReducer = {
  loading: boolean;
  error: string;
  orders_loading: boolean;
  allProducts: Product[];
  productAdded: boolean;
  add2AllShow: boolean;
  prodShow: boolean;
  currentProductId: string;
  editShow: boolean;
  currentProductGroup: Product[];
  currentLanguage: string;
  globalformIsValid: boolean;
  pathname: string;
}

//<Promise<Product[] | Object>, void, ThunkAPI>
export const fetchProducts = createAsyncThunk<Product[], void, any>(
  'products/fetchProducts',
  async (_, thunkAPI: any): Promise<any> => {
    let fetchedProducts: Product[] = [];
    try {
      database.ref('allProducts').on('value', (snapshot) => {
        const data = snapshot.val();
        const keys = Object.keys(data)
        fetchedProducts = keys.map((key: string) => {
          return { id: key, ...data[key] }
        })
      })

      return thunkAPI.fulfillWithValue(fetchedProducts)
    } catch (error: any) {
      console.log("fetchProducts error", error)
      if (!error) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error);
    };
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (product: FireProduct, thunkAPI: any) => {
    try {
      const ref = database.ref('allProducts');
      const newProductRef = ref.push();
      const newProductId = newProductRef.key;

      if (!newProductId) {
        throw new Error('Failed to generate key for new product');
      }

      await newProductRef.set(product);
      //     var newPostKey = database.ref().child('allProducts').push().key;
      //     var newPostKey = database.ref('allProducts').push().key;
      //     var updates: { [key: string]: FireProduct } = {};
      //     updates['/allProducts/' + newPostKey] = product;
      //     database.ref().update(updates, (error) => {
      console.log("addProduct saved successfully!");
      return thunkAPI.fulfillWithValue(true);
    } catch (error: any) {
      console.error("addProduct error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const delProduct = createAsyncThunk(
  'products/delProduct',
  async (id: string, thunkAPI: any) => {
    try {
      if (!id) {
        throw new Error('id of product is invalid or missing')
      } else {
        await database.ref(`/allProducts/${id}`).remove();
      }
      console.log("delProduct saved successfully!");
      return thunkAPI.fulfillWithValue(true)
    } catch (error: any) {
      // The write failed...
      console.log("delProduct error", error);
      return thunkAPI.rejectWithValue(error);
    }
  });


export const editProduct = createAsyncThunk(
  'products/editProduct',
  async (productObj: { id: string, fireProduct: FireProduct }, thunkAPI: any) => {

    var updates: { [key: string]: FireProduct } = {};
    updates['/allProducts/' + productObj.id] = productObj.fireProduct;

    database.ref().update(updates, (error) => {
      if (error) {
        // The write failed...
        console.log("editProduct error", error);
        return thunkAPI.rejectWithValue(error);
      } else {
        // Data saved successfully!
        console.log("editProduct saved successfully!");
        return thunkAPI.fulfillWithValue(true)
      }
    });

  });


const initialState = {
  loading: true,
  error: "",
  orders_loading: false,
  allProducts: [] as Product[],
  productAdded: false,
  add2AllShow: false,
  prodShow: false,
  currentProductId: "",
  editShow: false,
  currentProductGroup: [] as Product[],
  currentLanguage: "en",
  globalformIsValid: false,
  pathname: "/",
};

export const productsReducer = createSlice({
  name: 'products',
  initialState,
  reducers: {
    add2AllOpen: (state: ProductReducer) => {
      state.add2AllShow = true;
    },
    add2AllClose: (state: ProductReducer) => {
      state.add2AllShow = false;
    },
    openProductPage: (state: ProductReducer) => {
      state.prodShow = true;
    },
    closeProductPage: (state: ProductReducer) => {
      state.prodShow = false;
    },
    openEdit: (state: ProductReducer, action: PayloadAction<string>) => {
      state.currentProductId = action.payload;
      state.editShow = true;
    },
    closeEdit: (state: ProductReducer) => {
      state.editShow = false;
    },
    updateCurrentProductId: (state: ProductReducer, action: PayloadAction<string>) => {
      state.currentProductId = action.payload;
    },
    updateCurrentProductGroup: (state: ProductReducer, action: PayloadAction<Product[]>) => {
      state.currentProductGroup = action.payload;
      state.loading = false;
    },
    changeLanguages: (state: ProductReducer, action: PayloadAction<string>) => {
      state.currentLanguage = action.payload
    },
    updateAllProducts: (state: ProductReducer, action: PayloadAction<Product[]>) => {
      state.allProducts = action.payload;
    },
    closeAdded: (state: ProductReducer) => {
      state.productAdded = false
    },
    openAdded: (state: ProductReducer) => {
      state.productAdded = true;
    },
    setPathname: (state: ProductReducer, action: PayloadAction<string>) => {
      state.pathname = action.payload;
    },
    setgFormIsValid: (state: ProductReducer, action: PayloadAction<boolean>) => {
      state.globalformIsValid = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<ProductReducer>) => {
    builder.addCase(fetchProducts.pending, (state: ProductReducer) => {
      state.loading = true;
    }),
      builder.addCase(fetchProducts.fulfilled, (state: ProductReducer, action: PayloadAction<Product[]>) => {
        state.allProducts = action.payload as unknown as Product[];
        state.loading = false;
      }),
      builder.addCase(fetchProducts.rejected, (state: ProductReducer, action: PayloadAction<any>) => {
        state.error = action.payload; //? action.payload.toString() : action.error.toString();
        state.loading = false;
      });
    builder.addCase(editProduct.pending, (state: ProductReducer) => {
      state.productAdded = false;
      state.loading = true;
    }),
      builder.addCase(editProduct.fulfilled, (state: ProductReducer) => {
        state.productAdded = true;
        state.loading = false;
      }),
      builder.addCase(editProduct.rejected, (state: ProductReducer, action: PayloadAction<any>) => {
        state.error = action.payload; //? action.payload.toString() : action.error.toString();
      }),
      builder.addCase(addProduct.pending, (state: ProductReducer) => {
        state.productAdded = false;
        state.loading = true;
      }),
      builder.addCase(addProduct.fulfilled, (state: ProductReducer) => {
        state.productAdded = true;
        state.loading = false;
        state.add2AllShow = false
      }),
      builder.addCase(addProduct.rejected, (state: ProductReducer, action: PayloadAction<any>) => {
        state.error = action.payload.error;
        state.productAdded = false;
        state.loading = false;
      }),
      builder.addCase(delProduct.pending, (state: ProductReducer) => {
        state.loading = true;
        state.productAdded = false;
      }),
      builder.addCase(delProduct.fulfilled, (state: ProductReducer) => {
        state.loading = false;
        state.productAdded = true;
        state.editShow = false;
        state.prodShow = false;
      }),
      builder.addCase(delProduct.rejected, (state: ProductReducer) => {
        state.error = ""
        state.loading = false;
      })
  }
});

export const actionTypes = productsReducer.actions;
export const { add2AllOpen, add2AllClose, openProductPage, closeProductPage, openEdit,
  closeEdit, updateCurrentProductId, updateCurrentProductGroup,
  changeLanguages, updateAllProducts, closeAdded, openAdded, setPathname, setgFormIsValid } = actionTypes;


export default productsReducer.reducer


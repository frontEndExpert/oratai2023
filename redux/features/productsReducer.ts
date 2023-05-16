'use client'

import React from 'react';
import { createSlice, createAsyncThunk, ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/database";


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


export const fetchProducts = createAsyncThunk(
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


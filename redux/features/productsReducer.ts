'use client'

import React from 'react';
import { createSlice, createAsyncThunk, isRejectedWithValue, ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import axios from '../../config/axios-firebase';

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

// fetch('/allProducts.json', {muteHttpExceptions: true})
//   fetch('https://oratai-2018.firebaseio.com/allProducts.json', {muteHttpExceptions: true}) 
export const fetchProducts = createAsyncThunk<Promise<Product[] | Object>, void, { rejectValue: string }>(
  'products/fetchProducts',
  async (): Promise<Product[] | Object> => {
    let fetchedProducts: Product[] = [];
    try {
      const response = await axios.get('/allProducts.json')
        .then(data => {
          console.log("data", data)
          return data
        })

      const keys = Object.keys(response.data)
      const valuesArr: FireProduct[] = Object.values(response.data)
      fetchedProducts = valuesArr.map((productObj: FireProduct, index: number) => {
        return { id: keys[index], ...productObj }
      })
      return fetchedProducts;
    } catch (err: any) {
      console.log("fetch response error", err)
      if (!err.response) {
        throw err;
      }
      return isRejectedWithValue(err.response.data);
    }
  })

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (product, thunkAPI) => {
    try {
      let token = localStorage.getItem("token");
      const response = await axios.post(`/allProducts.json?auth=${token}`, product)
        .then(data => data)
      return response;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return isRejectedWithValue(err.response.data);
    }
  });

export const delProduct = createAsyncThunk(
  'products/delProduct',
  async (id: string) => {
    try {
      let token = localStorage.getItem("token");
      let response = null;
      if (!id) {
        throw new Error('id of product is invalid or missing')
      } else {
        response = await axios.delete(`/allProducts/${id}.json?auth=${token}`)
          .then(data => data)
      }
      return response;
    } catch (err: any) {
      console.log("delProduct err", err);
      if (!err.response) {
        throw err;
      }
      return isRejectedWithValue(err.response);
    }
  });


export const editProduct = createAsyncThunk(
  'products/editProduct',
  async (currentProduct: Product, thunkAPI) => {
    try {
      const id: string = currentProduct.id;
      let token = localStorage.getItem("token");
      const url = '/allProducts/' + id + '.json?auth=' + token;
      let response = null
      if (!id) {
        console.log("edit error");
        throw new Error('id of product is invalid or missing')
      } else {
        response = await axios.put(url, currentProduct)
          .then(data => data)
      }
      return response;
    } catch (err: any) {
      console.log("edit err", err);
      if (!err.response) {
        throw err;
      }

      return isRejectedWithValue(err.response.data);
    }
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
    add2AllOpen: (state) => {
      state.add2AllShow = true;
    },
    add2AllClose: (state) => {
      state.add2AllShow = false;
    },
    openProductPage: (state) => {
      state.prodShow = true;
    },
    closeProductPage: (state) => {
      state.prodShow = false;
    },
    openEdit: (state, action: PayloadAction<string>) => {
      state.currentProductId = action.payload;
      state.editShow = true;
    },
    closeEdit: (state) => {
      state.editShow = false;
    },
    updateCurrentProductId: (state, action: PayloadAction<string>) => {
      state.currentProductId = action.payload;
    },
    updateCurrentProductGroup: (state, action: PayloadAction<Product[]>) => {
      state.currentProductGroup = action.payload;
      state.loading = false;
    },
    changeLanguages: (state, action: PayloadAction<string>) => {
      state.currentLanguage = action.payload
    },
    updateAllProducts: (state, action: PayloadAction<Product[]>) => {
      state.allProducts = action.payload;
    },
    closeAdded: (state) => {
      state.productAdded = false
    },
    openAdded: (state) => {
      state.productAdded = true;
    },
    setPathname: (state, action: PayloadAction<string>) => {
      state.pathname = action.payload;
    },
    setgFormIsValid: (state, action: PayloadAction<boolean>) => {
      state.globalformIsValid = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<ProductReducer>) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload as unknown as Product[];
        state.loading = false;
      }),
      builder.addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.payload ? action.payload.toString() : action.error.toString();
        state.loading = false;
      });
    builder.addCase(editProduct.pending, (state) => {
      state.productAdded = false;
      state.loading = true;
    }),
      builder.addCase(editProduct.fulfilled, (state) => {
        state.productAdded = true;
        state.loading = false;
      }),
      builder.addCase(editProduct.rejected, (state, action) => {
        state.error = action.payload ? action.payload.toString() : action.error.toString();
      }),
      builder.addCase(addProduct.pending, (state, action) => {
        state.productAdded = false;
        state.loading = true;
      }),
      builder.addCase(addProduct.fulfilled, (state, action) => {
        state.productAdded = true;
        state.loading = false;
        state.add2AllShow = false
      }),
      builder.addCase(addProduct.rejected, (state, action) => {
        state.error = action.payload ? action.payload.toString() : action.error.toString();
        state.productAdded = false;
        state.loading = false;
      }),
      builder.addCase(delProduct.pending, (state) => {
        state.loading = true;
        state.productAdded = false;
      }),
      builder.addCase(delProduct.fulfilled, (state) => {
        state.loading = false;
        state.productAdded = true;
      }),
      builder.addCase(delProduct.rejected, (state) => {
        state.error = "" // action.payload ? action.payload.toString() : action.error.toString();
        state.loading = false;
      })
  }
});

export const actionTypes = productsReducer.actions;
export const { add2AllOpen, add2AllClose, openProductPage, closeProductPage, openEdit,
  closeEdit, updateCurrentProductId, updateCurrentProductGroup,
  changeLanguages, updateAllProducts, closeAdded, openAdded, setPathname, setgFormIsValid } = actionTypes;


export default productsReducer.reducer


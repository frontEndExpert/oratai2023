import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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


export const productsApi = createApi({
  reducerPath: "productsApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://oratai-2018.firebaseio.com/",
  }),
  endpoints: (builder) => ({
    fetchProducts: builder.query<Product[], null>({
      query: () => "allProducts",
    }),

  }),
});
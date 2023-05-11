'use client'

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import type { Product } from "../redux/features/productsReducer";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


// export const api = createApi({
//     baseQuery: fetchBaseQuery({ baseUrl: '/' }),
//     endpoints: (build) => ({
//       allProducts: build.query<Product[], number | void>({
//         query: (group = 1) => `products/${group}`,
//       }),
//     }),
//   })
  
//   export const { useListPostsQuery, usePrefetch } = api
import React, { createContext, useState } from 'react';

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

const ProductsContext = createContext({
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
    globalformIsValid: false,
    pathname: "/",
});



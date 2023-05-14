// 'use client';

import React from 'react';
import Reviews from '../../../components/Reviews'
// @ts-ignore
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Reviews For Orataiphathai Thai Sarong",
  description: "Customers reviews of our service and reviews of some of our customers and the possibilities of end products from our Thai Sarong fabric.",
};


const ReviewsPage = () => {

  return (
    <>
      <Reviews />
    </>
  );
}

export default ReviewsPage
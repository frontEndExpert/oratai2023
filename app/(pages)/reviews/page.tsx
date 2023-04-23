// 'use client';

import React from 'react';
import Reviews from '../../../components/Reviews'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Orataiphathai Thai Sarong",
  description: "Everything you need to know about OraTai Thai Sarong website: how to get the most out of our website or contact us with any question.",
};


const ReviewsPage = (props: any) => {
  console.log("props", props);
  return (
    <>
      <Reviews />
    </>
  );
}

export default ReviewsPage
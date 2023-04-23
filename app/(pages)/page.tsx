//'use client';

import React from 'react';
import HomePage from '../../components/Homepage';
import { Metadata } from 'next';

// <LanguagueContextProvider></LanguagueContextProvider>
export const metadata: Metadata = {
  title: "About Orataiphathai Thai Sarong",
  description: "Everything you need to know about OraTai Thai Sarong website: how to get the most out of our website or contact us with any question.",
};
//

export default function Page() {
  return (
    <>
      <HomePage />
    </>
  )
}

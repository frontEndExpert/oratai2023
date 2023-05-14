// 'use client';

import React from 'react';
import AboutUs from '../../../components/AboutUs';
// @ts-ignore
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Orataiphathai Thai Sarong",
  description: "Everything you need to know about OraTai Thai Sarong website: how to get the most out of our website or contact us with any question.",
};

//
const AboutPage = () => {
  return (
    <>
      <AboutUs />
    </>
  );
}

export default AboutPage
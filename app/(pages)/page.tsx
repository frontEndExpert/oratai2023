import React from 'react';
import HomePage from '../../components/Homepage';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: "Orataiphathai Thai Sarong",
  description: "Procutment service for Thai Sarong fabric: We find the pattern of your choice at wholesale prices and ship it to you oversea. You can browse our catalog to get idea of the past patterns as they always evolve. Contact us for more information.",
};

export default function Page() {
  return (
    <>
      <HomePage />
    </>
  )
}

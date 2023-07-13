import React, { ReactNode } from "react"
import Head from "next/head"
import Header from "./header"
import Nav from "./nav"
import Footer from "./footer"
import AuthModal from "@/components/AuthModal"
import { NextSeo } from 'next-seo';

interface LayoutProps {
  title?: string;
  description?: string;
  url?: string;
  ogImage?: string;
  children: ReactNode;
}

const Layout = (props: LayoutProps) => {

  const defaultDescription = 'OrataiPhathai Website';
  const defaultOGURL = 'http://www.orataiphathai.work';
  const defaultOGImage = '';

  return (
    <>
      <NextSeo
        title={props.title || "OraTai PhaThai"}
        description={props.description || defaultDescription}
        openGraph={{
          title: props.title || "OraTai PhaThai",
          description: props.description || defaultDescription,
          type: 'website',
          locale: 'en_IE',
          url: props.url || defaultOGURL,
          siteName: 'Orataiphathai',
          images: [
            {
              url: props.ogImage || defaultOGImage,
              width: 1200,
              height: 630,
              alt: 'Og Image Alt',
              type: 'image/jpeg',
            },
            { url: 'https://www.example.ie/og-image-04.jpg' },
          ],
        }}
        twitter={{
          handle: '@WebExpert123',
          site: props.url || defaultOGURL,
          cardType: 'summary_large_image',
        }}
      />

      <Header />
      <Nav />
      <AuthModal />
      {props.children}
      <Footer />
    </>
  )
}

export default Layout;

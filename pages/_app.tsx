import React from "react"
import Head from "next/head"
import { AppProps } from 'next/app';
import "../styles/globals.scss"
import Script from "next/script";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/static/favicon.ico" />
      </Head>
      <Script id="google-tag-manager"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','G-SRZQBE6BB0');`
        }}></Script>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp

import React from "react"
import Head from "next/head"
import { AppProps } from 'next/app';
import "../styles/globals.scss"
import Script from "next/script";
// import { wrapper } from "../redux/store";
import { LanguagueContextProvider } from "@/contexts/languagueContext";
import store from "@/redux/store";
import { FC } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

// const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
//   const { store, props } = wrapper.useWrappedStore(rest);
//   const { pageProps } = props;
{/* <Script id="google-tag-manager"
dangerouslySetInnerHTML={{
  __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','G-SRZQBE6BB0');`
}}></Script> */}

{/* <Script id="google-analytics" strategy="afterInteractive">
{`
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-SRZQBE6BB0');
`}
</Script> */}
function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <link rel="icon" href="/static/favicon.ico" />
      </Head>

      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
          <LanguagueContextProvider>
            <Component {...pageProps} />
          </LanguagueContextProvider>
        </PersistGate>
      </Provider>
    </>
  )
}

export default MyApp;

import React from "react"
import Head from "next/head"
import { AppProps } from 'next/app';
import "../styles/globals.scss"
import Script from "next/script";
import store from "@/redux/store";
import { Provider } from "react-redux";
import { LanguagueContextProvider } from "@/contexts/languagueContext";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";



let persistor = persistStore(store);

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

export default MyApp

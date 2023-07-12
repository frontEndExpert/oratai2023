import React, { Fragment } from "react"
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
    <Fragment>



      <Head>
        <link rel="icon" href="/static/favicon.ico" />
        <meta name="author" content="Aylon Spigel" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>



      <Provider store={store}>

        <LanguagueContextProvider>
          <Component {...pageProps} />
        </LanguagueContextProvider>

      </Provider>
    </Fragment>
  )
}

export default MyApp

//   < PersistGate persistor = { persistor } loading = {< div > Loading...</div >}>

  
// </PersistGate >
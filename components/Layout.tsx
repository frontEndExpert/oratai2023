import React from "react"
import Head from "next/head"
import Header from "./header"
import Nav from "./nav"
import Footer from "./footer"
import AuthModal from "@/components/AuthModal"

const Layout = (props: any) => {

  const defaultDescription = 'OrataiPhathai Website';
  const defaultOGURL = 'http://www.orataiphathai.work';
  const defaultOGImage = '';

  return (
    <main>
      <Head>
        <meta charSet="UTF-8" />

        <title>{props.title || "OraTai PhaThai"}</title>

        <meta name="description" content={props.description || defaultDescription} />
        <meta property="og:url" content={props.url || defaultOGURL} />
        <meta property="og:title" content={props.title || ""} />
        <meta
          property="og:description"
          content={props.description || defaultDescription}
        />
        <meta name="twitter:site" content={props.url || defaultOGURL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content={props.ogImage || defaultOGImage}
        />
        <meta property="og:image" content={props.ogImage || defaultOGImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>

      <Header />
      <Nav />
      <AuthModal />
      {props.children}
      <Footer />
    </main>
  )
}

export default Layout;

import './globals.css'
import React from 'react'
import Head from './components/head'
import Header from './components/header'
import Footer from './components/footer'
import Nav from './components/nav'
import {Providers} from './redux/providers'
import AuthModal from './components/AuthModal'


export const metadata = {
  title: "OraTai PhaThai",
  description:"OraTai PhaThai Page",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
     <body>
      <Providers>
        <Header />
        <Nav  />
        <AuthModal />
        <main>
          {children}
        </main>
        <Footer />
      </Providers>
   </body>
   </html>
  )
}

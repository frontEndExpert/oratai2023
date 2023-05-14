import '../styles/globals.scss'
import React from 'react'
import Script from 'next/script'
import Header from '../components/header'
import Footer from '../components/footer'

export const metadata = {
  title: "OraTai PhaThai",
  description: "OraTai PhaThai Page",
  authors: [
    {
      name: "Aylon Spigel",
    },
  ],
  creator: "Aylon-Spigel",
  metadataBase: new URL("https://orataiphathai.work/static"),
  openGraph: {
    title: "OraTai PhaThai wholesale Thai Sarong Fabric",
    description: "OraTai PhaThai Page",
    url: 'http://www.orataiphathai.work',
    images: [
      {
        url: './slider/slider-0003.jpg',
        width: 800,
        height: 600
      }
    ]
  },
  twitter: {
    site: 'http://www.orataiphathai.work',
    card: "summary_large_image",
    images: [
      {
        url: './slider/slider-0003.jpg',
        width: 1200,
        height: 630
      }
    ]
  },
  // icons: {
  //   icon: '../public/static/favicon.ico',
  // },
  robots: {
    index: true
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title >Oratai Pha Tai - Wholesale Thai Sarong Fabric, worldwide service.</title>
      </head>

      <body className="bg-black debug-screens" >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

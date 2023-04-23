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
  openGraph: {
    title: "OraTai PhaThai wholesale Thai Sarong Fabric",
    description: "OraTai PhaThai Page",
    url: 'http://www.orataiphathai.work',
    images: [
      {
        url: 'https://orataiphathai.work/static/slider/slider-0003.jpg',
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
        url: 'https://orataiphathai.work/static/slider/slider-0003.jpg',
        width: 1200,
        height: 630
      }
    ]
  },
  icons: {
    icon: '../public/static/favicon.ico',
  },
  robots: {
    index: true
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <head>
        <Script type="text/javascript" id="jquery-cdn" src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" />
        <Script type="text/javascript" id="bootstrap-cdn" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
      </head>

      <body className="bg-black">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

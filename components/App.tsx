import React from "react"
import Head from "./head"
import Header from "./header"
import Nav from "./nav"
import Footer from "./footer"
import AuthModal from "@/components/AuthModal"
// import { ReduxProvider } from "@/redux/reduxProvider";
// import { LanguagueContextProvider } from "@/contexts/languagueContext";


const App = (props: any) => {
  return (
    <main>
      <Head
        title={props.title || "OraTai PhaThai"}
        description={props.description || "OraTai PhaThai Page"}
      />

      <Header />
      <Nav />
      <AuthModal />
      {props.children}
      <Footer />

    </main>
  )
}

export default App;

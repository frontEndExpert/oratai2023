import React from "react"
import Head from "./head"
import Header from "./header"
import Nav from "./nav"
import Footer from "./footer"
//import Modal from "./UI/Modal/Modal"
//import Auth from "../containers/Auth/Auth"
// import { connect } from "react-redux"
// import { authClose } from "../store/reducers/authReducer"
//import useTranslations from "../hoc/useTranslations"
import AuthModal from "@/components/AuthModal"
// import { ReduxProvider } from "@/redux/reduxProvider";
import store from "@/redux/store";
import { Provider } from "react-redux";
import { LanguagueContextProvider } from "@/contexts/languagueContext";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";



let persistor = persistStore(store);

const App = (props: any) => {


  //const { t } = useTranslations(props.currentLanguage || "en")
  return (
    <main>
      <Head
        title={props.title || "OraTai PhaThai"}
        description={props.description || "OraTai PhaThai Page"}
      />
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
          <LanguagueContextProvider>
            <Header />
            <Nav />
            <AuthModal />
            {/*props.authShow && <Modal 
            name="authFormModal" 
            show={props.authShow} 
            modalClosed={props.onAuthClose}>
            <button className="btn btn-link auth-btn" onClick={props.onAuthClose}>X</button>
              <Auth t={t} />
            </Modal>*/}
            {/* <div
            className="mainbody"
            dir={props.currentLanguage == "he" ? "rtl" : "ltr"}>
            
          </div> */}
            {props.children}
            <Footer />
          </LanguagueContextProvider>
        </PersistGate>
      </Provider>
    </main>
  )
}

// const mapStateToProps = (state) => {
//   return {
//     authShow: state.auth.authShow,
//     currentLanguage: state.products.currentLanguage
//   }
// }
// const mapDispatchToProps = (dispatch) => {
//   return {
//     onAuthClose: () => dispatch(authClose())
//   }
// }

//export default connect(mapStateToProps, mapDispatchToProps)(App)
export default App;

import React from "react";
import ProductsText from '../../../components/productsText'
import GroupMenu from '../../../components/groupMenu'
//import { Providers } from './providers'

//import AuthModal from './components/AuthModal'
//import { wrapper } from './redux/store';
//import { Provider } from 'react-redux';
//import rootStore, { RootState } from './redux/store';
// <meta name="viewport" content="width=device-width, initial-scale=1.0" /> 


export default function Layout({ children }: { children: React.ReactNode }) {
    //    <AuthModal /> */}
    //  <Providers ></Providers>  <LanguagueContextProvider></LanguagueContextProvider>
    //  <LanguagueContextProvider></LanguagueContextProvider>
    // pin={pin}
    //     currentGroupId={currentGroupId}
    // currentArrSize={currentArrSize}
    return (
        <div className="bg-black">

            <ProductsText />
            <GroupMenu />

            {children}

        </div>
    )
}

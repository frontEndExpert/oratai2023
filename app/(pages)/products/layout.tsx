import React from "react";
import ProductsText from '../../../components/productsText'
import GroupMenu from '../../../components/groupMenu'


export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <div className="container bg-black">
            <ProductsText />
            <GroupMenu />
            {children}
        </div>
    )
}

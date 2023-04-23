import React from 'react'
import Nav from '../../components/nav'

export default function Layout({ children }: { children: React.ReactNode }) {


    return (
        <div className="bg-black">
            <Nav />
            {children}
        </div>
    )
}

'use client';

import React from 'react'
import Nav from '../../components/nav'
import { Providers } from './providers';
import { LanguagueContextProvider } from '../../contexts/languagueContext'
import AuthModal from '@/components/AuthModal';

function Layout({ children }: { children: React.ReactNode }) {

    return (
        <Providers>
            <LanguagueContextProvider>
                <div className="bg-black">
                    <Nav />
                    <AuthModal />
                    {children}
                </div>
            </LanguagueContextProvider>
        </Providers>
    )
}

export default Layout;
'use client';

import React from 'react'
import Nav from '../../components/nav'
import { Providers } from './providers';
import AuthModal from '@/components/AuthModal';

function Layout({ children }: { children: React.ReactNode }) {

    return (
        <Providers>
            <div className="bg-black">
                <Nav />
                <AuthModal />
                {children}
            </div>
        </Providers>
    )
}

export default Layout;
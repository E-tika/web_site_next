import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import Head from 'next/head';

import { Noto_Sans_JP } from 'next/font/google';
import clsx from 'clsx';

const notoSansJP = Noto_Sans_JP({
    weight: '400',
    subsets: ['latin']
});

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <div className={clsx("flex flex-col min-h-screen", 'font-sans', notoSansJP.className)} lang='ja'>
                <Header />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Layout;

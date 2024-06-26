import Header from './Header'
import Footer from './Footer'

import { Noto_Sans_JP } from 'next/font/google'
import clsx from 'clsx'

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen clsx(noto.SansJP.variable, 'font-sans')" lang='ja'>
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout

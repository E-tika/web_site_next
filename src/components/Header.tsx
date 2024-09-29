'use client'

import { useState } from 'react'
import Link from 'next/link'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-blue-500 text-white flex items-center justify-between p-4">
            <div className="flex items-center">
                {/* <Link href="/" passHref>
                    <a className="flex items-center">
                        <img src="/images/banana.png" alt="Icon" width={40} height={40} className="mr-2" />
                        <span className="text-lg font-bold hover:text-blue-300">経済学部同好会</span>
                    </a>
                </Link> */}
            </div>
            <nav className="hidden sm:flex">
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/reservation" className="hover:text-blue-300">購読室予約</Link>
                    </li>
                    <li>
                        <Link href="/past-exams" className="hover:text-blue-300">期末試験過去問</Link>
                    </li>
                    <li>
                        <Link href="/printing-room" className="hover:text-blue-300">印刷室</Link>
                    </li>
                    <li>
                        <Link href="/seminars" className="hover:text-blue-300">ゼミ紹介</Link>
                    </li>
                    <li>
                        <Link href="/contact" className="hover:text-blue-300">お問い合わせ</Link>
                    </li>
                </ul>
            </nav>
            <div className="sm:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                    </svg>
                </button>
            </div>
            {isMenuOpen && (
                <nav className="sm:hidden absolute top-16 left-0 w-full bg-blue-500 text-white p-4">
                    <ul className="flex flex-col">
                        <li className="border-b border-white">
                            <Link href="/reservation" className="block py-2 px-4 hover:bg-blue-400" onClick={() => setIsMenuOpen(false)}>購読室予約</Link>
                        </li>
                        <li className="border-b border-white">
                            <Link href="/past-exams" className="block py-2 px-4 hover:bg-blue-400" onClick={() => setIsMenuOpen(false)}>期末試験過去問</Link>
                        </li>
                        <li className="border-b border-white">
                            <Link href="/printing-room" className="block py-2 px-4 hover:bg-blue-400" onClick={() => setIsMenuOpen(false)}>印刷室</Link>
                        </li>
                        <li className="border-b border-white">
                            <Link href="/seminars" className="block py-2 px-4 hover:bg-blue-400" onClick={() => setIsMenuOpen(false)}>ゼミ紹介</Link>
                        </li>
                        <li>
                            <Link href="/contact" className="block py-2 px-4 hover:bg-blue-400" onClick={() => setIsMenuOpen(false)}>お問い合わせ</Link>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    )
}

export default Header

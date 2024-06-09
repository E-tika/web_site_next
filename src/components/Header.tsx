import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
    return (
        <header className="bg-blue-600 text-white flex items-center justify-between p-4">
            <div className="flex items-center">
                <Image src="/images/tmp_logo.png" alt="Icon" width={40} height={40} className="mr-2" />
                <span className="text-lg font-bold">経済学部同好会</span>
            </div>
            <nav>
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
        </header>
    )
}

export default Header

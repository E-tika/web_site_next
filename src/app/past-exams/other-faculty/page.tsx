import Head from 'next/head'

export default function ContactForm() {
    return (
        <div className="container mx-auto px-4 py-8">
            <Head>
                <title>お問い合わせフォーム</title>
                <meta name="description" content="お問い合わせフォームページ" />
            </Head>

            <h1 className="text-3xl font-bold mb-6">お問い合わせフォーム</h1>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
                <p className="font-bold">注意事項:</p>
                <ul className="list-disc list-inside">
                    <li>反映には数日かかる場合がございます。</li>
                    <li>アカウントの登録作業後にメールが届くので、アカウントを有効化してください。</li>
                    <li>初期パスワードは通知いたしません。 「パスワードをリセット」からパスワードを登録いただきご利用ください。</li>
                    <li>過去問の(個人的なものを含む)再配布行為は絶対におやめください</li>
                </ul>
            </div>

            <div className="google-form-container">
                <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSeOkOkm9YSJ6Gwr71sYtw-Y6MTJMaNLZBfT1yQTHysWjNO8qQ/viewform?embedded=true"
                    width="100%"
                    height="1000"
                >
                    読み込んでいます...
                </iframe>
            </div>
        </div>
    )
}

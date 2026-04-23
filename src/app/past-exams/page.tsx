'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../libs/firebaseConfig';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const PastExamsPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    const fullEmail = `${email}@st.kyoto-u.ac.jp`
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, fullEmail, password);
      const user = userCredential.user;
      if (user.emailVerified) {
        router.push('/past-exams/download');
      } else {
        setError('メールアドレスが確認されていません。メールを確認してください。')
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('ログインに失敗しました。メールアドレスとパスワードを確認してください。');
    }
  };

  return (
    <div className="p-4">
      <div className='mb-4'>
        <h2 className="text-2xl mb-4">過去試験の閲覧について</h2>
        <p>
          このページは試験過去問閲覧用のログインページです。<br />
          会員登録後にログインすることで試験過去問を閲覧していただけます。
          <span className="text-red-600 font-bold">現在、サイトの不具合により、過去問の閲覧ができない状況です。<br>
          ご迷惑をおかけしておりますが、5月上旬ごろに公開予定の新サイトの運用開始まで、しばらくお待ちください。</span>
        </p>
      </div>
      <h2 className="text-2xl mb-4">ログイン</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="mb-4">
        <div className="mb-2">
          <label className="block">メールアドレス:</label>
          <div className='flex'>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-2/5"
              required
            />
            <span className="inline-block p-2 text-gray-500 text-lg">@st.kyoto-u.ac.jp</span>
          </div>

        </div>
        <div className="mb-2">
          <label className="block">パスワード:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-2/5"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">ログイン</button>
      </form>
      <p>アカウントをお持ちでないですか？ <Link href="/past-exams/register" className="text-blue-500">登録はこちら</Link></p>
      <p>パスワードをお忘れですか？ <Link href="/past-exams/reset-password" className="text-blue-500">パスワードをリセットするにはこちら</Link></p>
      <p>他学部の方はこちらから登録いただくことで利用いただけます。 <Link href="/past-exams/other-faculty" className="text-blue-500">他学部の方はこちら</Link></p>
    </div>
  );
};

export default PastExamsPage;

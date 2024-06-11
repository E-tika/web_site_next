'use client';

export function HomePage() {
  return (
    <div className="p-4">
      <h2>Welcome to the Home Page</h2>
      <p>This is the main content of the home page.</p>
    </div>
  )
}
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../libs/firebaseConfig';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const PastExamsPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
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
      <h2 className="text-2xl mb-4">ログイン</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="mb-4">
        <div className="mb-2">
          <label className="block">メールアドレス:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block">パスワード:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">ログイン</button>
      </form>
      <p>アカウントをお持ちでないですか？ <Link href="/past-exams/register" className="text-blue-500">登録はこちら</Link></p>
      <p>パスワードをお忘れですか？ <Link href="/past-exams/reset-password" className="text-blue-500">パスワードをリセットするにはこちら</Link></p>
    </div>
  );
};

export default PastExamsPage;

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
import { useRouter } from 'next/router';

const PastExamsPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/past-exams/download');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">ログイン</h2>
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
      <p>アカウントをお持ちでないですか？ <Link href="/register"><a className="text-blue-500">登録はこちら</a></Link></p>
    </div>
  );
};

export default PastExamsPage;

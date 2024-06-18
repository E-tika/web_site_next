'use client'

import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../libs/firebaseConfig'; // Correct import path
import { useRouter } from 'next/navigation';

const ResetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('パスワードリセットのメールを送信しました。メールを確認してください。');
        } catch (error) {
            console.error('Error resetting password:', error);
            setError('再設定用のメールを送信できません。入力内容を確認してください。')
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl mb-4">パスワード再設定</h2>
            {message && <p className="text-green-500 mb-4">{message}</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleResetPassword} className="mb-4">
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
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">再設定メールを送信</button>
            </form>
            <p>ログインに戻るには <button onClick={() => router.push('/past-exams')} className="text-blue-500">こちらをクリック</button></p>
        </div>
    );
};

export default ResetPasswordPage;

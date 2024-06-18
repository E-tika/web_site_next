'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth, firestore } from '../../../libs/firebaseConfig';
import { useRouter } from 'next/navigation';
import { collection, doc, getDoc } from 'firebase/firestore';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [studentId, setStudentId] = useState('');
    const [error, setError] = useState('')
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('')
        try {
            const docRef = doc(firestore, 'students', studentId);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                setError('無効な学生番号です。');
                return;
            }

            const fullEmail = `${username}@st.kyoto-u.ac.jp`
            const userCredential = await createUserWithEmailAndPassword(auth, fullEmail, password);
            const user = userCredential.user;
            await sendEmailVerification(user);
            alert('確認メールを送信しました。メールを確認してアカウントを有効化してください。');
            router.push('/past-exams');
        } catch (error: any) {
            console.error('Error registering:', error);
            if (error.message) {
                setError(error.message)
            } else {
                setError('登録に失敗しました。もう一度お試しください。');
            }
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl mb-4">アカウント登録</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleRegister} className="mb-4">
                <div className="mb-2">
                    <label className="block">メールアドレス(大学メール):</label>
                    <div className="flex">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border p-2 w-3/4"
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
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block">学生番号:</label>
                    <input
                        type="text"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className="border p-2 w-full"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">登録</button>
            </form>
        </div>
    );
};

export default RegisterPage;

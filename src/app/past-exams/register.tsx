import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../libs/firebaseConfig';
import { useRouter } from 'next/router';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [studentId, setStudentId] = useState('');
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // 登録成功後にユーザー情報に学生番号を追加するなどの処理をここで行います
            router.push('/past-exams');
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl mb-4">アカウント登録</h2>
            <form onSubmit={handleRegister} className="mb-4">
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

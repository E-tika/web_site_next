'use client'

import { useEffect, useState } from 'react';
import { auth } from '../../../libs/firebaseConfig'; // Correct import path
import { onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const DownloadPage = () => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                router.push('/past-exams');
            } else {
                setUser(currentUser);
            }
        });

        return () => unsubscribe();
    }, [router]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl mb-4">過去試験のダウンロード</h2>
            <ul>
                <li><a href="/files/exam1.pdf" className="text-blue-500 hover:underline" download>試験1のダウンロード</a></li>
                <li><a href="/files/exam2.pdf" className="text-blue-500 hover:underline" download>試験2のダウンロード</a></li>
                <li><a href="/files/exam3.pdf" className="text-blue-500 hover:underline" download>試験3のダウンロード</a></li>
            </ul>
        </div>
    );
};

export default DownloadPage;

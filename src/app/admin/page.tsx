'use client'

import React, { useState } from "react";
import * as XLSX from "xlsx";
import { firestore, auth } from "@/libs/firebaseConfig"
import { collection, doc, setDoc, getDocs, deleteDoc, writeBatch } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Auth from "@/components/Auth";

const allowedEmails = ["e.doukoukai@gmail.com"]; // 許可するGoogleアカウントのメールアドレスをここに追加

const AdminPage: React.FC = () => {
    const [year, setYear] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [user, loading, error] = useAuthState(auth);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    if (!user) return <Auth />;

    if (!allowedEmails.includes(user.email || "")) {
        return <div>Access Denied</div>;
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        if (!file || !year) {
            alert("ファイルと年度を入力してください");
            return;
        }

        // 年度が4桁の数字かどうかを確認
        const yearPattern = /^\d{4}$/;
        if (!yearPattern.test(year)) {
            alert("年度は4桁の数字である必要があります");
            return;
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData: { 学生番号: string }[] = XLSX.utils.sheet_to_json(worksheet);

                console.log(jsonData);  // デバッグ用ログ

                const studentNumbersCollection = collection(firestore, `students/${year}/student_numbers`);

                // 既存データを削除
                const batch = writeBatch(firestore);
                const existingDocs = await getDocs(studentNumbersCollection);
                existingDocs.forEach((doc) => {
                    batch.delete(doc.ref);
                });

                await batch.commit();

                jsonData.forEach(async (row) => {
                    const studentNumber = row["学生番号"];
                    console.log(studentNumber);  // デバッグ用ログ
                    if (studentNumber) {
                        await setDoc(doc(studentNumbersCollection, studentNumber), { exists: true });
                    }
                });
                alert("アップロードが完了しました");
            } catch (error) {
                console.error("Firestoreへの書き込みエラー:", error);
                alert("エラーが発生しました。コンソールを確認してください。");
            }
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">管理ページ</h1>
            <form className="space-y-4">
                <div>
                    <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                        年度
                    </label>
                    <input
                        type="text"
                        id="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">ファイルを選択</label>
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleFileChange}
                        className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
                    />
                </div>
                <button
                    type="button"
                    onClick={handleUpload}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    アップロード
                </button>
            </form>
        </div>
    );
};

export default AdminPage;


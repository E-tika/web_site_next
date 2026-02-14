'use client'

import React, { useState } from "react";
import ExcelJS from "exceljs";
import { firestore, auth } from "@/libs/firebaseConfig"
import { collection, doc, setDoc, getDocs, writeBatch } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Auth from "@/components/Auth";

const allowedEmails = ["e.doukoukai@gmail.com"]; // 許可するGoogleアカウントのメールアドレスをここに追加

const addNewUser = async (id: string, password: string) => {
    if (!auth) return;
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, id, password);
        const user = userCredential.user;

        // ユーザーのプロフィールを更新（必要に応じて）
        await updateProfile(user, {
            displayName: id,  // 任意の表示名を設定
        });

        // メール認証を送信
        await sendEmailVerification(user);

        alert("新しいユーザーが作成され、メール認証が送信されました");
    } catch (error) {
        console.error("ユーザー作成エラー:", error);
        alert("ユーザー作成に失敗しました。コンソールを確認してください。");
    }
};

const AdminPageContent: React.FC = () => {
    const [year, setYear] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [id, setId] = useState<string>("");
    const [password, setPassword] = useState<string>("");
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
                const buffer = e.target?.result as ArrayBuffer;
                const workbook = new ExcelJS.Workbook();
                await workbook.xlsx.load(buffer);
                const worksheet = workbook.worksheets[0];

                // ヘッダー行からカラム名を取得し、「学生番号」列のインデックスを特定
                const headerRow = worksheet.getRow(1);
                let studentNumCol = -1;
                headerRow.eachCell((cell, colNumber) => {
                    if (String(cell.value).trim() === '学生番号') {
                        studentNumCol = colNumber;
                    }
                });

                const jsonData: { 学生番号: string }[] = [];
                worksheet.eachRow((row, rowNumber) => {
                    if (rowNumber === 1) return; // ヘッダーをスキップ
                    const value = studentNumCol !== -1 ? row.getCell(studentNumCol).value : null;
                    if (value) {
                        jsonData.push({ 学生番号: String(value) });
                    }
                });

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

    const handleAddUser = () => {
        if (id && password) {
            addNewUser(id, password);
        } else {
            alert("IDとパスワードを入力してください");
        }
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
                <div>
                    <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                        ユーザーID
                    </label>
                    <input
                        type="text"
                        id="id"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        パスワード
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button
                    type="button"
                    onClick={handleUpload}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    アップロード
                </button>
                <button
                    type="button"
                    onClick={handleAddUser}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    ユーザー追加
                </button>
            </form>
        </div>
    );
};

export default AdminPageContent;

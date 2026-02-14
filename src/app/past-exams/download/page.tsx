"use client";

import { useEffect, useState } from "react";
import { auth } from "../../../libs/firebaseConfig"; // Correct import path
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";

const DownloadPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [fileUrls, setFileUrls] = useState<
    { year: number; url: string; text: string }[]
  >([]);
  const router = useRouter();

  const files = [
    {
      year: 2024,
      url: "https://drive.google.com/uc?export=download&id=1mCDR7AjlueeUnFHFhTfusUK4PVKsAZjQ",
      text: "2024年過去問のダウンロード",
    },
    {
      year: 2023,
      url: "https://drive.google.com/uc?export=download&id=1XGtaxtj3Q8i-OYeF7aW_W2PWXJcWqQ-1",
      text: "2023年過去問のダウンロード",
    },
    {
      year: 2022,
      url: "https://drive.google.com/uc?export=download&id=1FY3Gd3A8DkrERaOT4rF7kqq31jOzQY3n",
      text: "2022年過去問のダウンロード",
    },
    // 必要に応じて他のファイルを追加
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/past-exams");
      } else {
        setUser(currentUser);
        setFileUrls(files);
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
      <p className="text-red-600 text-2xl font-extrabold mb-4">
        過去問のコピー・再配布は絶対にしないでください！
        <br />
        問題が発生した場合、試験過去問の公開は取りやめとなります。
      </p>
      <ul>
        {fileUrls.map((file, index) => (
          <li key={index}>
            <a
              href={file.url}
              className="text-blue-500 hover:underline"
              download
            >
              {file.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DownloadPage;

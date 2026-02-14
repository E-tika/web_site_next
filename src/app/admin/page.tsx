'use client'

import dynamic from "next/dynamic";

// AdminPageContentを動的にインポート（SSR無効化）
const AdminPageContent = dynamic(
    () => import("@/components/AdminPageContent"),
    {
        ssr: false,
        loading: () => <div>Loading...</div>
    }
);

const AdminPage: React.FC = () => {
    return <AdminPageContent />;
};

export default AdminPage;

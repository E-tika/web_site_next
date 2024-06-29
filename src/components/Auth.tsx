import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, provider } from "@/libs/firebaseConfig";
import { signInWithPopup, signOut } from "firebase/auth";

const Auth: React.FC = () => {
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/admin");
        }
    }, [user, router]);

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).catch((error) => {
            console.error("Sign-in error:", error);
        });
    };

    const logOut = () => {
        signOut(auth).catch((error) => {
            console.error("Sign-out error:", error);
        });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="flex items-center justify-center min-h-screen">
            {user ? (
                <div>
                    <button
                        onClick={logOut}
                        className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-red-50 file:text-red-700
              hover:file:bg-red-100"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <button
                    onClick={signInWithGoogle}
                    className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
                >
                    Sign in with Google
                </button>
            )}
        </div>
    );
};

export default Auth;

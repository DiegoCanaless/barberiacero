"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/lib/redux/slices/authSlice";

export default function AuthCallback() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === "loading") return;

        if (!session) {
            router.push("/");
            return;
        }

        const handleAuth = async () => {
            try {
                if (session.backendToken) {
                    localStorage.setItem("token", session.backendToken);
                } else {
                    router.push("/");
                    return;
                }
                if (session.user) {
                    dispatch(loginSuccess(session.user));
                }
                await new Promise(resolve => setTimeout(resolve, 200));
                
                if (session.user?.profile_complete === 0) {
                    router.push("/completarPerfil");
                } else {
                    router.push("/dashboard");
                }

            } catch (error) {
                console.error("Error en callback:", error);
                router.push("/");
            }
        };

        handleAuth();

    }, [session, status]);

    return (
        <div className="flex items-center justify-center h-screen">
            <p className="text-lg">Iniciando sesión con Google...</p>
        </div>
    );
}

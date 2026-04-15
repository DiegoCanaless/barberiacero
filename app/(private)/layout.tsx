"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export default function PrivateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { setTheme } = useTheme();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/");
            return;
        }

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));

            // validar expiración
            if (payload.exp * 1000 < Date.now()) {
                localStorage.removeItem("token");
                router.push("/");
                return;
            }

            // 🔥 ACA FORZÁS DARK
            if (payload.role === "admin" || payload.role === "barber") {
                setTheme("dark");
            }

            setLoading(false);
        } catch (error) {
            console.error("Token inválido");
            localStorage.removeItem("token");
            router.push("/");
        }
    }, [router, setTheme]);

    if (loading) return null;

    return (
        <main className="pt-24 min-h-screen">
            {children}
        </main>
    );
}

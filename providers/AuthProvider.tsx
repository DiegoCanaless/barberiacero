"use client"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { loginSuccess } from "@/lib/redux/slices/authSlice"

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode
}) {

    const dispatch = useDispatch()

    useEffect(() => {

        const checkAuth = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    console.log("No hay token");
                    return;
                }

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    console.log("Token inválido o expirado");
                    localStorage.removeItem("token");
                    return;
                }

                const user = await res.json();
                dispatch(loginSuccess(user));

            } catch (error) {
                console.error("Error verificando autenticación:", error);
            }
        }

        checkAuth();

    }, [dispatch]);

    return <>{children}</>
}

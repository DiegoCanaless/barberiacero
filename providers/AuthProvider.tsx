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
                console.log("Verificando autenticación...");
                
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
                    credentials: "include" // 👈 IMPORTANTE
                })

                console.log("Auth check response:", res.status);

                if (!res.ok) {
                    console.log("Usuario no autenticado");
                    return
                }

                const user = await res.json()

                console.log("Usuario autenticado:", user);
                dispatch(loginSuccess(user))

            } catch (error) {
                console.error("Error verificando autenticación:", error)
            }
        }

        checkAuth()

    }, [dispatch])

    return <>{children}</>
}
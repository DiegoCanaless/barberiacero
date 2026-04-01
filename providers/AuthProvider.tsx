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
                // 👇 Intentar primero verificar con el backend
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
                    credentials: "include"
                })

                if (res.ok) {
                    const user = await res.json()
                    dispatch(loginSuccess(user))
                    return
                }

                // 👇 Si el backend no responde, intentar con localStorage
                const token = localStorage.getItem("authToken");
                if (!token) {
                    console.log("No hay token en localStorage");
                    return
                }

                console.log("Token encontrado en localStorage, verificando con backend...");

                // Hacer una request con el token en el header
                const meRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
                    credentials: "include",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })

                if (meRes.ok) {
                    const user = await meRes.json()
                    dispatch(loginSuccess(user))
                }

            } catch (error) {
                console.error("Error verificando autenticación:", error)
            }
        }

        checkAuth()

    }, [dispatch])

    return <>{children}</>
}
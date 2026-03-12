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

                const res = await fetch("http://localhost:3002/auth/me", {
                    credentials: "include"
                })

                if (!res.ok) return

                const user = await res.json()

                console.log("Revisado el Logeo pibe")
                dispatch(loginSuccess(user))

            } catch (error) {
                console.error(error)
            }
        }

        checkAuth()

    }, [dispatch])

    return <>{children}</>
}

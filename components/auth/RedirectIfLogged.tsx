"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const RedirectIfLogged = () => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) return;

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const role = payload.role;

            if (role === "admin" || role === "barber") {
                router.push("/dashboard");
            }
        } catch (error) {
            console.error("Token inválido");
        }
    }, [router]);

    return null;
};

export default RedirectIfLogged;

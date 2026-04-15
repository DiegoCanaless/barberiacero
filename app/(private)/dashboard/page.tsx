"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import SuperAdminPanel from "@/components/dashboard/SuperAdminPanel";
import UsuarioPanel from "@/components/dashboard/UsuarioPanel";
import BarberoPanel from "@/components/dashboard/BarberoPanel";

import { UserResponseDTO } from "@/types/entities/user/UserResponseDTO";

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<UserResponseDTO | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                router.push("/");
                return;
            }

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    localStorage.removeItem("token");
                    router.push("/");
                    return;
                }

                const data: UserResponseDTO = await res.json();

                // 🚨 perfil incompleto
                if (data.profile_complete === 0) {
                    router.push("/completarPerfil");
                    return;
                }

                setUser(data);
            } catch (error) {
                console.error(error);
                router.push("/");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [router]);

    if (loading) return null;

    if (!user) return null;

    if (user.role === "admin") return <SuperAdminPanel />;
    if (user.role === "barber") return <BarberoPanel />;
    if (user.role === "usuario") return <UsuarioPanel user={user} />;

    return <div>No autorizado</div>;
}

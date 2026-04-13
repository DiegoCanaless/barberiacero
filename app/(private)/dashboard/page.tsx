import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import SuperAdminPanel from "@/components/dashboard/SuperAdminPanel";
import UsuarioPanel from "@/components/dashboard/UsuarioPanel";
import BarberoPanel from "@/components/dashboard/BarberoPanel";

import { UserResponseDTO } from "@/types/entities/user/UserResponseDTO";

export default async function DashboardPage() {

    const token = (await cookies()).get("token")?.value;
    
    if (!token) {
        redirect("/");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        headers: {
            Cookie: `token=${token}`,
        },
        cache: "no-store",
    });

    if (!res.ok) {
        redirect("/");
    }

    const user: UserResponseDTO = await res.json();

    if (user.profile_complete === 0) {
        redirect("/completarPerfil");
    }

    // 🔥 Render por rol
    if (user.role === "admin") return <SuperAdminPanel />;
    if (user.role === "barber") return <BarberoPanel />;
    if (user.role === "usuario") return <UsuarioPanel user={user} />;

    return <div>No autorizado</div>;
}

import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import SuperAdminPanel from "@/components/dashboard/SuperAdminPanel";
import UsuarioPanel from "@/components/dashboard/UsuarioPanel";
import BarberoPanel from "@/components/dashboard/BarberoPanel";

export default async function DashboardPage() {
    
    const token = (await cookies()).get("token")?.value;

    const { payload } = await jwtVerify(
        token!,
        new TextEncoder().encode(process.env.JWT_SECRET!)
    );

    console.log(payload)

    const user = {
        id: payload.id as string,
        name: payload.name as string,
        apellido: payload.apellido as string,
        email: payload.email as string,
        role: payload.role as string,
        telefono: payload.telefono as string
    };

    if (user.role === "admin") return <SuperAdminPanel />;
    if (user.role === "barber") return <BarberoPanel />;
    if (user.role === "usuario") return <UsuarioPanel user={user} />;

    return <div>No autorizado</div>;
}

import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import SuperAdminPanel from "@/components/dashboard/SuperAdminPanel";
import UsuarioPanel from "@/components/dashboard/UsuarioPanel";
import BarberoPanel from "@/components/dashboard/BarberoPanel";
import { UserResponseDTO } from "@/types/entities/user/UserResponseDTO";
import { State } from "@/types/enum/estado";

export default async function DashboardPage() {

    const token = (await cookies()).get("token")?.value;

    type JWTPayloadCustom = {
    id: string;
    name: string;
    apellido: string;
    email: string;
    role: "usuario" | "admin" | "barber";
    telefono: string;
    estado: State;
    created_at: string;
};


    const { payload } = await jwtVerify<JWTPayloadCustom>(
    token!,
    new TextEncoder().encode(process.env.JWT_SECRET!)
);


    const user: UserResponseDTO = {
    id_usuario: payload.id,
    name: payload.name,
    apellido: payload.apellido,
    email: payload.email,
    role: payload.role,
    telefono: payload.telefono,
    estado: payload.estado,
    created_at: payload.created_at
};



    if (user.role === "admin") return <SuperAdminPanel />;
    if (user.role === "barber") return <BarberoPanel />;
    if (user.role === "usuario") return <UsuarioPanel user={user} />;

    return <div>No autorizado</div>;
}

import { State } from "@/types/enum/estado";


export interface UserResponseDTO{
    id_usuario: string;
    name: string;
    apellido: string | null;
    email: string;
    telefono: string | null;
    role: "usuario" | "admin" | "barber";
    estado: State;
    provider: "local"| "google";
    google_id: String | null;
    profile_complete: number;
    created_at: string
}
import { State } from "@/types/enum/estado";


export interface UserResponseDTO{
    id_cliente: string;
    name: string;
    apellido: string;
    email: string;
    telefono: string;
    role: "usuario" | "admin" | "barber";
    estado: State
    created_at: string
}
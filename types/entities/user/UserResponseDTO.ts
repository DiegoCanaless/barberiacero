

export interface UserResponseDTO{
    id_cliente: string;
    name: string;
    apellido: string;
    email: string;
    telefono: string;
    role: "usuario" | "admin" | "barber";
    created_at: string
}
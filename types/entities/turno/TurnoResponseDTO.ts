import { UserResponseDTO } from "../user/UserResponseDTO";


export interface TurnoResponseDTO{
    id_turno: number;
    cliente: UserResponseDTO
    barbero: UserResponseDTO;
    estado: "Reservado" | "Cancelado"  | "Finalizado";
    horario: string;
    horaFin: string;
    servicio: string;
    fecha: string;
}


export interface TurnoResponseDTO{
    id_turno: string;
    barbero: string;
    estado: "Reservado" | "Cancelado"  | "Finalizado";
    horario: string;
    horaFin: string;
    servicio: string;
    fecha: string;
}
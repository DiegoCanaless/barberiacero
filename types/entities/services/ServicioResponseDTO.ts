import { State } from "@/types/enum/estado";

export interface ServicioResponseDTO{
    id_servicio: string,
    nombre: string,
    precio: number,
    duracion: number,
    estado: State
}
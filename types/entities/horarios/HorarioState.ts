type DiaSemana =
    | "lunes"
    | "martes"
    | "miercoles"
    | "jueves"
    | "viernes"
    | "sabado"
    | "domingo";

type HorarioDia = { 
    activo: boolean;
    inicio: string;
    fin: string;
}

type HorarioState = Record<DiaSemana, HorarioDia>;

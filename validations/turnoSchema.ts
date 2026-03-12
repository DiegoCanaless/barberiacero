import * as Yup from "yup";

export const turnoSchema = Yup.object({

    servicioID: Yup.string()
        .required("Debes seleccionar un servicio"),

    barberID: Yup.string()
        .required("Debes seleccionar un barbero"),

    fecha: Yup.date()
        .nullable()
        .required("Selecciona una fecha"),

    horario: Yup.string()
        .required("Debes seleccionar un horario")

});

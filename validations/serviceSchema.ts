import * as Yup from "yup";

export const serviceSchema = Yup.object({

    nombre: Yup.string()
        .trim().strict(true)
        .min(3, "El servicio debe tener mas de 3 caracteres")
        .max(50, "Maximo 50 caracteres")
        .required("El nombre es obligatorio"),

    precio: Yup.number()
        .typeError("Debe ser un número")
        .min(1, "El valor debe ser mayor a 1")    
        .required("El precio es obligatorio"),

    duracion: Yup.number()
        .typeError("Debe ser un número")
        .min(10, "El servicio debe tardar mas de 10 minutos")
        .required("La duracion es obligatoria")
})
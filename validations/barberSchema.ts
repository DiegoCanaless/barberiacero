import * as Yup from "yup";

export const barberSchema = Yup.object({
    name: Yup.string()
        .trim()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .required("El nombre es obligatorio"),

    apellido: Yup.string()
        .trim()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .required("El nombre es obligatorio"),

    email: Yup.string()
        .trim()
        .email("Email invalido")
        .required("El email es obligatorio"),

    telefono: Yup.string()
        .matches(/^[0-9]+$/, "El teléfono solo puede contener números")
        .min(8, "El teléfono es demasiado corto")
        .max(15, "El teléfono es demasiado largo")
        .required("El teléfono es obligatorio"),


    password: Yup.string()
        .trim()
        .min(5, "La contraseña debe tener al menos 5 caracteres")
        .required("La contraseña es requerida"),

})



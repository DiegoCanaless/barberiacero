import * as Yup from "yup";

export const loginSchema = Yup.object({
    email: Yup.string()
        .trim()
        .email("Email invalido")
        .required("El email es obligatorio"),

    password: Yup.string()
        .trim()
        .min(5, "La contraseña debe tener al menos 5 caracteres")
        .required("La contraseña es requerida")
})



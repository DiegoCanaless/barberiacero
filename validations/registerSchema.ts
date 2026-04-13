import * as Yup from "yup";

export const registerSchema = Yup.object({
    name: Yup.string()
        .trim()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .required("El nombre es obligatorio"),

    apellido: Yup.string()
        .trim()
        .min(3, "El apellido debe tener al menos 3 caracteres")
        .required("El apellido es obligatorio"),

    email: Yup.string()
        .trim()
        .email("Email invalido")
        .required("El email es obligatorio"),

    telefono: Yup.string()
        .matches(/^\+?[1-9]\d{7,14}$/, "Teléfono inválido")
        .required("El teléfono es obligatorio"),



    password: Yup.string()
        .trim()
        .min(5, "La contraseña debe tener al menos 5 caracteres")
        .required("La contraseña es requerida"),

    repeatPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir")
        .required("Debes repetir la contraseña")

})



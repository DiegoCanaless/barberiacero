import * as Yup from "yup";

export const completeSchema = Yup.object({
    telefono: Yup.string()
        .matches(/^\+[1-9]\d{7,14}$/, "Número inválido")
        .required("El teléfono es obligatorio")

})
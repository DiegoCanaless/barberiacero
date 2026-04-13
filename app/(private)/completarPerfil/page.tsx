"use client"

import { domine } from "@/components/ui/typography/fonts"
import { completeSchema } from "@/validations/completeSchema"
import { FaPhone } from "react-icons/fa6"
import { Formik, Form, ErrorMessage } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { useDispatch } from "react-redux";
import { loginSuccess } from "@/lib/redux/slices/authSlice";
import { useRouter } from "next/navigation";

const CompletarPerfil = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    return (
        <section className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto bg-foreground">
            <div className="relative w-full max-w-lg rounded-xl bg-background p-6 shadow-xl text-foreground flex flex-col items-center">

                <div className="p-4 mb-4 w-auto bg-foreground rounded-2xl">
                    <FaPhone className="text-background" />
                </div>

                <h5 className={`font-extrabold text-2xl ${domine.className}`}>
                    ULTIMO PASO
                </h5>

                <p className="text-xs text-center text-muted-foreground mb-4">
                    Necesitamos tu teléfono para confirmar tus turnos.
                </p>

                <Formik
                    initialValues={{ telefono: "" }}
                    validationSchema={completeSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {

                            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/completarPerfil`, {
                                method: "PUT",
                                credentials: "include",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(values)
                            });

                            const data = await res.json();

                            if (!res.ok) {
                                console.error(data);
                                return;
                            }

                            dispatch(loginSuccess(data.user));

                            router.push("/dashboard");

                        } catch (error) {
                            console.error(error);
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ values, setFieldValue, isSubmitting }) => (
                        <Form className="w-full">

                            <div className="w-full mb-8">
                                <label className="text-xs mb-2 block">
                                    NÚMERO DE TELÉFONO
                                </label>

                                <PhoneInput
                                    country={"ar"}
                                    value={values.telefono}
                                    onChange={(phone) => {
                                        setFieldValue("telefono", `+${phone}`);
                                    }}
                                    enableLongNumbers={15}
                                    inputClass="!w-full !bg-muted !text-foreground"
                                    containerClass="!w-full"
                                    buttonClass="!bg-muted"
                                />

                                <ErrorMessage name="telefono" component="p" className="text-red-500 text-xs mt-1" />
                            </div>

                            <button disabled={isSubmitting} type="submit" className="w-full   cursor-pointer gap-2 rounded flex items-center justify-center text-sm py-2 px-4 font-semibold transition-colors duration-200  text-background bg-foreground">
                                {isSubmitting ? "Enviando..." : "Enviar"}
                            </button>
                        </Form>
                    )}
                </Formik>

            </div>
        </section>
    )
}

export default CompletarPerfil;

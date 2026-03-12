import { FaEnvelope, FaLock, FaX, FaUser, FaPhone } from "react-icons/fa6";
import { ToastState } from "../ui/feedback/Toast";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { registerSchema } from "@/validations/registerSchema";
import { loginSuccess } from "@/lib/redux/slices/authSlice";
import { AppDispatch } from "@/lib/redux/store";
import { UserDTO } from "@/types/entities/user/UserDTO";

interface RegisterModalProps {
    onClose: () => void;
    openLogin: () => void
    onToast: (text: string, state: ToastState) => void;
}

const RegisterModal = ({ onClose, onToast, openLogin }: RegisterModalProps) => {

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()


    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                <div className="relative w-full max-w-lg rounded-xl bg-background p-6 shadow-xl text-foreground">
                    <button onClick={onClose} className="absolute top-5 right-5 cursor-pointer text-gray-400 hover:text-gray-600" >
                        <FaX size={18} />
                    </button>
                    <h4 className="text-2xl font-bold  text-center">REGISTRO</h4>
                    <p className="mt-2 text-sm mb-6 text-center">Registrate para reservar tus turnos</p>

                    <Formik
                        initialValues={{
                            name: "",
                            apellido: "",
                            email: "",
                            telefono: "",
                            password: "",
                            repeatPassword: ""
                        }}
                        validationSchema={registerSchema}
                        onSubmit={async (values) => {
                            try {

                                const { repeatPassword, ...data }: { repeatPassword: string } & UserDTO = values

                                const res = await fetch("http://localhost:3002/auth/register", {
                                    method: "POST",
                                    credentials: "include",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(data)
                                })

                                if (res.status === 401) {
                                    onToast("Error al ingresar los datos", ToastState.ERROR);
                                    return
                                }

                                if (!res.ok) {
                                    onToast("Surgio un error al registrarse", ToastState.ERROR);
                                    return;
                                }

                                const info = await res.json();
                                console.log("DATA BACKEND:", info);

                                onToast("Registrado con exito", ToastState.SUCCESS);
                                dispatch(loginSuccess(info.user))



                                console.log("REDIRIGIENDO");
                                router.replace("/dashboard");


                                onClose();

                            } catch (error: unknown) {

                                if (error instanceof Error) {
                                    onToast(error.message, ToastState.ERROR)
                                } else {
                                    onToast("Ocurrió un error inesperado", ToastState.ERROR)
                                }

                            }

                        }}
                    >
                        {({ values }) => (
                            <Form className="flex flex-col px-2 gap-2 max-w-md text-xs">

                                <div className="flex flex-col gap-1">
                                    <label className="text-base flex items-center gap-2"><FaUser /> Nombre</label>
                                    <Field className="border border-foreground px-2 py-1.5 text-start rounded-xs" name="name" type="text" placeholder="John" />
                                    <ErrorMessage name="name" component="p" className="text-red-500 text-xs" />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-base flex items-center gap-2"><FaUser /> Apellido</label>
                                    <Field className="border border-foreground px-2 py-1.5 text-start rounded-xs" name="apellido" type="text" placeholder="Doe" />
                                    <ErrorMessage name="apellido" component="p" className="text-red-500 text-xs" />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-base flex items-center gap-2"><FaEnvelope /> Email</label>
                                    <Field className="border border-foreground px-2 py-1.5 text-start rounded-xs" name="email" type="email" placeholder="correo.gmail.com" />
                                    <ErrorMessage name="email" component="p" className="text-red-500 text-xs" />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-base flex items-center gap-2"><FaPhone /> Telefono</label>
                                    <Field className="border border-foreground px-2 py-1.5 text-start rounded-xs" name="telefono" type="tel" placeholder="*****" />
                                    <ErrorMessage name="telefono" component="p" className="text-red-500 text-xs" />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-base flex items-center gap-2"><FaLock /> Contraseña</label>
                                    <Field className="border border-foreground px-2 py-1.5 text-start rounded-xs" name="password" type="password" placeholder="*****" />
                                    <ErrorMessage name="password" component="p" className="text-red-500 text-xs" />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-base flex items-center gap-2"><FaLock /> Repetir Contraseña</label>
                                    <Field className="border border-foreground px-2 py-1.5 text-start rounded-xs" name="repeatPassword" type="password" placeholder="*****" />
                                    <ErrorMessage name="repeatPassword" component="p" className="text-red-500 text-xs" />
                                </div>

                                <button type="submit" className="bg-foreground text-background mt-4 w-full cursor-pointer py-2 px-4 text-sm font-semibold rounded-xs">INGRESAR</button>
                            </Form>
                        )}
                    </Formik>
                    <button className="flex justify-center mt-6 cursor-pointer w-full text-sm hover:text-white"
                        onClick={() => {
                            openLogin();
                        }}
                    >¿Ya tienes una cuenta?</button>
                </div>

            </div>
        </>


    )
}

export default RegisterModal
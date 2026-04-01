"use client"

import { loginSuccess } from "@/lib/redux/slices/authSlice";
import { loginSchema } from "@/validations/loginSchema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FaX, FaEnvelope, FaLock } from "react-icons/fa6"
import { useDispatch } from "react-redux";
import { ToastState } from "../ui/feedback/Toast";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/lib/redux/store";
import { LoginDTO } from "@/types/entities/auth/LoginDTO";
import { AuthResponseDTO } from "@/types/entities/auth/AuthResponseDTO";

interface LoginModalProps {
  onClose: () => void;
  openRegister: () => void
  onToast: (text: string, state: ToastState) => void;
}

const LoginModal = ({ onClose, onToast, openRegister }: LoginModalProps) => {

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto">
        <div className="relative w-full max-w-lg rounded-xl bg-background p-6 shadow-xl text-foreground">
          <button onClick={onClose} className="absolute top-5 right-5 cursor-pointer text-gray-400 hover:text-gray-600" >
            <FaX size={18} />
          </button>
          <h4 className="text-2xl font-bold text-center">ACCESO</h4>
          <p className="mt-2 text-sm mb-6 text-center">Ingresa para gestionar tus turnos</p>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={async (values: LoginDTO) => {
              try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                  method: "POST",
                  credentials: "include",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(values)
                })

                if (res.status === 401) {
                  onToast("Credenciales inválidas", ToastState.ERROR);
                  return
                }

                if (!res.ok) {
                  onToast("Error al logearse", ToastState.ERROR);
                  return;
                }

                const data: AuthResponseDTO = await res.json();

                // 👇 GUARDAR TOKEN EN LOCALSTORAGE Y COOKIE
                if (data.token) {
                  localStorage.setItem("authToken", data.token);
                  
                  // 👇 TAMBIÉN guardar en cookie para que el servidor lo pueda leer
                  document.cookie = `token=${data.token}; path=/; max-age=${1000 * 60 * 60 * 24}; SameSite=Strict`;
                  
                  console.log("Token guardado en localStorage y cookie");
                  console.log("Cookies después de guardar:", document.cookie);
                }

                // 👇 Actualizar Redux con los datos del usuario
                dispatch(loginSuccess(data.user));

                onToast("Logeado con exito", ToastState.SUCCESS);
                onClose();

                // 👇 Pequeña pausa
                await new Promise(resolve => setTimeout(resolve, 500));

                console.log("Redirigiendo a /dashboard");
                router.push("/dashboard");
                router.refresh();

              } catch (error: unknown) {
                console.error("Error en login:", error);
                if (error instanceof Error) {
                  onToast(error.message, ToastState.ERROR)
                } else {
                  onToast("Ocurrió un error inesperado", ToastState.ERROR)
                }
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col px-2 gap-2 max-w-md text-xs">
                <div className="flex flex-col gap-1">
                  <label className="text-base flex items-center gap-2"><FaEnvelope /> Email</label>
                  <Field 
                    className="w-full px-3 py-2 rounded-md border border-gray-300 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition duration-200" 
                    name="email" 
                    type="email" 
                    placeholder="correo@gmail.com"
                    disabled={isSubmitting}
                  />
                  <ErrorMessage name="email" component="p" className="text-red-500 text-xs" />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-base flex items-center gap-2"><FaLock /> Contraseña</label>
                  <Field 
                    className="w-full px-3 py-2 rounded-md border border-gray-300 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition duration-200" 
                    name="password" 
                    type="password" 
                    placeholder="*****"
                    disabled={isSubmitting}
                    autoComplete="current-password"
                  />
                  <ErrorMessage name="password" component="p" className="text-red-500 text-xs" />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-foreground text-background mt-4 w-full cursor-pointer py-2 px-4 text-sm font-semibold rounded-xs disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Ingresando..." : "INGRESAR"}
                </button>
              </Form>
            )}
          </Formik>

          <button 
            className="flex justify-center mt-6 cursor-pointer w-full text-sm hover:text-white"
            onClick={() => {
              openRegister();
            }}
          >
            ¿Aun no tienes cuenta?
          </button>

        </div>
      </div>
    </>
  )
}

export default LoginModal
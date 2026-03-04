"use client"

import { loginSuccess } from "@/lib/redux/slices/authSlice";
import { loginSchema } from "@/validations/loginSchema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FaX, FaEnvelope, FaLock } from "react-icons/fa6"
import { useDispatch } from "react-redux";
import { ToastState } from "../ui/feedback/Toast";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  onClose: () => void;
  onToast: (text: string, state: ToastState) => void;
}

const LoginModal = ({ onClose, onToast }: LoginModalProps) => {

  const dispatch = useDispatch();

  const router = useRouter()


  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="relative w-full max-w-lg rounded-xl bg-background p-6 shadow-xl text-foreground">
          <button onClick={onClose} className="absolute top-5 right-5 cursor-pointer text-gray-400 hover:text-gray-600" >
            <FaX size={18} />
          </button>
          <h4 className="text-2xl font-bold  text-center">ACCESO</h4>
          <p className="mt-2 text-sm mb-6 text-center">Ingresa para gestionar tus turnos</p>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={async (values) => {
              try {
                const res = await fetch("http://localhost:3002/auth/login", {
                  method: "POST",
                  credentials: "include",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(values)
                })

                if (res.status === 401) {
                  onToast("Error al ingresar los datos", ToastState.ERROR);
                  return
                }

                if (!res.ok) {
                  onToast("Surgio un error al logearse", ToastState.ERROR);
                  return;
                }

                const data = await res.json();
                console.log("DATA BACKEND:", data);

                onToast("Logeado con exito", ToastState.SUCCESS);
                dispatch(loginSuccess(data.user))


                console.log("REDIRIGIENDO");
                router.replace("/dashboard");


                onClose();
              } catch (error: any) {
                console.error(error)
              }
            }}
          >
            {({ values }) => (
              <Form className="flex flex-col px-2 gap-2 max-w-md text-xs">
                <div className="flex flex-col gap-1">
                  <label className="text-base flex items-center gap-2"><FaEnvelope /> Email</label>
                  <Field className="border border-foreground px-2 py-1.5 text-start rounded-xs" name="email" type="email" placeholder="correo.gmail.com" />
                  <ErrorMessage name="email" component="p" className="text-red-500 text-xs" />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-base flex items-center gap-2"><FaLock /> Contraseña</label>
                  <Field className="border border-foreground px-2 py-1.5 text-start rounded-xs" name="password" type="password" placeholder="*****" />
                  <ErrorMessage name="password" component="p" className="text-red-500 text-xs" />
                </div>

                <button type="submit" className="bg-foreground text-background mt-4 w-full cursor-pointer py-2 px-4 text-sm font-semibold rounded-xs">INGRESAR</button>
              </Form>
            )}


          </Formik>

        </div>
      </div>
    </>
  )
}

export default LoginModal
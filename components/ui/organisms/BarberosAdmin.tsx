
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import Toast, { ToastState } from "../feedback/Toast"
import { barberSchema } from "@/validations/barberSchema"
import { UserResponseDTO } from "@/types/entities/user/UserResponseDTO"
import { FaUserLarge } from "react-icons/fa6"
import { State } from "@/types/enum/estado"
import { Switch } from "../molecules/switch"




const BarberosAdmin = () => {
  const [barberos, setBarberos] = useState<UserResponseDTO[]>([])

  const [toast, setToast] = useState<{
    text: string
    state: ToastState
  } | null>(null)



  useEffect(() => {
    const traerBarberos = async () => {
      try {
        const res = await fetch("http://localhost:3002/barberos/", {
          credentials: "include",
        })

        if (!res.ok) {
          console.error("Surgió un error al traer los barberos")
          return
        }

        const data = await res.json()

        setBarberos(data)

      } catch (error) {
        console.error(error)
      }
    }

    traerBarberos()
  }, [])

  const handleState = async (barbero: UserResponseDTO) => {
    try {

      const nuevoEstado = barbero.estado === State.ACTIVO
        ? State.DESACTIVADO
        : State.ACTIVO

      const res = await fetch(`http://localhost:3002/auth/${barbero.id_cliente}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ estado: nuevoEstado })
      })

      if (!res.ok) {
        console.error("Surgió un error al cambiar el estado del barbero")
        return
      }

      setBarberos((prev) =>
        prev.map((b) =>
          b.id_cliente === barbero.id_cliente
            ? {
              ...b, estado:
                b.estado === State.ACTIVO
                  ? State.DESACTIVADO
                  : State.ACTIVO,
            }
            : b
        )
      )

      setToast({
        text: "El estado del barbero se actualizo correctamente",
        state: ToastState.SUCCESS
      })
    } catch (error: unknown) {
      console.error(error)
      setToast({
        text: "Error al actualizar el estado del barbero",
        state: ToastState.ERROR
      })

    }



  }




  return (
    <>
      <section className="mt-10 mb-10 w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* FORM */}
        <article className="bg-card border rounded-xl p-6 shadow-sm">
          <h4 className="text-2xl font-black mb-6">Nuevo Barbero</h4>


          <Formik initialValues={{
            name: "",
            apellido: "",
            email: "",
            telefono: "",
            password: "",
          }}
            validationSchema={barberSchema}
            onSubmit={async (values, { resetForm }) => {
              try {
                const res = await fetch("http://localhost:3002/usuarios/", {
                  method: "POST",
                  credentials: "include",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(values)
                })

                if (res.status === 401) {
                  setToast({
                    text: "Error al ingresar los valores",
                    state: ToastState.ERROR
                  })
                  return
                }

                if (!res.ok) {
                  setToast({
                    text: "Error al crear el barbero",
                    state: ToastState.ERROR
                  })
                  return
                }


                setToast({
                  text: "Barbero creado con exito",
                  state: ToastState.SUCCESS
                })

                resetForm()


              } catch (error: unknown) {
                console.error(error)
              }
            }}
          >
            {({ values }) => (
              <Form className="flex flex-col gap-4">

                <div className="flex flex-col gap-1">
                  <label className="text-base flex items-center gap-2">Nombre</label>
                  <Field className="w-full px-3 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-neutral-300" name="name" type="text" placeholder="John" />
                  <ErrorMessage name="name" component="p" className="text-red-500 text-xs" />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-base flex items-center gap-2">Apellido</label>
                  <Field className="w-full px-3 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-neutral-300" name="apellido" type="text" placeholder="Connor" />
                  <ErrorMessage name="apellido" component="p" className="text-red-500 text-xs" />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-base flex items-center gap-2">Email</label>
                  <Field className="w-full px-3 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-neutral-300" name="email" type="email" placeholder="John@gmail.com" />
                  <ErrorMessage name="email" component="p" className="text-red-500 text-xs" />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-base flex items-center gap-2">Telefono</label>
                  <Field className="w-full px-3 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-neutral-300" name="telefono" type="tel" placeholder="*****" />
                  <ErrorMessage name="telefono" component="p" className="text-red-500 text-xs" />
                </div>

                <div className="flex flex-col gap-1 mb-2">
                  <label className="text-base flex items-center gap-2">Password</label>
                  <Field className="w-full px-3 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-neutral-300" name="password" type="password" placeholder="******" />
                  <ErrorMessage name="password" component="p" className="text-red-500 text-xs" />
                </div>

                <button type="submit" className="bg-foreground text-background mt-4 w-full cursor-pointer py-2 px-4 text-sm font-semibold rounded-xs">CREAR</button>
              </Form>
            )}

          </Formik>

        </article>

        <article>
          <h4 className="text-2xl font-black mb-6">Staff</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {barberos.map((barber) => (
              <div key={barber.id_cliente} className={`flex flex-col justify-between bg-card border rounded-xl p-5 shadow-sm transition hover:shadow-md
                ${barber.estado === State.DESACTIVADO ? "opacity-60 grayscale" : ""}`}>

                <div className="flex items-center gap-4">
                  <div className="bg-black/90 text-white p-4 rounded-xl flex items-center justify-center">
                    <FaUserLarge />
                  </div>

                  <div>
                    <p className="font-bold text-lg">{barber.name} {barber.apellido}</p>
                    <p className="text-sm text-muted-foreground">{barber.email}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6">

                  <span className={`text-xs font-semibold px-3 py-1 rounded-full
                    ${barber.estado === State.ACTIVO
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-500"
                    }`}>
                    {barber.estado}</span>

                  <Switch checked={barber.estado === State.ACTIVO} onCheckedChange={() => handleState(barber)} />
                </div>
              </div>
            ))}

          </div>
        </article>
      </section>

      {toast && (
        <Toast
          text={toast.text}
          state={toast.state}
          onClose={() => setToast(null)}
        />
      )}
    </>
  )
}

export default BarberosAdmin
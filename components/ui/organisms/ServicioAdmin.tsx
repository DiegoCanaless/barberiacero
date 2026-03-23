
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import Toast, { ToastState } from "../feedback/Toast"
import { FaScissors, FaUserLarge } from "react-icons/fa6"
import { ServicioResponseDTO } from "@/types/entities/services/ServicioResponseDTO"
import { serviceSchema } from "@/validations/serviceSchema"
import { Switch } from "../molecules/switch"
import { State } from "@/types/enum/estado"



const ServicioAdmin = () => {
  const [servicios, setServicios] = useState<ServicioResponseDTO[]>([])

  const [toast, setToast] = useState<{
    text: string
    state: ToastState
  } | null>(null)



  useEffect(() => {
    const traerServicios = async () => {
      try {
        const res = await fetch("http://localhost:3002/servicios/", {
          credentials: "include",
        })

        if (!res.ok) {
          console.error("Surgió un error al traer los servicios")
          return
        }

        const data = await res.json()
        setServicios(data)

      } catch (error) {
        setToast({
          text: "Error al traer los servicio",
          state: ToastState.ERROR
        })
        console.error(error)
      }
    }

    traerServicios()
  }, [])


  const handleState = async (servicio: ServicioResponseDTO) => {
    try {
      const res = await fetch(`http://localhost:3002/servicios/actualizarEstado/${servicio.id_servicio}`, {
        method: "PUT",
        credentials: "include"
      })

      if (!res.ok) {
        console.error("Surgió un error al traer los servicios")
        return
      }

      setServicios((prev) =>
        prev.map((s) =>
          s.id_servicio === servicio.id_servicio
            ? {
              ...s, estado:
                s.estado === State.ACTIVO
                  ? State.DESACTIVADO
                  : State.ACTIVO,
            }
            : s
        )
      )

      setToast({
        text: "El servicio se a actualizado correctamente",
        state: ToastState.SUCCESS
      })
    } catch (error: unknown) {
      console.error(error)
      setToast({
        text: "Error al actualizar el estado",
        state: ToastState.ERROR
      })

    }



  }




  return (
    <>
      <section className="mt-10 mb-10 px-4 flex flex-col md:flex-row gap-6 justify-center items-start md:max-w-5xl  lg:max-w-7xl md:mx-auto">

        <article className="flex flex-col items-center w-full md:w-1/2 max-w-2xl">


          <Formik initialValues={{
            nombre: "",
            precio: "",
            duracion: "",
          }}
            validationSchema={serviceSchema}
            onSubmit={async (values, { resetForm }) => {
              try {
                const res = await fetch("http://localhost:3002/servicios/", {
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
                    text: "Error al crear el servicio",
                    state: ToastState.ERROR
                  })
                  return
                }


                setToast({
                  text: "Servicio creado con exito",
                  state: ToastState.SUCCESS
                })

                resetForm()


              } catch (error: unknown) {
                console.error(error)
              }
            }}
          >
            {({ values }) => (
              <Form className="bg-card rounded-xl p-4 w-full flex flex-col gap-4 h-96 overflow-y-auto md:overflow-y-hidden md:h-auto text-foreground">
                <h4 className="text-xl font-black">NUEVO SERVICIO</h4>

                <div className="flex flex-col gap-1">
                  <label className="text-base flex items-center gap-2">Titulo</label>
                  <Field className="w-full px-3 py-2 rounded-md border border-gray-300 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-neutral-500 transition duration-200" name="nombre" type="text" placeholder="EJ: Corte Clásico" />
                  <ErrorMessage name="nombre" component="p" className="text-red-500 text-xs" />
                </div>

                <div className="flex flex-col gap-1 mb-2">
                  <label className="text-base flex items-center gap-2">Precio</label>
                  <Field className="w-full px-3 py-2 rounded-md border border-gray-300 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-neutral-500 transition duration-200" name="precio" type="number" placeholder="$5000" />
                  <ErrorMessage name="precio" component="p" className="text-red-500 text-xs" />
                </div>

                <div className="flex flex-col gap-1 mb-2">
                  <label className="text-base flex items-center gap-2">Duracion(minutos)</label>
                  <Field className="w-full px-3 py-2 rounded-md border border-gray-300 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-neutral-500 transition duration-200" name="duracion" type="number" placeholder="30" />
                  <ErrorMessage name="duracion" component="p" className="text-red-500 text-xs" />
                </div>

                <button type="submit" className="bg-foreground text-background mt-4 w-full cursor-pointer py-2 px-4 text-sm font-semibold rounded-xs">CREAR</button>
              </Form>
            )}

          </Formik>

        </article>

        <article className="w-full">
          <h4 className="text-2xl font-black mb-6">Servicios</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {servicios.map((servicio: ServicioResponseDTO) => (
              <div key={servicio.id_servicio} className={`flex flex-col justify-between bg-card border rounded-xl p-5 shadow-sm transition hover:shadow-md
                ${servicio.estado === State.DESACTIVADO ? "opacity-60 grayscale" : ""}`}>

                {/* INFO */}
                <div className="flex items-center gap-4">
                  <div className="bg-black/90 text-white p-4 rounded-xl flex items-center justify-center">
                    <FaScissors />
                  </div>
                  <div>
                    <p className="font-bold text-lg">{servicio.nombre}</p>
                    <p className="text-sm text-muted-foreground">${servicio.precio} • {servicio.duracion} min</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full
                      ${servicio.estado === State.ACTIVO
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-500"
                      }`}>
                    {servicio.estado}
                  </span>

                  <Switch checked={servicio.estado === State.ACTIVO} onCheckedChange={() => handleState(servicio)} />
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

export default ServicioAdmin
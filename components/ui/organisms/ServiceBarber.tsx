import { ServicioResponseDTO } from "@/types/entities/services/ServicioResponseDTO"
import { useEffect, useState } from "react"
import { FaCircle, FaScissors } from "react-icons/fa6"
import Toast, { ToastState } from "../feedback/Toast"


const ServiceBarber = () => {
  const [servicios, setServicios] = useState<ServicioResponseDTO[]>([])
  const [misServicios, setMisServicios] = useState<number[]>([])


  const [toast, setToast] = useState<{
    text: string
    state: ToastState
  } | null>(null)

  useEffect(() => {
    const traerServicios = async () => {
      try {
        const token = localStorage.getItem("token")

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/servicios/activos`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const data: ServicioResponseDTO[] = await res.json()
        setServicios(data)

      } catch (error: unknown) {
        console.error(error)
        setToast({
          text: "Error al traer los servicios",
          state: ToastState.ERROR
        })
      }
    }

    const traerMisServicios = async () => {
      try {
        const token = localStorage.getItem("token")

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/servicios/mios`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const data = await res.json()

        setMisServicios(data.map((s: any) => Number(s.id_servicio)))

      } catch (error: unknown) {
        console.error(error)
        setToast({
          text: "Error al traer tus servicios",
          state: ToastState.ERROR
        })
      }
    }



    traerServicios()
    traerMisServicios()
  }, [])

  const toggleServicio = (id: number) => {
    setMisServicios((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : [...prev, id]
    );
  };

  const guardarServicios = async () => {
    try {

      const token = localStorage.getItem("token")
      
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/servicios/agregarServicio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ servicios: misServicios })
      })

      setToast({
        text: "Servicios guardados correctamente",
        state: ToastState.SUCCESS
      })

    } catch (error) {
      console.error(error)
      setToast({
        text: "Error al guardar los servicios",
        state: ToastState.ERROR
      })
    }
  }


  return (
    <>
      <div className="mt-10 mb-10 w-full max-w-7xl mx-auto px-4">
        <div className="bg-card p-4 md:p-8 rounded-xl border shadow-sm flex flex-col gap-6">

          <div>
            <h2 className="text-2xl font-black md:text-3xl">Mis Servicios</h2>
            <p className="text-muted-foreground text-sm">Selecciona los servicios que ofreces a los clientes</p>

            <div className="flex flex-wrap justify-around mt-8 gap-2">
              {servicios.map((servicio) => {
                const activo = misServicios.includes(Number(servicio.id_servicio));
                return (
                  <div key={servicio.id_servicio} onClick={() => toggleServicio(Number(servicio.id_servicio))} className={`${activo ? " border-white " : ""} border-2 border-neutral-600 hover:cursor-pointer transition  p-4 rounded-lg w-90 flex items-center justify-between`}>
                    <div className={`flex items-center gap-2 ${activo ? "text-white" : "text-neutral-600"}`}>
                      <div className="p-4 rounded-2xl bg-black ">
                        <FaScissors size={24} />
                      </div>
                      <div className="flex flex-col ">
                        <p className="font-black text-lg">{servicio.nombre}</p>
                        <p>{servicio.precio}</p>
                      </div>
                    </div>

                    <FaCircle className={`${activo ? "text-white" : "text-neutral-600"} transition`} />



                  </div>
                )


              })}
            </div>
            <button onClick={guardarServicios} className="cursor-pointer px-4 mt-4 bg-foreground text-background py-3 rounded-md font-semibold hover:opacity-90 transition" > Guardar servicios</button>

          </div>
        </div>
      </div>
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

export default ServiceBarber
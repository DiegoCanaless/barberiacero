import { TurnoResponseDTO } from "@/types/entities/turno/TurnoResponseDTO"
import { useEffect, useState } from "react"
import TablaDatos from "./TablaDatos"
import { RoleUser } from "@/types/enum/roleUser"
import Toast, { ToastState } from "../feedback/Toast"


const GestionAdmin = () => {

  const [turnos, setTurnos] = useState<TurnoResponseDTO[]>([])
  const [historial, setHistorial] = useState<TurnoResponseDTO[]>([])
  const [seleccion, setSeleccion] = useState<string>("Proximos")
  const [page, setPage] = useState(1)

  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 15,
    totalPages: 1
  })

  const [toast, setToast] = useState<{
    text: string;
    state: ToastState;
  } | null>(null);


  useEffect(() => {
    const traerTurnos = async () => {
      try {
        const token = localStorage.getItem("token")

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/turnos/activos`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data: TurnoResponseDTO[] = await res.json();
        setTurnos(data)
      } catch (error: unknown) {
        console.error(error);
      }
    };


    const traerHistorial = async () => {
      try {
        const token = localStorage.getItem("token")

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/turnos/historial?page=${page}&limit=15`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const data = await res.json();
        setHistorial(data.data)
        setPagination(data.pagination)
      } catch (error: unknown) {
        console.error(error)
      }
    }

    traerTurnos();
    traerHistorial();
  }, [page]);

  const handleFinalizar = async (id: number) => {
    try {
      const token = localStorage.getItem("token")

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/turnos/finalizar/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!res.ok) {
        console.error("Error al finalizar el turno");
        return
      }

      setTurnos((prev) =>
        prev.map((t) =>
          t.id_turno === id ? { ...t, estado: "Finalizado" } : t
        )
      );

      setToast({
        text: "Turno Finalizado",
        state: ToastState.SUCCESS
      });
    } catch (error) {
      console.error(error)
      setToast({
        text: "Error al finalizar el turno",
        state: ToastState.ERROR
      });
    }
  }


  return (
    <div className="mt-10 mb-10 w-full max-w-6xl mx-auto px-4">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-5">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-black sm:text-3xl">GESTIÓN GLOBAL</h2>
          <p className="text-muted-foreground text-sm sm:text-base">Control total sobre las reservas de la barbería.</p>
        </div>

        <div className="flex flex-col items-center justify-center  w-full sm:w-40  py-6  rounded-md  bg-card  border border-neutral-800 shadow-sm">
          <p className="text-4xl sm:text-3xl font-black">{turnos.length}</p>
          <p className="text-muted-foreground text-xs tracking-wider">TOTAL RESERVAS</p>
        </div>

      </div>

      <div className="flex gap-8 justify-center border-b-2 border-white md:justify-start">
        <p onClick={() => (setSeleccion("Proximos"))} className={`transition hover:text-accent  hover:cursor-pointer ${seleccion === "Proximos" ? "border-b-2 border-white font-black" : ""}`}>PRÓXIMOS</p>
        <p onClick={() => (setSeleccion("Historial"))} className={`transition hover:text-accent  hover:cursor-pointer ${seleccion === "Historial" ? "border-b-2 border-white font-black" : ""}`}>HISTORIAL</p>
      </div>

      {seleccion === "Proximos" ? (
        <TablaDatos data={turnos} role={RoleUser.ADMIN} onFinalizar={handleFinalizar} />
      ) : <>
        <TablaDatos data={historial} role={RoleUser.ADMIN} />
        <div className="flex justify-center items-center gap-4 mt-6">
          <button disabled={page === 1} onClick={() => setPage(page - 1)} className="hover:border-white transition cursor-pointer px-4 py-2 border rounded disabled:opacity-40">Anterior</button>
          <span>Página {pagination.page} de {pagination.totalPages}</span>
          <button disabled={page === pagination.totalPages} onClick={() => setPage(page + 1)} className="hover:border-white transition cursor-pointer px-4 py-2 border rounded disabled:opacity-40">Siguiente</button>

        </div>
      </>}
      {toast && (
        <Toast
          text={toast.text}
          state={toast.state}
          onClose={() => setToast(null)}
        />
      )}
    </div>

  )
}

export default GestionAdmin

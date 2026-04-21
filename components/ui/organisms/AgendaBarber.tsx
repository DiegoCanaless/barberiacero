
import { RootState } from "@/lib/redux/store";
import { TurnoResponseDTO } from "@/types/entities/turno/TurnoResponseDTO";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import TablaDatos from "./TablaDatos";
import { RoleUser } from "@/types/enum/roleUser";
import Toast, { ToastState } from "../feedback/Toast";
import { socket } from "@/lib/socket";


const AgendaBarber = () => {
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

    const { user, isAuthenticated } = useSelector(
        (state: RootState) => state.auth
    );

    const traerData = async () => {
        try {
            const token = localStorage.getItem("token")
            if (seleccion === "Historial") {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/turnos/barbero?estado=historial&page=${page}&limit=10`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await res.json();
                setHistorial(data.data);
                setPagination(data.pagination);

            } else {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/turnos/barbero?estado=activo`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await res.json();
                setTurnos(data);
            }

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        traerData()
    }, [seleccion, page])

    useEffect(() => {
        if (!socket.connected) socket.connect();

        const actualizar = (turno: any) => {
            // 🔒 SOLO si es MI barbero
            if (turno?.barbero?.id_usuario !== user?.id_usuario) return;

            console.log("🔄 Actualizando agenda barbero");
            traerData();
        };

        socket.on("nuevo_turno", actualizar);
        socket.on("turno_finalizado", actualizar);
        socket.on("turno_cancelado", actualizar);

        return () => {
            socket.off("nuevo_turno", actualizar);
            socket.off("turno_finalizado", actualizar);
            socket.off("turno_cancelado", actualizar);
        };
    }, [user, seleccion, page]);

    const handleFinalizar = async (id: number) => {
        try {
            const token = localStorage.getItem("token")

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/turnos/finalizar/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
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
        <>
            <div className="mt-10 mb-10 w-full max-w-6xl mx-auto px-4">
                <div className="flex flex-col  gap-6 sm:flex-row sm:items-center sm:justify-between mb-8">
                    <div className="flex flex-col items-center justify-center  w-full sm:w-40  py-6  rounded-md  bg-card  border border-neutral-800 shadow-sm">
                        <p className="text-4xl sm:text-3xl font-black">{turnos.length}</p>
                        <p className="text-muted-foreground text-xs tracking-wider">Turnos programados</p>
                    </div>


                </div>

                <div className="flex gap-8 justify-center border-b-2  border-white md:justify-start">
                    <p onClick={() => (setSeleccion("Proximos"), setPage(1))} className={`transition hover:text-accent  hover:cursor-pointer ${seleccion === "Proximos" ? "border-b-2 border-white font-black" : ""}`}>PRÓXIMOS</p>
                    <p onClick={() => (setSeleccion("Historial"), setPage(1))} className={`transition hover:text-accent  hover:cursor-pointer ${seleccion === "Historial" ? "border-b-2 border-white font-black" : ""}`}>HISTORIAL</p>
                </div>

                {seleccion === "Proximos" ? (
                    <TablaDatos data={turnos} role={RoleUser.BARBER} onFinalizar={handleFinalizar} />

                ) : <>
                    <TablaDatos data={historial} role={RoleUser.BARBER} />
                    <div className="flex justify-center items-center gap-4 mt-6">
                        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="hover:border-white transition cursor-pointer px-4 py-2 border rounded disabled:opacity-40">Anterior</button>
                        <span>Página {pagination.page} de {pagination.totalPages}</span>
                        <button disabled={page === pagination.totalPages} onClick={() => setPage(page + 1)} className="hover:border-white transition cursor-pointer px-4 py-2 border rounded disabled:opacity-40">Siguiente</button>
                    </div>


                </>}


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

export default AgendaBarber
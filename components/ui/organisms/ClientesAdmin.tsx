import { UserResponseDTO } from "@/types/entities/user/UserResponseDTO";
import { State } from "@/types/enum/estado";
import { useEffect, useState } from "react";
import { FaMagnifyingGlass, FaUserLarge } from "react-icons/fa6";
import { Switch } from "../molecules/switch";
import Toast, { ToastState } from "../feedback/Toast";

const ClientesAdmin = () => {
    const [user, setUser] = useState<UserResponseDTO[]>([])
    const [page, setPage] = useState(1)
    const [busqueda, setBusqueda] = useState<string>("")

    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 15,
        totalPages: 1
    })


    const [toast, setToast] = useState<{
        text: string
        state: ToastState
    } | null>(null)


    useEffect(() => {
        const traerUsuarios = async () => {
            try {
                const token = localStorage.getItem("token")

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuarios?page=${page}&search=${busqueda}`, {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })

                const data = await res.json()

                if (!data.data) {
                    setUser([])
                    return
                }

                const users = data.data
                setUser(users)
                setPagination(data.pagination)


            } catch (error: unknown) {
                console.error(error)
            }
        }

        traerUsuarios()

    }, [page, busqueda])

    const handleState = async (usuario: UserResponseDTO) => {
        try {
            const token = localStorage.getItem("token")

            const nuevoEstado = usuario.estado === State.ACTIVO
                ? State.DESACTIVADO
                : State.ACTIVO


            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/${usuario.id_usuario}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ estado: nuevoEstado })
            })

            if (!res.ok) {
                console.error("Surgió un error al cambiar el estado del barbero")
                return
            }

            setUser((prev) =>
                prev.map((u) =>
                    u.id_usuario === usuario.id_usuario
                        ? {
                            ...u, estado:
                                u.estado === State.ACTIVO
                                    ? State.DESACTIVADO
                                    : State.ACTIVO,
                        }
                        : u
                )
            )

            setToast({
                text: "El estado del usuario se actualizo correctamente",
                state: ToastState.SUCCESS
            })


        } catch (error: unknown) {
            console.error(error)
            setToast({
                text: "Error al actualizar el estado del usuario",
                state: ToastState.ERROR
            })
        }
    }


    return (
        <>

            <div className="mt-10 mb-10 w-full max-w-7xl mx-auto px-4">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-3xl font-black">Clientes</h2>
                        <p className="text-muted-foreground">Gestiona el acceso de los clientes a la plataforma</p>
                    </div>

                    <div className="relative w-full md:w-72">
                        <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input type="search" placeholder="Buscar cliente..." value={busqueda} className="pl-10 pr-3 h-10 w-full rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-neutral-300" onChange={(e) => {
                            setBusqueda(e.target.value)
                            setPage(1)
                        }} />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {user.map((usuario) => (
                        <div key={usuario.id_usuario} className={`flex flex-col justify-between bg-card border rounded-xl p-5 shadow-sm transition hover:shadow-md
                            ${usuario.estado === State.DESACTIVADO ? "opacity-60 grayscale" : ""}`}>

                            <div className="flex items-center gap-4">
                                <div className="bg-black/90 text-white p-4 rounded-xl flex items-center justify-center">
                                    <FaUserLarge />
                                </div>

                                <div className="flex flex-col">
                                    <p className="font-bold text-lg leading-tight">{usuario.name} {usuario.apellido}</p>
                                    <p className="text-sm text-muted-foreground">{usuario.email}</p>
                                </div>
                            </div>

                            {/* FOOTER */}
                            <div className="flex items-center justify-between mt-6">

                                <span className={`text-xs font-semibold px-3 py-1 rounded-full
                                        ${usuario.estado === State.ACTIVO
                                        ? "bg-green-100 text-green-600"
                                        : "bg-red-100 text-red-500"
                                    }`}>
                                    {usuario.estado}
                                </span>

                                <Switch checked={usuario.estado === State.ACTIVO} onCheckedChange={() => handleState(usuario)} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center items-center gap-4 mt-6">
                    <button disabled={page === 1} onClick={() => setPage(page - 1)} className="hover:border-white transition cursor-pointer px-4 py-2 border rounded disabled:opacity-40">Anterior</button>
                    <span>Página {pagination.page} de {pagination.totalPages}</span>
                    <button disabled={page === pagination.totalPages} onClick={() => setPage(page + 1)} className="hover:border-white transition cursor-pointer px-4 py-2 border rounded disabled:opacity-40">Siguiente</button>

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


    );


};

export default ClientesAdmin;
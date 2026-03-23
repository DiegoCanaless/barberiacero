"use client"

import { useEffect, useState } from "react";
import ReservationButton from "../ui/ReservationButton";
import TurnoModal from "../ui/molecules/TurnoModal";
import { FaPhone, FaRightFromBracket, FaCalendar, FaClockRotateLeft, FaScissors, FaClock } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { UserResponseDTO } from "@/types/entities/user/UserResponseDTO";
import { TurnoResponseDTO } from "@/types/entities/turno/TurnoResponseDTO";
import Toast, { ToastState } from "../ui/feedback/Toast";
import Navbar from "../layout/Navbar";

interface UsuarioPanelProps {
    user: UserResponseDTO
}


export default function UsuarioPanel({ user }: UsuarioPanelProps) {
    const [turnos, setTurnos] = useState<TurnoResponseDTO[]>([])
    const [modalTurno, setModalTurno] = useState<boolean>(false)
    const [reserva, setReservado] = useState<TurnoResponseDTO | null>(null)

    const dispatch = useDispatch()
    const router = useRouter();

    const [toast, setToast] = useState<{
        text: string;
        state: ToastState;
    } | null>(null);


    useEffect(() => {
        const traerTurnos = async () => {
            try {
                const res = await fetch(`http://localhost:3002/turnos/usuario`, {
                    credentials: "include"
                });

                const data: TurnoResponseDTO[] = await res.json();
                setTurnos(data)

                const turnoReservado = data.find(
                    (t) => t.estado === "Reservado"
                );


                setReservado(turnoReservado || null)

            } catch (error) {
                console.error(error)
            }
        };

        traerTurnos();
    }, []);


    const handleLogout = async () => {
        try {
            await fetch("http://localhost:3002/auth/logout", {
                method: "POST",
                credentials: "include"
            })

            dispatch(logout())

            router.push("/")
        } catch (error) {
            console.error(error)
        }
    }

    const handleCancelar = async () => {
        try {
            if (reserva) {
                const res = await fetch(`http://localhost:3002/turnos/cancelar/${reserva.id_turno}`, {
                    method: "PUT",
                    credentials: "include"
                });

                if (!res.ok) {
                    setToast({
                        text: "Error al cancelar el turno",
                        state: ToastState.ERROR
                    });
                    return;
                }

                setToast({
                    text: "Turno cancelado correctamente",
                    state: ToastState.SUCCESS
                });

                setReservado(null);
            }
        } catch (error) {
            console.error(error);

            setToast({
                text: "Ocurrió un error",
                state: ToastState.ERROR
            });
        }
    };




    const handleReservarClick = () => {
        setModalTurno(!modalTurno)
    }


    return (
        <>
            <Navbar />
            <section className="flex flex-col min-h-screen  items-center px-4 transition-colors gap-10">

                <article className="border-neutral-800  border flex flex-col justify-center items-center bg-card p-6 rounded-lg w-full gap-2 max-w-4xl md:flex-row md:justify-between " >
                    <div className="text-center md:text-start flex flex-col items-center gap-2 md:items-start">
                        <h4 className="text-2xl text-white">{user.name} {user.apellido}</h4>
                        <p className="text-md text-muted-foreground">{user.email}</p>
                        <div className="flex items-center justify-center gap-2 text-muted-foreground md:justify-start">
                            <FaPhone />
                            <p className="text-md">{user.telefono}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-red-400 cursor-pointer hover:text-red-600" onClick={() => handleLogout()}>
                        <FaRightFromBracket />
                        <p>CERRAR SESIÓN</p>
                    </div>
                </article>


                <article className="w-full max-w-4xl">
                    <h5 className="flex items-center gap-2 text-foreground font-black mb-4"><FaCalendar /> MIS PROXIMAS CITAS</h5>

                    {reserva ? (
                        <div className="w-full text-white border-neutral-800  border flex flex-col justify-center items-center bg-card p-6 rounded-lg gap-2">
                            <div className="flex gap-4 mb-4 justify-between w-full">
                                <div className="flex items-start gap-2">
                                    <div className="p-4 bg-black rounded-full ">
                                        <FaScissors />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-black">{reserva.servicio}</p>
                                        <p className="text-xs">con {reserva.barbero.name}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-5">
                                    <div className="flex justify-center items-start p-2 rounded-2xl border border-green-500 bg-green-950 md:w-30">
                                        <p className="text-green-400 font-black">{reserva?.estado}</p>
                                    </div>

                                    <div onClick={() => handleCancelar()} className="cursor-pointer flex justify-center items-center p-2 rounded-2xl border border-red-500 bg-red-950 md:w-30">
                                        <p className="text-red-400 font-black">Cancelar</p>
                                    </div>
                                </div>

                            </div>
                            <hr className="border-gray-800 my-4 w-full" />
                            <div className="flex flex-col gap-4 sm:flex-row sm:justify-around w-full">

                                <div className="flex items-center gap-4 ">
                                    <div className="flex bg-black p-3 rounded-full items-center justify-center">
                                        <FaCalendar size={18} />
                                    </div>

                                    <div className="flex flex-col">
                                        <p className="font-medium">Fecha</p>
                                        <p >
                                            {new Date(reserva.fecha).toLocaleDateString("es-AR")}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex bg-black p-3 rounded-full items-center justify-center">
                                        <FaClock size={18} />
                                    </div>

                                    <div className="flex flex-col">
                                        <p className="font-medium">Hora</p>
                                        <p>
                                            {reserva.horario}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full border-neutral-800 border flex flex-col justify-center items-center bg-card p-6 rounded-lg gap-2">
                            <div className="rounded-full bg-background p-6 text-center ">
                                <FaCalendar size={30} />
                            </div>
                            <p className="text-white text-xl font-black text-center">NO HAY TURNOS AGENDADOS</p>
                            <p className="text-center text-muted-foreground mb-6">Parece que aún no has reservado tu lugar para lucir impecable. ¡Hazlo ahora mismo!</p>
                            <ReservationButton big={false} text="RESERVAR MI TURNO" className="bg-white transition-colors text-black hover:font-black" onClick={() => handleReservarClick()} />
                        </div>
                    )}

                </article>

                <article className="w-full max-w-4xl text-muted-foreground mb-4">
                    <h5 className="flex items-center gap-2 font-black mb-4"><FaClockRotateLeft />Historial de turnos</h5>
                    <hr />

                    <div className="flex flex-col items-center w-full gap-4">
                        {turnos
                            .filter((e: TurnoResponseDTO) => e.estado === "Cancelado" || e.estado === "Finalizado")
                            .map((e: TurnoResponseDTO) => (
                                <div key={e.id_turno} className="w-full flex flex-col max-w-4xl p-4 bg-card rounded-md md:flex-row  md:justify-between">
                                    <div className="flex gap-4 mb-4">
                                        <div className="p-4 bg-black rounded-full">
                                            <FaScissors />
                                        </div>
                                        <div className="flex flex-col">
                                            <p>{e.servicio}</p>
                                            <p className="text-xs">con {e.barbero.name}</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-around items-center md:gap-8">
                                        <div className="flex flex-col">
                                            <p className="text-foreground font-medium">Fecha</p>
                                            <p>
                                                {new Date(e.fecha).toLocaleDateString("es-AR")}
                                            </p>
                                        </div>

                                        <div className="flex flex-col">
                                            <p className="text-foreground font-medium">Hora</p>
                                            <p>{e.horario}</p>
                                        </div>

                                        <div className="border p-2 md:w-30 md:flex md:justify-center border-neutral-400">
                                            <p>{e.estado}</p>
                                        </div>


                                    </div>



                                </div>
                            ))}
                    </div>
                </article>

            </section>

            {modalTurno && (
                <TurnoModal onClose={() => setModalTurno(false)}
                    onToast={(text, state) => setToast({ text, state })}
                />
            )}

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

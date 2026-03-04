"use client"

import { useState } from "react";
import Navbar from "../layout/Navbar";
import ReservationButton from "../ui/ReservationButton";
import TurnoModal from "../ui/molecules/TurnoModal";

interface UsuarioPanelProps {
    user: {
        name: string
        email: string
    }
}


export default function UsuarioPanel({ user }: UsuarioPanelProps) {

    const [modalTurno, setModalTurno] = useState<boolean>(false)

    const handleReservarClick = () => {
        setModalTurno(!modalTurno)
    }

    return (
        <>
            <main className="flex flex-col items-center">
                <Navbar />
                <section>
                    <h1 className="font-bold text-lg">PANEL DE USUARIO</h1>

                    <div className="flex justify-between px-4 border-2 border-card-foreground">
                        <div className="flex flex-col ">
                            <h2>Hola, {user.name}</h2>
                            <p>{user.email}</p>
                        </div>
                        <ReservationButton onClick={() => { handleReservarClick() }} className={"text-background bg-foreground"} text="RESERVAR" big={true} />
                    </div>
                </section>
            </main>

            {modalTurno && (
                <TurnoModal onClose={() => setModalTurno(false)} />
            )}
            
        </>
    )
}

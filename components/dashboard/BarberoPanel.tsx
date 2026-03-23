"use client"


import { useState } from "react";
import NavbarSpecial from "../layout/NavbarSpecial";
import MiniNavbar from "../ui/molecules/MiniNavbar";
import AgendaBarber from "../ui/organisms/AgendaBarber";
import HorarioBarber from "../ui/organisms/HorarioBarber";
import ServiceBarber from "../ui/organisms/ServiceBarber";

export default function BarberoPanel() {

    const [seleccion, setSeleccion] = useState<string>("Agenda")

    const opciones = ["Agenda", "Horario", "Servicios"]

    return (
        <>
            <NavbarSpecial />
            <div className="min-h-screen md:pt-10">
                <MiniNavbar opciones={opciones} seleccion={seleccion} onChange={setSeleccion} />

                {seleccion === "Agenda" && <AgendaBarber/>}
                {seleccion === "Horario" && <HorarioBarber/>}
                {seleccion === "Servicios" && <ServiceBarber/>}
            </div>
        </>
    )
}
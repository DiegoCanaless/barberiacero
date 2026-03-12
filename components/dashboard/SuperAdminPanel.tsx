"use client"

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import NavbarSpecial from "../layout/NavbarSpecial";
import MiniNavbar from "../ui/molecules/MiniNavbar";
import GestionAdmin from "../ui/organisms/GestionAdmin";
import BarberosAdmin from "../ui/organisms/BarberosAdmin";
import ServicioAdmin from "../ui/organisms/ServicioAdmin";

export default function SuperAdminPanel() {

    const [seleccion, setSeleccion] = useState<string>("Turnos")

    const opciones = ["Turnos", "Barberos", "Servicios"]

    return (
        <>
            <NavbarSpecial />
            <div className="min-h-screen pt-10">

                <MiniNavbar opciones={opciones} seleccion={seleccion} onChange={setSeleccion} />

                {seleccion === "Turnos" && <GestionAdmin />}
                {seleccion === "Barberos" && <BarberosAdmin />}
                {seleccion === "Servicios" && <ServicioAdmin />}

            </div>
        </>
    )
}

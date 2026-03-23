"use client"

import { useState } from "react";
import NavbarSpecial from "../layout/NavbarSpecial";
import MiniNavbar from "../ui/molecules/MiniNavbar";
import GestionAdmin from "../ui/organisms/GestionAdmin";
import BarberosAdmin from "../ui/organisms/BarberosAdmin";
import ServicioAdmin from "../ui/organisms/ServicioAdmin";
import ClientesAdmin from "../ui/organisms/ClientesAdmin";

export default function SuperAdminPanel() {

    const [seleccion, setSeleccion] = useState<string>("Turnos")

    const opciones = ["Turnos", "Barberos", "Servicios", "Clientes"]

    return (
        <>
            <NavbarSpecial />
            <div className="min-h-screen md:pt-10">

                <MiniNavbar opciones={opciones} seleccion={seleccion} onChange={setSeleccion} />

                {seleccion === "Turnos" && <GestionAdmin />}
                {seleccion === "Barberos" && <BarberosAdmin />}
                {seleccion === "Servicios" && <ServicioAdmin />}
                {seleccion === "Clientes" && <ClientesAdmin />}

            </div>
        </>
    )
}

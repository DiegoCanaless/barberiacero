"use client"

import { useState } from "react";
import ReservationButton from "../ui/ReservationButton"
import { domine } from "../ui/typography/fonts"
import { FaAngleRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import LoginModal from "../auth/LoginModal";
import TurnoModal from "../ui/molecules/TurnoModal";

const Hero = () => {


    const [login, setLogin] = useState<boolean>(false);
    const [modalTurno, setModalTurno] = useState<boolean>(false)
    
    const dispatch = useDispatch()
    

    const { user, isAuthenticated } = useSelector(
        (state: RootState) => state.auth
    )

    const handleReservarClick = () => {
        if(!isAuthenticated){
            setLogin(true)
        } else {
            setModalTurno(true)
        }
    }

    return (
        <section className="min-h-screen relative w-full">
            <img src="./FotoPrincipal.jpg" alt="" className="w-full h-screen object-cover filter grayscale absolute z-0" />
            <div className="absolute inset-0 h-screen bg-linear-to-b from-transparent to-black z-10"></div>
            <div className="flex flex-col items-center justify-center text-center w-full h-screen relative z-20 px-4 text-white">
                <p className="border-b-2 border-white mb-4">Estilo Clásico & Moderno</p>
                <h1 className={`text-6xl font-semibold mb-4 ${domine.className}`}>
                    LACERO <br /> BARBER
                </h1>
                <p className="text-gray-300 text-sm mb-8">
                    Tu estilo, tu identidad. Cortes de precisión en un ambiente exclusivo.
                </p>
                <ReservationButton big={false} onClick={() => handleReservarClick()} text="RESERVAR TURNO" className="bg-white text-black text-md " icon={<FaAngleRight />} />
            </div>

            {login && (
                <LoginModal onClose={() => setLogin(false)} />
            )}

            {modalTurno && (
                <TurnoModal onClose={() => setModalTurno(false)} />
            )}
        </section>
    )
}

export default Hero
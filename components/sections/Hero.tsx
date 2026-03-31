"use client"

import { useState } from "react";
import ReservationButton from "../ui/ReservationButton"
import { domine } from "../ui/typography/fonts"
import { FaAngleRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import LoginModal from "../auth/LoginModal";
import TurnoModal from "../ui/molecules/TurnoModal";
import Toast, { ToastState } from "../ui/feedback/Toast";
import RegisterModal from "../auth/RegisterModal";

const Hero = () => {


    const [authModal, setAuthModal] = useState<"login" | "register" | null>(null);

    const [modalTurno, setModalTurno] = useState<boolean>(false)



    const { user, isAuthenticated } = useSelector(
        (state: RootState) => state.auth
    )

    const handleReservarClick = () => {
        if (!isAuthenticated) {
            setAuthModal("login")
        } else {
            setModalTurno(true)
        }
    }

    const [toast, setToast] = useState<{
        text: string;
        state: ToastState;
    } | null>(null);


    return (
        <section className="relative w-full h-screen overflow-hidden">
            <img src="/FotoPrincipal.jpg" alt="" className="absolute inset-0 w-full h-full object-cover grayscale" />

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

            {authModal === "login" && (
                <LoginModal
                    onClose={() => setAuthModal(null)}
                    openRegister={() => setAuthModal("register")}
                    onToast={(text, state) => setToast({ text, state })}
                />
            )}

            {authModal === "register" && (
                <RegisterModal
                    onClose={() => setAuthModal(null)}
                    openLogin={() => setAuthModal("login")}
                    onToast={(text, state) => setToast({ text, state })}
                />
            )}



            {modalTurno && (
                <TurnoModal onClose={() => setModalTurno(false)}
                    onToast={(text, state) => setToast({text,state})}
                />
            )}

            {toast && (
                <Toast
                    text={toast.text}
                    state={toast.state}
                    onClose={() => setToast(null)}
                />
            )}
        </section>
    )
}

export default Hero
"use client";

import Link from "next/link";
import { FaSun, FaAlignJustify, FaX, FaMoon, FaUserLarge } from "react-icons/fa6";
import ReservationButton from "../ui/ReservationButton";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";


import LoginModal from "../auth/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { logout } from "@/lib/redux/slices/authSlice";
import TurnoModal from "../ui/molecules/TurnoModal";
import Toast, { ToastState } from "../ui/feedback/Toast";
import { useRouter, useSearchParams } from "next/navigation";


interface NavbarProps {
    forceDark?: boolean
}


const Navbar = ({ forceDark = false }: NavbarProps) => {
    const [openNav, setOpenNav] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);
    const [scrolled, setScrolled] = useState<boolean>(false)
    const [login, setLogin] = useState<boolean>(false);
    const [modalTurno, setModalTurno] = useState<boolean>(false)

    const router = useRouter()

    const dispatch = useDispatch()


    const { user, isAuthenticated } = useSelector(
        (state: RootState) => state.auth
    )
    const { resolvedTheme, setTheme } = useTheme();

    const [toast, setToast] = useState<{
        text: string;
        state: ToastState;
    } | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleNav = () => {
        setOpenNav(!openNav);
    };



    const enlaces = [
        { label: "INICIO", href: "/" },
        { label: "SERVICIOS", href: "#servicios" },
        { label: "NOSOTROS", href: "#nosotros" },
        { label: "CONTACTO", href: "#contacto" },
    ];



    if (!mounted) return null;



    const isDark = resolvedTheme === "dark";

    const logoSrc = !scrolled
        ? "/Logo.png"
        : isDark
            ? "/Logo.png"         // dark scrolleado
            : "/Logo2.png";       // light scrolleado




    const Logout = async () => {
        try {
            await fetch("http://localhost:3002/auth/logout", {
                method: "POST",
                credentials: "include"
            });

            dispatch(logout())

            router.push("/");
        } catch (error) {
            console.error("Error al cerrar sesion ", error)
        }
    }

    const handleReservarClick = () => {
        if (!isAuthenticated) {
            setLogin(true)
        } else {
            setModalTurno(true)
        }
    }








    return (
        <nav
            className={`fixed top-0 left-0 w-full h-20 z-50
  transition-all duration-300
  ${forceDark || scrolled || openNav
                    ? "bg-black text-white shadow-md"
                    : "bg-transparent text-white"
                }`}
        >


            <div className="flex justify-between items-center w-full h-full px-4">
                <img src={logoSrc} alt="LaCero Barber" width={100} />

                {/* Mobile */}
                <div className="flex items-center gap-6 lg:hidden">

                    {/* BOTÓN TEMA */}
                    <button onClick={() => setTheme(isDark ? "light" : "dark")} className="cursor-pointer" >
                        {isDark ? <FaSun size={16} /> : <FaMoon size={16} />}
                    </button>

                    {openNav ? (
                        <FaX size={18} className="cursor-pointer" onClick={toggleNav} />
                    ) : (
                        <FaAlignJustify size={18} className="cursor-pointer" onClick={toggleNav} />
                    )}
                </div>

                {/* Desktop */}
                <div className="hidden items-center gap-4 lg:flex md:px-10">
                    {enlaces.map((e) => (
                        <Link key={e.href} href={e.href} onClick={() => setOpenNav(false)} className="mx-2 font-black" >
                            {e.label}
                        </Link>
                    ))}

                    <hr className="w-0.5 h-5 bg-foreground border-0 transform " />

                    <button onClick={() => setTheme(isDark ? "light" : "dark")} className="cursor-pointer">
                        {isDark ? <FaSun size={16} /> : <FaMoon size={16} />}
                    </button>

                    <ReservationButton onClick={() => { handleReservarClick() }} className={`${scrolled ? "text-background bg-foreground" : "bg-white text-black"}`} text="RESERVAR" big={true} />

                    {isAuthenticated && (
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/dashboard")} >
                            <FaUserLarge />
                            <p>{user?.name}</p>
                        </div>
                    )}
                </div>
            </div>


            {login && (
                <LoginModal
                    onClose={() => setLogin(false)}
                    onToast={(text, state) => setToast({ text, state })}
                />

            )}

            {modalTurno && (
                <TurnoModal onClose={() => setModalTurno(false)} />
            )}


            {openNav && (
                <div className="flex flex-col gap-4 py-4 w-full">
                    {isAuthenticated && (
                        <div className="flex items-center gap-2 cursor-pointer px-2" onClick={() => router.push("/dashboard")}>
                            <FaUserLarge />
                            <p>{user?.name}</p>
                        </div>
                    )}
                    {enlaces.map((e) => (
                        <Link key={e.href} href={e.href} onClick={() => setOpenNav(false)} className="mx-2">
                            {e.label}
                        </Link>
                    ))}
                    <ReservationButton onClick={() => { handleReservarClick() }} className={"text-background bg-foreground"} text="RESERVAR" big={true} />

                    {isAuthenticated && (
                        <div className="mt-4 flex justify-center">
                            <u className="text-red-500 text-xs font-light cursor-pointer" onClick={Logout}>Cerrar Sesion</u>
                        </div>
                    )}
                </div>
            )}

            {toast && (
                <Toast
                    text={toast.text}
                    state={toast.state}
                    onClose={() => setToast(null)}
                />
            )}

        </nav>
    );
};

export default Navbar;

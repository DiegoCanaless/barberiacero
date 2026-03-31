"use client"

import { logout } from "@/lib/redux/slices/authSlice";
import { RootState } from "@/lib/redux/store";import { useRouter } from "next/navigation";
''
import { FaRightFromBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";


const NavbarSpecial = () => {

    const router= useRouter()
    const dispatch= useDispatch();

    const { user, isAuthenticated } = useSelector(
        (state: RootState) => state.auth
    );

    const Logout = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
                method: "POST",
                credentials: "include",
            });

            dispatch(logout());
            router.push("/");
        } catch (error) {
            console.error("Error al cerrar sesion ", error);
        }
    };

    return (
        <nav className={`fixed top-0 left-0 w-full h-20 z-50 bg-black text-foreground shadow-md border-b-2 border-b-neutral-700`}>
            <div className="flex justify-between items-center w-full h-full px-4">
                <img src="/Logo.png" alt="LaCero Barber" width={100} />

                <div className="flex gap-4 items-center">
                    <div className="flex flex-col items-end">
                        <p className="text-md font-black">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.role}</p>
                    </div>
                    <div onClick={() => {Logout()}} className="p-3 rounded-md bg-muted transition-colors cursor-pointer text-neutral-500 hover:text-white ">
                        <FaRightFromBracket size={15} />
                    </div>
                </div>
            </div>

        </nav>
    )
}

export default NavbarSpecial
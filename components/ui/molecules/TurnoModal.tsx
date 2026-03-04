import { FaX } from "react-icons/fa6";

interface LoginModalProps {
    onClose: () => void;
}

const TurnoModal = ({ onClose }: LoginModalProps) => {



    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                <div className="relative w-full max-w-lg rounded-xl bg-background p-6 shadow-xl text-foreground">
                    <button onClick={onClose} className="absolute top-5 right-5 cursor-pointer text-gray-400 hover:text-gray-600" >
                        <FaX size={18} />
                    </button>   
                    <h4 className="text-2xl font-bold  text-center">NUEVO TURNO</h4>


                
                </div>


            </div>
        </>
    )
}

export default TurnoModal
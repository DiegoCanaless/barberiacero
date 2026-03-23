
interface MiniNavbarProps {
    opciones: string[]
    seleccion: string
    onChange: (opcion: string) => void
}

export default function MiniNavbar({
    opciones,
    seleccion,
    onChange,
}: MiniNavbarProps) {
    return (
        <div className="w-full max-w-5xl mx-auto px-4">
            <div className="flex justify-start">
                <div className="flex gap-2 bg-muted/40 p-1 rounded-xl w-fit">
                    {opciones.map((opcion) => (
                        <button
                            key={opcion}
                            onClick={() => onChange(opcion)}
                            className={`px-4 py-1.5 text-sm cursor-pointer rounded-lg transition
                ${seleccion === opcion
                                    ? "bg-white text-black"
                                    : "hover:bg-accent/70"
                                }
              `}
                        >
                            {opcion}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}


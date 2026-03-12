
interface MiniNavbarProps {
    opciones: string[]
    seleccion: string
    onChange: (opcion: string) => void
}

export default function MiniNavbar({
    opciones,
    seleccion,
    onChange
}: MiniNavbarProps) {
    return (
        <div className="flex justify-center gap-2">
            {opciones.map((opcion) => (
                <button
                    key={opcion}
                    onClick={() => onChange(opcion)}
                    className={`px-4 py-2 cursor-pointer rounded-md transition
                        ${seleccion === opcion
                            ? "bg-white text-black"
                            : "hover:bg-accent/70"}
                    `}
                >
                    {opcion}
                </button>
            ))}
        </div>
    )
}
import { useEffect, useState } from "react";
import Toast, { ToastState } from "../feedback/Toast";

const HorarioBarber = () => {

    const [toast, setToast] = useState<{
        text: string
        state: ToastState
    } | null>(null)

    const initialState: HorarioState = {
        lunes: { activo: false, inicio: "09:00", fin: "20:00" },
        martes: { activo: false, inicio: "09:00", fin: "20:00" },
        miercoles: { activo: false, inicio: "09:00", fin: "20:00" },
        jueves: { activo: false, inicio: "09:00", fin: "20:00" },
        viernes: { activo: false, inicio: "09:00", fin: "20:00" },
        sabado: { activo: false, inicio: "09:00", fin: "20:00" },
        domingo: { activo: false, inicio: "09:00", fin: "20:00" },
    };

    const [horarios, setHorarios] = useState<HorarioState>(initialState);

    const handleChange = (
        dia: DiaSemana,
        campo: keyof HorarioDia,
        valor: string | boolean
    ) => {
        setHorarios((prev) => ({
            ...prev,
            [dia]: {
                ...prev[dia],
                [campo]: valor,
            },
        }));
    };

    const handleSubmit = async () => {
        try {
            const payload = (Object.entries(horarios) as [DiaSemana, HorarioDia][])
                .filter(([_, h]) => h.activo)
                .map(([dia, h]) => ({
                    dia,
                    horaInicio: h.inicio,
                    horaFin: h.fin,
                }));


            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/horarios`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            setToast({
                text: "Horarios guardados",
                state: ToastState.SUCCESS
            })

        } catch (error) {
            console.error(error);
            setToast({
                text: "Error al guardar los horarios",
                state: ToastState.ERROR
            })
        }
    };

    useEffect(() => {
        const traerHorarios = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/horarios/mios`, {
                    credentials: "include"
                })

                const data = await res.json();

                const nuevoState = { ...initialState };


                data.forEach((h: any) => {
                    nuevoState[h.dia as DiaSemana] = {
                        activo: true,
                        inicio: h.horaInicio.slice(0, 5), // "09:00:00" → "09:00"
                        fin: h.horaFin.slice(0, 5),
                    };
                });

                setHorarios(nuevoState);
            } catch (error) {
                console.error(error);
                setToast({
                    text: "Error al traer mis horarios",
                    state: ToastState.ERROR
                })
            }
        }

        traerHorarios()
    }, [])



    return (
        <>
            <div className="mt-10 mb-10 w-full max-w-7xl mx-auto px-4">
                <div className="bg-card p-4 md:p-8 rounded-xl border shadow-sm flex flex-col gap-6">

                    <div>
                        <h2 className="text-2xl font-black md:text-3xl">Mi Disponibilidad</h2>
                        <p className="text-muted-foreground text-sm">Define tus horarios de atención personalizados</p>
                    </div>

                    <div className="flex flex-col gap-3">
                        {(Object.entries(horarios) as [DiaSemana, HorarioDia][])
                            .map(([dia, data]) => (
                                <div key={dia} className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 rounded-lg border transition
                                    ${data.activo
                                        ? "bg-background"
                                        : "bg-muted/40 opacity-70"}
                                    `}
                                >

                                    <div className="flex items-center gap-4">
                                        <input className="w-4 h-4 cursor-pointer" type="checkbox" checked={data.activo}
                                            onChange={(e) =>
                                                handleChange(dia, "activo", e.target.checked)
                                            }
                                        />

                                        <p className="uppercase font-semibold tracking-wide">{dia}</p>
                                    </div>

                                    {/* DERECHA */}
                                    <div className="flex justify-start sm:justify-end gap-2">
                                        <input className="w-full sm:w-auto border rounded-md px-2 py-1 bg-background disabled:opacity-50" type="time" value={data.inicio} disabled={!data.activo}
                                            onChange={(e) =>
                                                handleChange(dia, "inicio", e.target.value)
                                            }
                                        />

                                        <span className="text-muted-foreground text-sm">-</span>

                                        <input className="w-full sm:w-auto border rounded-md px-2 py-1 bg-background disabled:opacity-50" type="time" value={data.fin} disabled={!data.activo}
                                            onChange={(e) =>
                                                handleChange(dia, "fin", e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            ))}
                    </div>
                    <button onClick={() => handleSubmit()} className="cursor-pointer mt-4 bg-foreground text-background py-3 rounded-md font-semibold hover:opacity-90 transition">Guardar horarios</button>

                </div>
            </div>
            {toast && (
                <Toast
                    text={toast.text}
                    state={toast.state}
                    onClose={() => setToast(null)}
                />
            )}
        </>
    )
}

export default HorarioBarber